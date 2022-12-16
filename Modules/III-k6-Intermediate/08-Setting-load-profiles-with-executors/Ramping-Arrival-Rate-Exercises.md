# Ramping Arrival Rate Executor

As noted in [Setting load profiles with executors](../08-Setting-load-profiles-with-executors.md#Ramping-Arrival-Rate), the _Ramping Arrival Rate_ executor has a primary focus on the _iteration rate_ being applied over a specified duration within _stages_.

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
      executor: 'ramping-arrival-rate',
      stages: [
        { target: 10, duration: "30s" },
      ],
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

Our "basic" script is a little more complicated than most of our previous examples. This is due to need to define `stages` in addition to the `executor` itself. At least a single _stage_ is required, each of which must include a `target` and `duration`. In this case, `target` represents the desired _iteration rate_ to be achieved by the end of the `duration` within the `stage`. Let's defer the discussion of the required `preAllocatedVUs` for the moment until we get our initial test execution completed.

### Initial test run

Let's go ahead and run our script using the k6 CLI:

```bash
k6 run test.js
```

Your test will now start printing results to your terminal...

```bash
INFO[0002] [VU: 4, iteration: 0] Starting iteration...   source=console
INFO[0003] [VU: 5, iteration: 0] Starting iteration...   source=console
INFO[0004] [VU: 3, iteration: 0] Starting iteration...   source=console
INFO[0005] [VU: 2, iteration: 0] Starting iteration...   source=console
INFO[0005] [VU: 1, iteration: 0] Starting iteration...   source=console
...
INFO[0014] [VU: 2, iteration: 6] Starting iteration...   source=console
INFO[0014] [VU: 4, iteration: 7] Starting iteration...   source=console
WARN[0015] Insufficient VUs, reached 5 active VUs and cannot initialize more  executor=ramping-arrival-rate scenario=k6_workshop
INFO[0015] [VU: 1, iteration: 6] Starting iteration...   source=console
INFO[0015] [VU: 5, iteration: 7] Starting iteration...   source=console
...
INFO[0029] [VU: 1, iteration: 19] Starting iteration...  source=console
INFO[0030] [VU: 5, iteration: 20] Starting iteration...  source=console

running (0m30.8s), 0/5 VUs, 102 complete and 0 interrupted iterations
k6_workshop ✓ [======================================] 0/5 VUs  30s  10 iters/s
...
     iterations.....................: 102    3.315689/s
     vus............................: 5      min=5      max=5
```

While _successful_, closer inspection of our results shows that our test behavior was not as intended.

Looking at the output, we see the following:

```bash
WARN[0015] Insufficient VUs, reached 5 active VUs and cannot initialize more  executor=ramping-arrival-rate scenario=k6_workshop
```

What happened? With the `preAllocatedVUs` setting we glossed over earlier, we told k6 to start the test with 5 virtual users; after a few iterations, k6 was able to determine that it would **not** be able to achieve our desired iteration rate within the stage. This fact is evident looking at the `iterations` value in the test summary; our test was only able to attain a rate of 3.32 iterations per second---we wanted 10.

We _could_ simply double the number of `preAllocatedVUs`, or better yet, we could allow k6 to automatically control the number of VUs to achieve our desired rate.

### Autoscaling of virtual users

Restating once again, the _Ramping Arrival Rate_ executor is focused on the _iteration rate_ over a period of time within stages. k6 aims to eliminate the need to be overly concerned about the actual number of users required to achieve such a rate. As a user of the executor, our script can simply specify the maximum number of VUs allowed, letting k6 handle the actual details. This can be referred to as _autoscaling_.

With the `preAllocatedVUs`, we're basically providing the starting number of virtual users. Now we will provide the `maxVUs` to denote our upper bounds. Update the `options` as follows:

```js
export const options = {
  scenarios: {
    k6_workshop: {
      executor: 'ramping-arrival-rate',
      stages: [
        { target: 10, duration: "30s" },
      ],
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
INFO[0014] [VU: 5, iteration: 6] Starting iteration...   source=console
INFO[0014] [VU: 3, iteration: 6] Starting iteration...   source=console
INFO[0015] Hello, VU #6 has entered the test!            source=console
INFO[0015] [VU: 4, iteration: 7] Starting iteration...   source=console
INFO[0015] [VU: 6, iteration: 0] Starting iteration...   source=console
INFO[0015] [VU: 1, iteration: 7] Starting iteration...   source=console
...
INFO[0030] [VU: 4, iteration: 19] Starting iteration...  source=console
INFO[0030] [VU: 10, iteration: 4] Starting iteration...  source=console
INFO[0031] Hello, VU #0 has entered the test!            source=console

running (0m31.0s), 00/11 VUs, 143 complete and 0 interrupted iterations
k6_workshop ✓ [======================================] 00/11 VUs  30s  10 iters/s
INFO[0031] Hello, VU #0 has entered the test!            source=console
...
     iterations.....................: 143    4.61819/s
     vus............................: 11     min=5     max=11
```
> :point-up: Feel free to ignore the entries about `VU #0`...it's a bit of a special case.

Reviewing the output, we now see that k6 automatically added VUs to increase the _iteration rate_ ultimately reaching 11 VUs from our starting point of 5 VUs. 

> :point-up: By **not** specifying `maxVUs` in our first test, we essentially disabled autoscaling of VUs potentially eliminating the ability to reach the desire iteration rate.

### Ramping effect

Looking at the previous summary, it also seems that our _iteration rate_ ended at 4.62 iterations per second...we wanted 10! Scaling VUs is only part of what the executor is using to control the _iteration rate_. 

This brings up the _ramping_ aspect of the executor: k6 will linearly scale up or down the iteration rate to achieve the `target` rate within the stage. The `duration` will determine how long the ramping up/down will take place.

Because we did not specify a `startRate` option, k6 used the default value of 0 iterations per second. Therefore, our test started from 0, then _ramped up_ to 10 iterations per second over a period of 30 seconds. 

```text
Rate
   
10/s |                                .......
     |                        ......./
     |                ......./
     |        ......./
     |......./
 0/s +---------------------------------------+ 30s
                 S T A G E  # 1    
```

Because we have this linear progression, it makes sense that our overall rate was 4.62/s as this is roughly equal the midpoint of 0 - 10.

### Altering the slope

With _ramping_, each stage defines the `target` to be achieved at the end of the `duration`. For the first stage, the beginning rate is defined by the `startRate` option. As mentioned, if omitted, the default starting rate will be 0. Let's _flatten_ our slope in this next example, providing a `startRate`:

```js
export const options = {
  scenarios: {
    k6_workshop: {
      executor: 'ramping-arrival-rate',
      startRate: 10,
      stages: [
        { target: 10, duration: "30s" },
      ],
      preAllocatedVUs: 5,
      maxVUs: 50,
    },
  },
};
```

Running our test once again using `k6 run test.js` produces the following:

```bash
INFO[0000] [VU: 5, iteration: 0] Starting iteration...   source=console
INFO[0000] [VU: 4, iteration: 0] Starting iteration...   source=console
INFO[0000] [VU: 3, iteration: 0] Starting iteration...   source=console
INFO[0000] Hello, VU #6 has entered the test!            source=console
INFO[0001] [VU: 6, iteration: 0] Starting iteration...   source=console
INFO[0001] Hello, VU #7 has entered the test!            source=console
INFO[0001] [VU: 7, iteration: 0] Starting iteration...   source=console
INFO[0001] Hello, VU #8 has entered the test!            source=console
INFO[0001] [VU: 8, iteration: 0] Starting iteration...   source=console
...
INFO[0030] [VU: 4, iteration: 22] Starting iteration...  source=console
INFO[0030] [VU: 6, iteration: 22] Starting iteration...  source=console
INFO[0031] Hello, VU #0 has entered the test!            source=console

running (0m31.0s), 00/13 VUs, 291 complete and 0 interrupted iterations
k6_workshop ✓ [======================================] 00/13 VUs  30s  10 iters/s
...
     iterations.....................: 291    9.397613/s
     vus............................: 13     min=7      max=13
```
This time we requested the test to start with an iteration rate of 10, using 5 VUs. k6 quickly determined that 5 VUs could not support that rate, so it scaled out VUs in order to attain the desired rate.
```text
Rate
   
10/s |     ..................................
     |  ../                      
     |./               
     |       
     |
 0/s +---------------------------------------+ 30s
                 S T A G E  # 1    
```
The scaling was within the first second or two so that our graph would like the above for the configured stage. 

> If we wanted a single stage with a flat---or _constant_---rate we'd use the _Constant Arrival Rate_ executor instead!

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
      preAllocatedVUs: 5,
      maxVUs: 50,
    },
  },
};
```

### Other rate options

From our examples so far, we've been basing our _iteration rate_ upon iterations per second. We can change the rate denominator using the `timeUnit` option. Again, by default, the setting value is `1s`.

> The `timeUnit` applies to the `target` rates within all stages as well as the `startRate`.

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
      preAllocatedVUs: 5,
      maxVUs: 50,
    },
  },
};
```

### Wrapping up

With this exercise, you should be able to see the power in being able to ramp up and down the iteration rate to more realistically model your test activity.
