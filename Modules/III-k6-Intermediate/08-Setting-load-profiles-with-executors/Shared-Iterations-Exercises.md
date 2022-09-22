# Shared Iterations Executor

As noted in [Setting load profiles with executors](Setting-load-profiles-with-executors.md#Shared-Iterations), _Shared Iterations_ is the most basic of the executors. As can be inferred from the name, the primary focus will be the number of _iterations_ for your test; this is the number of times your test function will be run.

## Exercises
For our exercises, we're going to start by using a very basic script which simply performs an HTTP request then waits one second before completing the test iteration. We're providing some console output as things change.

### Creating our script
Let's begin by implementing our test script. Create a file named _test.js_ with the following content:
```js
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  scenarios: {
    k6_workshop: {
      executor: 'shared-iterations',
    },
  },
};

export default function () {
  console.log(`[VU: ${__VU}, iteration: ${__ITER}] Starting iteration...`);
  http.get('https://test.k6.io/contacts.php');
  sleep(1);
}
```

### Initial test run
We're starting with the bare-minimum to use the executor, which only requires that we specify the `executor` itself. Now that we've defined our basic script, we'll go ahead and run k6:

```bash
k6 run test.js
```

Looking at our results, you should see confirmation that we truly ran a single test iteration.

```bash
INFO[0000] [VU: 1, iteration: 0] Starting iteration...   source=console

running (00m02.3s), 0/1 VUs, 1 complete and 0 interrupted iterations
k6_workshop ✓ [======================================] 1 VUs  00m02.3s/10m0s  1/1 shared iters
```

### Change the iterations
A test of one request doesn't provide for much, so let's fix that. Let's bump up the number of `iterations` our test will perform by modifying the `options` for the test.
```js
export const options = {
  scenarios: {
    k6_workshop: {
      executor: 'shared-iterations',
      iterations: 200,
    },
  },
};
```
Once again, we'll execute the script with k6:
```bash
k6 run test.js
```

Wow...this is taking some time. Is something wrong? No. Let's go ahead and interrupt this test by using `Ctrl+C` if it hasn't already finished.

We're artificially adding time to our tests, e.g. `sleep(1)`, for illustrative purposes. Because we did not specify the number of `vus`, or virtual users (VUs), k6 is running as a single user performing the test one after another. For 200 iterations; with the artificial delay, our test would take over 3 minutes!

### Add a time limit
When running a script locally, it's easy to see if something is taking longer than you expected then terminate the process. In an automated pipeline, the system may gladly wait for the process to complete without regard to the necessity of waiting or the cost it may present.

For this, the executor does provide a `maxDuration` option to set a time limit on the test. If none is specified, the executor will use a 10-minute timeout by default, which may be too much, or too little. A best practice would be to specify the `maxDuration` based upon your best guess or based upon previous testing.

We'll update our test script to include a `maxDuration` of 30 seconds:
```js
export const options = {
  scenarios: {
    k6_workshop: {
      executor: 'shared-iterations',
      iterations: 200,
      maxDuration: '30s',
    },
  },
};
```
> :point-up: Durations are configured as string values comprised of a positive integer and a suffix representing the time unit. For example, "s" for seconds, "m" for minutes.

As before, run the script with `k6 run test.js`.

Allowing the script to run, we see that our script was not able to complete all iterations due to reaching the time limit.
```bash
INFO[0029] [VU: 1, iteration: 25] Starting iteration...  source=console
INFO[0030] [VU: 1, iteration: 26] Starting iteration...  source=console

running (0m30.9s), 0/1 VUs, 27 complete and 0 interrupted iterations
k6_workshop ✗ [====>---------------------------------] 1 VUs  30.9s/30s  027/200 shared iters
```
Our script was only able to complete 27 iterations within the allowable 30-second timeframe.

### Change the concurrency
So far, our test has only utilized a single virtual user, or VU. We can update the `vus` option to increase the number of requests being performed simultaneously. Let's change the `vus` to simulate 10 users. Once again, we'll update the `options` section of our test script:
```js
export const options = {
  scenarios: {
    k6_workshop: {
      executor: 'shared-iterations',
      iterations: 200,
      maxDuration: '30s',
      vus: 10,
    },
  },
};
```
Run the script again:
```bash
k6 run test.js
```
The test should now perform the same number of iterations, but in much less time due to the number of concurrent requests.
```bash
INFO[0020] [VU: 7, iteration: 17] Starting iteration...  source=console
...
INFO[0020] [VU: 2, iteration: 17] Starting iteration...  source=console
...
INFO[0020] [VU: 6, iteration: 19] Starting iteration...  source=console
INFO[0020] [VU: 1, iteration: 18] Starting iteration...  source=console
INFO[0021] [VU: 3, iteration: 19] Starting iteration...  source=console
INFO[0021] [VU: 5, iteration: 20] Starting iteration...  source=console
INFO[0021] [VU: 4, iteration: 20] Starting iteration...  source=console
INFO[0021] [VU: 8, iteration: 20] Starting iteration...  source=console
INFO[0021] [VU: 9, iteration: 20] Starting iteration...  source=console
INFO[0021] [VU: 10, iteration: 20] Starting iteration...  source=console

running (0m22.6s), 00/10 VUs, 200 complete and 0 interrupted iterations
k6_workshop ✓ [======================================] 10 VUs  22.6s/30s  200/200 shared iters
```
Let's look at these results a bit more closely. The above results (trimmed for brevity) shows the final report for each of the running VUs. 

> :point-up: The iteration counter is 0-based, meaning a count of 20 is _actually_ 21 iterations.

A behavior of the `shared-iterations` executor may become apparent: _some VUs performed more tests than others_. This is the "shared" aspect in the executor name. As each VU completes a test iteration, they immediately reserve another while there are iterations remaining. If a VU continually gets quick responses from the service being tested, it's possible, as in this case, that the VU gets more than its _fair share_.

### Wrapping up
With this exercise, you should see how to run a very basic test and how you can control the number of iterations, concurrency, and even setting time limits. Additionally, you see that the distribution of tests amongst VUs may not be _fair_.
