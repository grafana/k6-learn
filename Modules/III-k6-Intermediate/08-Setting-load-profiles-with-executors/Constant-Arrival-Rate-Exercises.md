# Constant Arrival Rate Executor

As noted in [Setting load profiles with executors](../08-Setting-load-profiles-with-executors.md#Constant-Arrival-Rate), the _Constant Arrival Rate_ executor has a primary focus on the _iteration rate_ being applied over a specified timeframe.

This is a scenario typically seen with [load testing an API](https://k6.io/docs/testing-guides/api-load-testing/) when there is a need to simulate a constant request rate for a particular API endpoint.

## Exercises

For our exercises, we're going to start by using a basic script that simply performs an HTTP request on each test iteration and aims at achieving 50 requests per time unit (which defaults to 1 second). We're providing some console output as things change.

### Creating our script

Let's begin by implementing our test script with the minimally required configuration. Create a file named _test.js_ with the following content:

```js
import http from 'k6/http';

export const options = {
  scenarios: {
    k6_workshop: {
      executor: 'constant-arrival-rate',
      rate: 50,
      duration: '30s',
      preAllocatedVUs: 2,
    },
  },
};

export default function () {
  console.log(`[VU: ${__VU}, iteration: ${__ITER}] Starting iteration...`);
  http.get('https://test.k6.io/contacts.php');
}
```

We're starting with the bare minimum to use the executor. Compared to previous executors, this has a bit more required configuration beyond the usual `executor` itself.

Reviewing the [options in the documentation](https://k6.io/docs/using-k6/scenarios/executors/constant-arrival-rate/), we see that the `rate` and `duration` are now required. This makes sense given the focus of this executor is achieving and maintaining the specified _iteration rate_ over the provided timeframe. 

Let's defer the discussion of `preAllocatedVUs` for the moment until we get our initial test execution completed.

### Initial test run

Go ahead and trigger the initial run of our script:

```bash
k6 run test.js
```

Your test will now start printing results to your terminal...

```bash
  execution: local
     script: test.js
     output: -

  scenarios: (100.00%) 1 scenario, 2 max VUs, 1m0s max duration (incl. graceful stop):
           * k6_workshop: 50.00 iterations/s for 30s (maxVUs: 2, gracefulStop: 30s)

INFO[0000] [VU: 1, iteration: 0] Starting iteration...   source=console
INFO[0000] [VU: 2, iteration: 0] Starting iteration...   source=console
WARN[0000] Insufficient VUs, reached 2 active VUs and cannot initialize more  executor=constant-arrival-rate scenario=k6_workshop
INFO[0000] [VU: 1, iteration: 1] Starting iteration...   source=console
INFO[0000] [VU: 2, iteration: 1] Starting iteration...   source=console
...
INFO[0030] [VU: 2, iteration: 204] Starting iteration...  source=console
INFO[0030] [VU: 1, iteration: 204] Starting iteration...  source=console

running (0m30.1s), 0/2 VUs, 410 complete and 0 interrupted iterations
k6_workshop ✓ [======================================] 0/2 VUs  30s  50.00 iters/s

     data_received..................: 325 kB 11 kB/s
     data_sent......................: 47 kB  1.6 kB/s
     dropped_iterations.............: 1091   36.235918/s
     http_req_blocked...............: avg=3.48ms   min=1µs      med=6µs      max=256.93ms p(90)=10µs     p(95)=12µs    
     http_req_connecting............: avg=1.73ms   min=0s       med=0s       max=136.79ms p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=132.35ms min=103.06ms med=115.38ms max=827.03ms p(90)=143.56ms p(95)=165.43ms
       { expected_response:true }...: avg=132.35ms min=103.06ms med=115.38ms max=827.03ms p(90)=143.56ms p(95)=165.43ms
     http_req_failed................: 0.00%  ✓ 0         ✗ 410
     http_req_receiving.............: avg=86.77µs  min=19µs     med=80µs     max=524µs    p(90)=142µs    p(95)=153.54µs
     http_req_sending...............: avg=26.88µs  min=7µs      med=24.5µs   max=194µs    p(90)=39.1µs   p(95)=43.54µs 
     http_req_tls_handshaking.......: avg=1.74ms   min=0s       med=0s       max=126.36ms p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=132.23ms min=102.98ms med=115.28ms max=826.93ms p(90)=143.43ms p(95)=165.28ms
     http_reqs......................: 410    13.617531/s
     iteration_duration.............: avg=136.06ms min=103.26ms med=115.77ms max=827.24ms p(90)=144.98ms p(95)=183ms   
     iterations.....................: 410    13.617531/s
     vus............................: 2      min=2       max=2
     vus_max........................: 2      min=2       max=2
```

Our test ran successfully. However, a closer inspection of the results shows that our actual results are not as intended.

Looking at the output, we see the following:

```bash
WARN[0000] Insufficient VUs, reached 2 active VUs and cannot initialize more  executor=constant-arrival-rate scenario=k6_workshop
```

What happened here? 

Remember the `preAllocatedVUs` setting we glossed over earlier? With this setting, we simply told k6 to start the test with 2 virtual users; after a few iterations, k6 was able to determine that it would **not** be able to achieve our desired iteration rate (50 iterations/s).

This fact is evident by looking at the `iterations` value in the test summary; our test was only able to attain a rate of 13.61 iterations per second and we wanted 50.

### Adjusting preallocated virtual users

Restating once again, the _Constant Arrival Rate_ executor is focused on the _iteration rate_ over a time frame. k6 aims to eliminate the need to be overly concerned about the actual number of users required to achieve such a rate. However, we still need to give our script enough VUs to achieve that rate. 

From our example above, we have that our request duration or latency is, on average, 132.35ms, and the 95 percentile is around 165.43ms. With just 2 VUs (`preAllocatedVUs`), in a very optimistic scenario, we cannot expect more than `2 VUs / 0.132 s = 15.15 iterations/s`.

Playing a bit with the number of `preAllocatedVUs`, we can update your script to a higher value, e.g. 25.

```js
export const options = {
    scenarios: {
        k6_workshop: {
            executor: 'constant-arrival-rate',
            rate: 50,
            duration: '30s',
            preAllocatedVUs: 25,
        },
    },
};
```

Let's run our test once again:
```bash
k6 run test.js
```

```bash
running (0m30.5s), 00/25 VUs, 1501 complete and 0 interrupted iterations
k6_workshop ✓ [======================================] 00/25 VUs  30s  50.00 iters/s

     data_received..................: 1.2 MB 40 kB/s
     data_sent......................: 174 kB 5.7 kB/s
     http_req_blocked...............: avg=4.26ms   min=1µs      med=4µs      max=332.88ms p(90)=8µs      p(95)=14µs    
     http_req_connecting............: avg=2.05ms   min=0s       med=0s       max=167.98ms p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=136.87ms min=101.78ms med=114.56ms max=862.77ms p(90)=146.68ms p(95)=184.36ms
       { expected_response:true }...: avg=136.87ms min=101.78ms med=114.56ms max=862.77ms p(90)=146.68ms p(95)=184.36ms
     http_req_failed................: 0.00%  ✓ 0         ✗ 1501
     http_req_receiving.............: avg=46.57µs  min=11µs     med=39µs     max=503µs    p(90)=82µs     p(95)=96µs    
     http_req_sending...............: avg=17.21µs  min=5µs      med=15µs     max=151µs    p(90)=28µs     p(95)=30µs    
     http_req_tls_handshaking.......: avg=2.19ms   min=0s       med=0s       max=203.88ms p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=136.81ms min=101.73ms med=114.5ms  max=862.74ms p(90)=146.57ms p(95)=184.31ms
     http_reqs......................: 1501   49.213783/s
     iteration_duration.............: avg=141.27ms min=101.88ms med=114.83ms max=862.9ms  p(90)=150.38ms p(95)=407.84ms
     iterations.....................: 1501   49.213783/s
     vus............................: 25     min=25      max=25
     vus_max........................: 25     min=25      max=25
```

Reviewing the output now, we see that the desired rate is more closely achieved at 49.21 iterations per second (for the overall test).

You might be tempted to set a lower value for [`preAllocatedVUs` and use `maxVUs` option](https://k6.io/docs/using-k6/scenarios/executors/constant-arrival-rate/) to autoscale the test. `maxVUs` is the maximum number of VUs to allow during the test run, which defaults to `preAllocatedVUs` when not set. However, it's usually best to leave the default value for `maxVUs` and increase the `preAllocatedVUs`. In this way, the VUs are allocated before the test starts and will be used when (and only if) necessary.

Allocating VUs in the middle of the test can be costly in terms of CPU resources in the load generator instance, and can skew the tests. Preallocating VUs will allow the test to start with all the VUs available with no need to wait to allocate more when needed in the middle of the test run.

### Other rate options

From our examples so far, we've been basing our _iteration rate_ upon iterations per second. We can change the rate denominator using the `timeUnit` option. Again, by default, the setting value is `1s`. 

As an example, let's say the aggregation of a service's logs shows that it receives 10,000 requests each hour. Rather than doing the math ourselves to restate that in iterations per second, we can let k6 do the work:

```js
export const options = {
  scenarios: {
    k6_workshop: {
      executor: 'constant-arrival-rate',
      rate: 10000,
      timeUnit: '1h',
      duration: '30s',
      preAllocatedVUs: 5,
    },
  },
};
```

Running the script shows a pace of 2.78 iterations per second, and we can get there with 5 VUs.

```bash
  scenarios: (100.00%) 1 scenario, 5 max VUs, 1m0s max duration (incl. graceful stop):
           * k6_workshop: 2.78 iterations/s for 30s (maxVUs: 5, gracefulStop: 30s)
...
INFO[0029] [VU: 1, iteration: 16] Starting iteration...  source=console
INFO[0030] [VU: 5, iteration: 16] Starting iteration...  source=console

running (0m30.0s), 0/5 VUs, 84 complete and 0 interrupted iterations
k6_workshop ✓ [======================================] 0/5 VUs  30s  2.78 iters/s
...
     iterations.....................: 83    2.682393/s
     vus............................: 4     min=3      max=4
```

### Wrapping up

With this exercise, you should see how to run a very basic test and how you can control allow k6 to automatically control the number of virtual users to achieve the desired iteration rate.