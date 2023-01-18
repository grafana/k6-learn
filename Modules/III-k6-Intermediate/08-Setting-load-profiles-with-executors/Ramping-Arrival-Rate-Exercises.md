# Ramping Arrival Rate Executor

As noted in [Setting load profiles with executors](Setting-load-profiles-with-executors.md#Ramping-Arrival-Rate), the _Ramping Arrival Rate_ executor has a primary focus on the _iteration rate_ being applied over a specified duration within _stages_.

This is a scenario typically seen with [stress or spike testing](https://k6.io/docs/test-types/stress-testing/) when there is a need to gradually push an API beyond its breaking point or to simulate spikes to extreme load over a very short period of time.

## Exercises

For our exercises, let's start with a basic script that runs an HTTP request and trys to achieve 30 requests per time unit (which defaults to 1 second) during the only _stage_ we define. We're providing some console output as things change.

### Creating our script

Let's begin by implementing our test script. Create a file named _test.js_ with the following content:

```js
import http from 'k6/http';

export const options = {
  scenarios: {
    k6_workshop: {
      executor: 'ramping-arrival-rate',
      stages: [
        { target: 30, duration: "30s" },
      ],
      preAllocatedVUs: 2,
    },
  },
};

export default function () {
  console.log(`[VU: ${__VU}, iteration: ${__ITER}] Starting iteration...`);
  http.get('https://test.k6.io/contacts.php');
}
```

Our "basic" script is a little more complicated than most of our previous examples. This is due to the need to define `stages` in addition to the `executor` itself. At least a single _stage_ is required, each of which must include a `target` and `duration`. In this case, `target` represents the desired _iteration rate_ to be achieved by the end of the `duration` within the `stage`. Let's defer the discussion of the required `preAllocatedVUs` for the moment until we get our initial test execution completed.

### Initial test run

Let's go ahead and run our script using the k6 CLI:

```bash
k6 run test.js
```

Your test will now start printing results to your terminal...

```bash
  execution: local
     script: test.js
     output: -

  scenarios: (100.00%) 1 scenario, 2 max VUs, 1m0s max duration (incl. graceful stop):
           * k6_workshop: Up to 30.00 iterations/s for 30s over 1 stages (maxVUs: 2, gracefulStop: 30s)

INFO[0001] [VU: 1, iteration: 0] Starting iteration...   source=console
INFO[0002] [VU: 2, iteration: 0] Starting iteration...   source=console
INFO[0002] [VU: 1, iteration: 1] Starting iteration...   source=console
...
INFO[0015] [VU: 1, iteration: 55] Starting iteration...  source=console
INFO[0015] [VU: 2, iteration: 56] Starting iteration...  source=console
WARN[0015] Insufficient VUs, reached 2 active VUs and cannot initialize more  executor=ramping-arrival-rate scenario=k6_workshop
INFO[0015] [VU: 1, iteration: 56] Starting iteration...  source=console
INFO[0015] [VU: 2, iteration: 57] Starting iteration...  source=console
...
INFO[0030] [VU: 2, iteration: 157] Starting iteration...  source=console
INFO[0030] [VU: 1, iteration: 156] Starting iteration...  source=console

running (0m30.1s), 0/2 VUs, 315 complete and 0 interrupted iterations
k6_workshop ✓ [======================================] 0/2 VUs  30s  29.95 iters/s

     data_received..................: 246 kB 8.2 kB/s
     data_sent......................: 36 kB  1.2 kB/s
     dropped_iterations.............: 134    4.455953/s
     http_req_blocked...............: avg=2.96ms   min=2µs      med=8µs      max=280.3ms  p(90)=12µs     p(95)=16µs    
     http_req_connecting............: avg=1.37ms   min=0s       med=0s       max=121.04ms p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=116.57ms min=100.21ms med=112.53ms max=423.4ms  p(90)=133.78ms p(95)=151.35ms
       { expected_response:true }...: avg=116.57ms min=100.21ms med=112.53ms max=423.4ms  p(90)=133.78ms p(95)=151.35ms
     http_req_failed................: 0.00%  ✓ 0         ✗ 315
     http_req_receiving.............: avg=93.73µs  min=25µs     med=94µs     max=244µs    p(90)=146µs    p(95)=158.29µs
     http_req_sending...............: avg=31.07µs  min=8µs      med=30µs     max=470µs    p(90)=42.6µs   p(95)=47µs    
     http_req_tls_handshaking.......: avg=1.49ms   min=0s       med=0s       max=133.12ms p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=116.45ms min=100.05ms med=112.39ms max=423.24ms p(90)=133.68ms p(95)=151.19ms
     http_reqs......................: 315    10.474815/s
     iteration_duration.............: avg=119.81ms min=100.54ms med=112.83ms max=423.76ms p(90)=140.04ms p(95)=154.62ms
     iterations.....................: 315    10.474815/s
     vus............................: 2      min=2       max=2
     vus_max........................: 2      min=2       max=2
```

While _successful_, a closer inspection of our results shows that our test behavior was not as intended.

Looking at the output, we see the following:

```bash
WARN[0015] Insufficient VUs, reached 2 active VUs and cannot initialize more  executor=ramping-arrival-rate scenario=k6_workshop
```

What happened? 

With the `preAllocatedVUs` setting we glossed over earlier, we told k6 to start the test with 2 virtual users. With this pre-allocation, k6 could **not** achieve the desired iteration rate within the stage. 

This fact is evident by looking at the `iterations` value in the test summary; our test was only able to attain a rate of 10.47 iterations per second and we wanted 30.

### Adjusting preallocated virtual users

Restating once again, the _Ramping Arrival Rate_ executor is focused on the _iteration rate_ over a time frame within each stage. k6 aims to eliminate the need to be overly concerned about the actual number of users required to achieve such a rate. However, we still need to give our script enough VUs to achieve that rate.

From our example above, we have that our request duration or latency is, on average, 116.57ms, and the 95 percentile is around 151.35ms. With just 2 VUs (`preAllocatedVUs`), in a very optimistic scenario, we cannot expect much more than `2 VUs / 0.116 s = 17.24 iterations/s`. Even if this was the only factor at play, which we see is not in the next section.

Playing a bit with the number of `preAllocatedVUs`, we can update your script to a higher value, e.g. 10.

```js
export const options = {
  scenarios: {
    k6_workshop: {
      executor: 'ramping-arrival-rate',
      stages: [
        { target: 30, duration: "30s" },
      ],
      preAllocatedVUs: 10,
    },
  },
};
```

Let's run our test once again:
```bash
k6 run test.js
```

```bash
running (0m30.1s), 00/10 VUs, 449 complete and 0 interrupted iterations
k6_workshop ✓ [======================================] 00/10 VUs  30s  29.95 iters/s

     data_received..................: 374 kB 12 kB/s
     data_sent......................: 53 kB  1.8 kB/s
     http_req_blocked...............: avg=5.19ms   min=2µs      med=8µs      max=254.28ms p(90)=12µs     p(95)=13µs    
     http_req_connecting............: avg=2.46ms   min=0s       med=0s       max=122.56ms p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=115.77ms min=101.27ms med=110.42ms max=182.21ms p(90)=134.9ms  p(95)=143.31ms
       { expected_response:true }...: avg=115.77ms min=101.27ms med=110.42ms max=182.21ms p(90)=134.9ms  p(95)=143.31ms
     http_req_failed................: 0.00%  ✓ 0         ✗ 449 
     http_req_receiving.............: avg=87.06µs  min=23µs     med=85µs     max=942µs    p(90)=130µs    p(95)=150.19µs
     http_req_sending...............: avg=31.32µs  min=9µs      med=29µs     max=386µs    p(90)=43µs     p(95)=49.19µs 
     http_req_tls_handshaking.......: avg=2.64ms   min=0s       med=0s       max=131.24ms p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=115.65ms min=101.19ms med=110.29ms max=182.12ms p(90)=134.75ms p(95)=143.19ms
     http_reqs......................: 449    14.929648/s
     iteration_duration.............: avg=121.23ms min=101.49ms med=110.94ms max=367.86ms p(90)=138.57ms p(95)=150.07ms
     iterations.....................: 449    14.929648/s
     vus............................: 10     min=10      max=10
     vus_max........................: 10     min=10      max=10
```

And we can see the iterations/s increased. However, not enough.

### Ramping effect

Looking at the previous summary, it also seems that our _iteration rate_ ended at 14.92 iterations per second, and we wanted 30! The number of VUs is not the only factor at play when controlling the _iteration rate_.

This brings up the _ramping_ aspect of this executor: k6 will linearly scale up or down the iteration rate to achieve the `target` rate within the stage. The `duration` will determine how long the ramping up/down will take place.

Because we did not specify a `startRate` option, k6 used the default value of 0 iterations per second. Therefore, our test started from 0, then _ramped up_ to 30 iterations per second over a period of 30 seconds. 

```text
Rate
   
30/s |                                .......
     |                        ......./
     |                ......./
     |        ......./
     |......./
 0/s +---------------------------------------+ 30s
                 S T A G E  # 1    
```

Because we have this linear progression, it makes sense that our overall rate was 14.92 iterations/s as this is roughly equal to the midpoint of 0 - 30.

### Altering the slope

With _ramping_, each stage defines the `target` to be achieved at the end of the `duration`. For the first stage, the beginning rate is defined by the `startRate` option. As mentioned, if omitted, the default starting rate will be 0. Let's _flatten_ our slope in this next example, providing a `startRate`:

```js
export const options = {
    scenarios: {
        k6_workshop: {
            executor: 'ramping-arrival-rate',
            startRate: 30,
            stages: [
                { target: 30, duration: "30s" },
            ],
            preAllocatedVUs: 10,
        },
    },
};
```

Running our test once again using `k6 run test.js` produces the following:

```bash
running (0m30.8s), 00/10 VUs, 897 complete and 0 interrupted iterations
k6_workshop ✓ [======================================] 00/10 VUs  30s  30.00 iters/s

...
     iteration_duration.............: avg=130.68ms min=101.77ms med=112.27ms max=1.54s    p(90)=145.2ms  p(95)=165.15ms
     iterations.....................: 897    29.089145/s
     vus............................: 10     min=10      max=10
     vus_max........................: 10     min=10      max=10
```
This time we requested the test to start with an iteration rate of 30, using 10 VUs, and this was enough get us close to that rate.

```text
Rate
   
30/s |........................................
     |       
     |
 0/s +---------------------------------------+ 30s
                 S T A G E  # 1    
```

You might be tempted to set a lower value for [`preAllocatedVUs` and use `maxVUs` option](https://k6.io/docs/using-k6/scenarios/executors/ramping-arrival-rate/) to autoscale the test. `maxVUs` is the maximum number of VUs to allow during the test run, which defaults to `preAllocatedVUs` when not set. However, it's usually best to leave the default value for `maxVUs` and increase the `preAllocatedVUs`. In this way, the VUs are allocated before the test starts and will be used when (and only if) necessary.

Allocating VUs in the middle of the test can be costly in terms of CPU resources in the load generator instance, and can skew the tests. Preallocating VUs will allow the test to start with all the VUs available with no need to wait to allocate more when needed in the middle of the test run.

If we wanted a single stage with a flat---or _constant_---rate we'd use the _Constant Arrival Rate_ executor instead! This executor can be useful for [stress or spike testing](https://k6.io/docs/test-types/stress-testing/) as we'll see in the next section.

### Adding stages to simulate spikes

The real power of _ramping_ is the ability to simulate activity spikes. This can be done by defining multiple stages. 

Let's say we have a big sale that we're anticipating a spike in activity right at the opening, stays there for a short time, then mellows out to a steady but higher-than-usual pace:

```text
Rate
                  * Door-buster Savings!!
50/s |               .....
     |              /     \.....
30/s |             /            \............
     |             |
10/s |............/
     +------------+--+---+-------+-----------+ 30s
           #1      #2  #3   #4         #5
```
We can simulate this by updating our `options` section in the script as follows:
```js
export const options = {
  scenarios: {
    k6_workshop: {
      executor: 'ramping-arrival-rate',
      startRate: 10,
      stages: [
        // Level at 10 iters/s for 6 seconds
        { target: 10, duration: "6s" },
        // Spike from 10 iters/s to 50 iters/s in 3 seconds!
        { target: 50, duration: "3s" },
        // Level at 50 iters/s for 5 seconds
        { target: 50, duration: "5s" },
        // Slowing down from 50 iters/s to 30 iters/s over 8 seconds
        { target: 30, duration: "8s" },
        // Leveled off at 30 iters/s for remainder
        { target: 30, duration: "8s" },
      ],
      preAllocatedVUs: 50,
    },
  },
};
```

### Other rate options

From our examples so far, we've been basing our _iteration rate_ upon iterations per second. We can change the rate denominator using the `timeUnit` option. Again, by default, the setting value is `1s`.

> :point_up: The `timeUnit` applies to the `target` rates within all stages as well as the `startRate`.

Let's slow down our example by changing our rates from iterations per second, to iterations per minute.
```js
export const options = {
  scenarios: {
    k6_workshop: {
      executor: 'ramping-arrival-rate',
      startRate: 10,
      timeUnit: '1m',
      stages: [
        // Level at 10 iters/minute for 6 seconds
        { target: 10, duration: "6s" },
        // Spike from 10 iters/minute to 50 iters/minute in 3 seconds!
        { target: 50, duration: "3s" },
        // Level at 50 iters/minute for 5 seconds
        { target: 50, duration: "5s" },
        // Slowing down from 50 iters/minute to 30 iters/minute over 8 seconds
        { target: 30, duration: "8s" },
        // Leveled off at 30 iters/minute for remainder
        { target: 30, duration: "8s" },
      ],
      preAllocatedVUs: 50,
    },
  },
};
```

### Wrapping up

With this exercise, you should be able to see the power of being able to ramp up and down the iteration rate to model your test activity more realistically.
