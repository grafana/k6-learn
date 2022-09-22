# Constant VUs Executor

As noted in [Setting load profiles with executors](Setting-load-profiles-with-executors.md#Constant-VUs), _Constant VUs_ executor has a primary focus on the number of _virtual users (VUs)_ running for a specified timeframe. 

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
      executor: 'constant-vus',
      duration: '30s',
    },
  },
};

export default function () {
  console.log(`[VU: ${__VU}, iteration: ${__ITER}] Starting iteration...`);
  http.get('https://test.k6.io/contacts.php');
  sleep(1);
}
```

> :point-up: If you've been working through these workshop exercises in order, you may have noticed that this time, our initial script includes a `duration`. This option is **required** for the executor. Attempting to run the script without this option will result in a configuration error.

### Initial test run

We're starting with the bare-minimum to use the executor, which requires both the `executor` as well as the `duration` for the test. Now that we've defined our basic script, we'll go ahead and run k6:

```bash
k6 run test.js
```

Looking at the output from the running script, you should see a single virtual user (VU) is continually performing test iterations. The test will be complete once the configured 30-second duration has been reached. The number of iterations performed is completely dependent upon the code being performed in the `default function ()` code block.

```bash
INFO[0026] [VU: 1, iteration: 24] Starting iteration...  source=console
INFO[0027] [VU: 1, iteration: 25] Starting iteration...  source=console
INFO[0028] [VU: 1, iteration: 26] Starting iteration...  source=console
INFO[0029] [VU: 1, iteration: 27] Starting iteration...  source=console

running (0m30.5s), 0/1 VUs, 28 complete and 0 interrupted iterations
k6_workshop ✓ [======================================] 1 VUs  30s
```

### Change the concurrency

Once again, our test has only utilized a single virtual user, or VU. We can update the `vus` option to increase the number of requests being performed simultaneously. Let's change the `vus` to simulate 10 users by updating the `options` section of our test script:

```js
export const options = {
  scenarios: {
    k6_workshop: {
      executor: 'constant-vus',
      duration: '30s',
      vus: 10,
    },
  },
};
```

Run the script once more:

```bash
k6 run test.js
```

Now, you should see that much more activity as we now have 10 VUs performing iterations over and over until the configured duration has been reached.

```bash
INFO[0029] [VU: 4, iteration: 27] Starting iteration...  source=console
INFO[0029] [VU: 8, iteration: 27] Starting iteration...  source=console
INFO[0029] [VU: 3, iteration: 27] Starting iteration...  source=console
INFO[0029] [VU: 9, iteration: 27] Starting iteration...  source=console
INFO[0029] [VU: 6, iteration: 27] Starting iteration...  source=console

running (0m30.5s), 00/10 VUs, 280 complete and 0 interrupted iterations
k6_workshop ✓ [======================================] 10 VUs  30s
```

> :point-up: The iteration counter is 0-based, meaning a count of 27 is _actually_ 28 iterations.

From the results, you may see interleaving of requests as well as some VUs potentially performing more iterations than others. This will be dependent upon response times for individual requests.

### Wrapping up

With this exercise, you should see how to run a very basic test and how you can control the amount of concurrency for a specified duration. Additionally, you learned that the number of iterations performed is completely dependent upon the time required to complete each iteration of the `default function ()` block.
