# Per VU Iterations Executor

As noted in [Setting load profiles with executors](../Setting%20load%20profiles%20with%20executors.md#Per%20VU%20Iterations), _Per VU Iterations_ is an executor with a focus on _iterations_ performed by a _virtual user (VU)_.

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
      executor: 'per-vu-iterations',
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

Looking at our results, you should see confirmation that we ran a single test iteration from a single virtual user.

```bash
INFO[0000] [VU: 1, iteration: 0] Starting iteration...   source=console

running (00m01.3s), 0/1 VUs, 1 complete and 0 interrupted iterations
k6_workshop ✓ [======================================] 1 VUs  00m01.3s/10m0s  1/1 iters, 1 per VU
```

### Increase the virtual users

By not specifying the number of virtual users for our test, the default will be a single user. As implied by the name, the number of VUs is a significant aspect of this executor. Let's increase the number of virtual users using the `vus` option so that we simulate 10 users. We'll update the `options` section of our test script:

```js
export const options = {
  scenarios: {
    k6_workshop: {
      executor: 'per-vu-iterations',
      vus: 10,
    },
  },
};
```

Run the script again:

```bash
k6 run test.js
```

Taking a look at the output, you'll now see that our test ran 10 iterations. In other words, _1 iteration per VU_.

```bash
INFO[0000] [VU: 7, iteration: 0] Starting iteration...   source=console
INFO[0000] [VU: 2, iteration: 0] Starting iteration...   source=console
INFO[0000] [VU: 1, iteration: 0] Starting iteration...   source=console
INFO[0000] [VU: 5, iteration: 0] Starting iteration...   source=console
INFO[0000] [VU: 3, iteration: 0] Starting iteration...   source=console
INFO[0000] [VU: 4, iteration: 0] Starting iteration...   source=console
INFO[0000] [VU: 8, iteration: 0] Starting iteration...   source=console
INFO[0000] [VU: 9, iteration: 0] Starting iteration...   source=console
INFO[0000] [VU: 6, iteration: 0] Starting iteration...   source=console
INFO[0000] [VU: 10, iteration: 0] Starting iteration...  source=console

running (00m01.7s), 00/10 VUs, 10 complete and 0 interrupted iterations
k6_workshop ✓ [======================================] 10 VUs  00m01.7s/10m0s  10/10 iters, 1 per VU
```

### Change the iterations

In the previous example, we had not specified how many iterations we desired, so k6 used the default value of 1 for each of the 10 VUs therefore resulting in 10 iterations overall. Expanding on this, let's increase the `iterations` option to 20. Because the iterations are _per VU_, we should expect 200 (`10 VUs * 20 iterations`) total iterations for the test run.

```js
export const options = {
  scenarios: {
    k6_workshop: {
      executor: 'per-vu-iterations',
      vus: 10,
      iterations: 20,
    },
  },
};
```

Once again, we'll execute the script with k6:

```bash
k6 run test.js
```

As expected, our test ran 200 iterations in total. Let's look a little more closely at these results:

```bash
INFO[0022] [VU: 1, iteration: 19] Starting iteration...  source=console
INFO[0022] [VU: 8, iteration: 19] Starting iteration...  source=console
INFO[0022] [VU: 9, iteration: 18] Starting iteration...  source=console
INFO[0022] [VU: 2, iteration: 18] Starting iteration...  source=console
INFO[0022] [VU: 3, iteration: 19] Starting iteration...  source=console
INFO[0022] [VU: 5, iteration: 19] Starting iteration...  source=console
INFO[0022] [VU: 6, iteration: 19] Starting iteration...  source=console
INFO[0022] [VU: 10, iteration: 19] Starting iteration...  source=console
INFO[0022] [VU: 4, iteration: 19] Starting iteration...  source=console
INFO[0022] [VU: 7, iteration: 18] Starting iteration...  source=console
INFO[0023] [VU: 9, iteration: 19] Starting iteration...  source=console
INFO[0023] [VU: 2, iteration: 19] Starting iteration...  source=console
INFO[0024] [VU: 7, iteration: 19] Starting iteration...  source=console

running (00m25.1s), 00/10 VUs, 200 complete and 0 interrupted iterations
k6_workshop ✓ [======================================] 10 VUs  00m25.1s/10m0s  200/200 iters, 20 per VU

```

> :point-up: The iteration counter is 0-based, meaning a count of 19 is _actually_ 20 iterations.

From the output, you should note that _VU #1_ completed early when compared to _VU #7_. In fact, _VU #7_ still had to complete 2 iterations **after** _VU #1_ was already finished. This can be considered _fair-share scheduling_; each VU performs the same amount of work.

Similar to your early days in school, once you finished your exam you had to wait idly for the remainder of the class to finish or the school bell rang. Speaking of ringing the school bell...

### Setting a time limit

So far, with our example, we've had ample time for our script to finish the desired iterations. Because we hadn't specified the `maxDuration`, k6 uses the default value of 10 minutes.

We'll update our test script to include a `maxDuration` of 10 seconds:

```js
export const options = {
  scenarios: {
    k6_workshop: {
      executor: 'per-vu-iterations',
      vus: 10,
      iterations: 20,
      maxDuration: '10s',
    },
  },
};
```

> :point-up: Durations are configured as string values comprised of a positive integer and a suffix representing the time unit. For example, "s" for seconds, "m" for minutes.

As before, run the script with `k6 run test.js`.

Allowing the script to run, we see that our script was not able to complete all iterations due to reaching the time limit. _Pencils down class!_

```bash
INFO[0010] [VU: 9, iteration: 9] Starting iteration...   source=console
INFO[0010] [VU: 6, iteration: 9] Starting iteration...   source=console
INFO[0010] [VU: 10, iteration: 9] Starting iteration...  source=console

running (11.0s), 00/10 VUs, 95 complete and 0 interrupted iterations
k6_workshop ✓ [======================================] 10 VUs  10s  095/200 iters, 20 per VU
```
Our script was only able to complete 95 iterations within the allowable 10-second timeframe. Previous evidence shows the full 200 iterations typically complete in 25 seconds. 

We could use that information as a baseline to establish a _Service Level Agreement (SLA)_ for the service being tested; we'll account for some fluctuation by setting the `maxDuration` to 30 seconds. If tests are not able to complete in that timeframe, it's possible the service performance has degraded enough to warrant investigation.

### Wrapping up

With this exercise, you should see how to run a very basic test and how you can control the number of iterations, virtual users, and even setting time limits. Additionally, you see that the distribution of tests for amongst VUs is _fairly scheduled_ when using _Per VU Iterations_.
