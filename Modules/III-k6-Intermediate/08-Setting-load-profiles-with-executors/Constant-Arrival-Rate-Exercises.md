# Constant Arrival Rate Executor

As noted in [Setting load profiles with executors](Setting-load-profiles-with-executors.md#Constant-Arrival-Rate), the _Constant Arrival Rate_ executor has a primary focus on the _iteration rate_ being applied over a specified timeframe.

## Exercises

For our exercises, we're going to start by using a very basic script which simply performs an HTTP request then waits one second before completing the test iteration. We're providing some console output as things change.

### Creating our script

Let's begin by implementing our test script with minimally required configuration. Create a file named _test.js_ with the following content:

```js
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  scenarios: {
    k6_workshop: {
      executor: 'constant-arrival-rate',
      rate: 10,
      duration: '30s',
      preAllocatedVUs: 5,
    },
  },
};

export default function () {
  console.log(`[VU: ${__VU}, iteration: ${__ITER}] Starting iteration...`);
  http.get('https://test.k6.io/contacts.php');
  sleep(1);
}
```

We're starting with the bare-minimum to use the executor. Compared to previous executors, this has a bit more required configuration beyond the usual `executor` itself.

Reviewing the additional options, we see that the `rate` and `duration` are now required. This makes sense given the focus of this executor is achieving and maintaining the specified _iteration rate_ over the provided timeframe. Let's defer the discussion of `preAllocatedVUs` for the moment until we get our initial test execution completed.

### Initial test run

Go ahead and trigger the initial run of our script:

```bash
k6 run test.js
```

Your test will now start printing results to your terminal...

```bash
INFO[0000] [VU: 4, iteration: 0] Starting iteration...   source=console
INFO[0000] [VU: 5, iteration: 0] Starting iteration...   source=console
WARN[0000] Insufficient VUs, reached 5 active VUs and cannot initialize more  executor=constant-arrival-rate scenario=k6_workshop
INFO[0001] [VU: 2, iteration: 1] Starting iteration...   source=console
INFO[0002] [VU: 1, iteration: 1] Starting iteration...   source=console
...
INFO[0029] [VU: 4, iteration: 26] Starting iteration...  source=console
INFO[0029] [VU: 5, iteration: 26] Starting iteration...  source=console

running (0m30.7s), 0/5 VUs, 135 complete and 0 interrupted iterations
k6_workshop ✓ [======================================] 0/5 VUs  30s  10 iters/s
...
     iterations.....................: 135    4.402609/s
     vus............................: 5      min=5      max=5
```
Our test ran successfully, but closer inspection of the results shows that our actual results are not as intended.

Looking at the output, we see the following:

```bash
WARN[0000] Insufficient VUs, reached 5 active VUs and cannot initialize more  executor=constant-arrival-rate scenario=k6_workshop
```

What happened here? Remember the `preAllocatedVUs` setting we glossed over earlier? With this setting, we simply told k6 to start the test with 5 virtual users; after a few iterations, k6 was able to determine that it would **not** be able to achieve our desired iteration rate.
This fact is evident looking at the `iterations` value in the test summary; our test was only able to attain a rate of 4.4 iterations per second---we wanted 10.

We _could_ simply double the number of `preAllocatedVUs`, or better yet, we could allow k6 to automatically control the number of VUs to achieve our rate.

### Autoscaling of virtual users

Restating once again, the _Constant Arrival Rate_ executor is focused on the _iteration rate_ over a period of time. k6 aims to eliminate the need to be overly concerned about the actual number of users required to achieve such a rate. As a user of the executor, our script can simply specify the minimum and maximum number of VUs allowed, letting k6 handle the actual details. This can be referred to as _autoscaling_.

With the `preAllocatedVUs`, we're basically providing the starting number of virtual users. Now we will provide the `maxVUs` to denote our upper bounds. Update the `options` as follows:

```js
export const options = {
  scenarios: {
    k6_workshop: {
      executor: 'constant-arrival-rate',
      rate: 10,
      duration: '30s',
      preAllocatedVUs: 5,
      maxVUs: 50,
    },
  },
};
```
To show us when the autoscaling is taking place, let's include the following javascript prior to `options` block.
```js
// This will be executed for each VU when initialized
console.log(`Hello, VU #${__VU} has entered the test!`);
```

Let's run our test once again:
```bash
k6 run test.js
```

```bash
INFO[0000] Hello, VU #1 has entered the test!            source=console
INFO[0000] Hello, VU #0 has entered the test!            source=console
INFO[0000] [VU: 2, iteration: 0] Starting iteration...   source=console
INFO[0000] [VU: 5, iteration: 0] Starting iteration...   source=console
INFO[0000] [VU: 3, iteration: 0] Starting iteration...   source=console
INFO[0000] [VU: 1, iteration: 0] Starting iteration...   source=console
INFO[0000] [VU: 4, iteration: 0] Starting iteration...   source=console
INFO[0000] Hello, VU #6 has entered the test!            source=console
INFO[0000] [VU: 6, iteration: 0] Starting iteration...   source=console
INFO[0001] Hello, VU #7 has entered the test!            source=console
...
INFO[0030] [VU: 6, iteration: 22] Starting iteration...  source=console
INFO[0030] [VU: 8, iteration: 22] Starting iteration...  source=console
INFO[0031] Hello, VU #0 has entered the test!            source=console

running (0m31.1s), 00/13 VUs, 293 complete and 0 interrupted iterations
k6_workshop ✓ [======================================] 00/13 VUs  30s  10 iters/s
INFO[0031] Hello, VU #0 has entered the test!            source=console
...
     iterations.....................: 293    9.432192/s
     vus............................: 13     min=8      max=13
```
> :point-up: Feel free to ignore the entries about `VU #0`...it's a bit of a special case.

Reviewing the output now, we see that the desired rate was more closely achieved at 9.43 iterations per second (for the overall test), and that k6 ultimately scaled up to 13 VUs to achieve the desired rate. That's autoscaling!

> :point-up: By **not** specifying `maxVUs` in our first test, we essentially disabled autoscaling of VUs.

### Other rate options

From our examples so far, we've been basing our _iteration rate_ upon iterations per second. We can change the rate denominator using the `timeUnit` option. Again, by default, the setting value is `1s`. 

As an example, let's say aggregation of a service' logs show that it receives 10,000 requests each hour. Rather than doing the math ourselves to restate that in iterations per second, we can let k6 do the work:

```js
export const options = {
  scenarios: {
    k6_workshop: {
      executor: 'constant-arrival-rate',
      rate: 10000,
      timeUnit: '1h',
      duration: '30s',
      preAllocatedVUs: 5,
      maxVUs: 50,
    },
  },
};
```

Running the script shows a pace of 3 iterations per second:

```bash
INFO[0029] [VU: 1, iteration: 20] Starting iteration...  source=console
INFO[0030] [VU: 2, iteration: 20] Starting iteration...  source=console
INFO[0031] Hello, VU #0 has entered the test!            source=console

running (0m30.9s), 00/04 VUs, 83 complete and 0 interrupted iterations
k6_workshop ✓ [======================================] 00/04 VUs  30s  3 iters/s
INFO[0031] Hello, VU #0 has entered the test!            source=console
...
     iterations.....................: 83    2.682393/s
     vus............................: 4     min=3      max=4
```

### Wrapping up

With this exercise, you should see how to run a very basic test and how you can control allow k6 to automatically control the number of virtual users to achieve a desired iteration rate.
