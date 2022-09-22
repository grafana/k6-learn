# Ramping VUs Executor

As noted in [Setting load profiles with executors](Setting-load-profiles-with-executors.md#Ramping-VUs), _Ramping VUs_ executor has a primary focus on the number of _virtual users (VUs)_ within _stages_. 

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
      executor: 'ramping-vus',
      stages: [
        { target: 10, duration: "30s" },
      ],
    },
  },
};

export default function () {
  console.log(`[VU: ${__VU}, iteration: ${__ITER}] Starting iteration...`);
  http.get('https://test.k6.io/contacts.php');
  sleep(1);
}
```

Our _"basic"_ script is a little more complicated than some of our previous examples. This is due to need to define `stages` in addition to the `executor` itself. At least a single _stage_ is required, each of which includes a `target` and `duration` option, both of which are also required.

### Initial test run

Let's go ahead and run our script using the k6 CLI:

```bash
k6 run test.js
```

Looking at the output from the script, you should see that several virtual users (VUs) performed test iterations over a 30-second period.

```bash
INFO[0029] [VU: 2, iteration: 18] Starting iteration...  source=console
INFO[0029] [VU: 7, iteration: 2] Starting iteration...   source=console
INFO[0029] [VU: 4, iteration: 21] Starting iteration...  source=console
INFO[0029] [VU: 6, iteration: 15] Starting iteration...  source=console
INFO[0030] [VU: 5, iteration: 12] Starting iteration...  source=console

running (0m31.0s), 00/10 VUs, 141 complete and 0 interrupted iterations
k6_workshop ✓ [======================================] 00/10 VUs  30s
```

> :point-up: The iteration counter is 0-based, meaning a count of 12 is _actually_ 13 iterations.

Closer inspection at the iteration counts may seem odd. The counts seem to be all over the board: _VU #7_ only performed 3 iterations, while _VU #4_ performed 22. As with the [Constant VUs](Setting-load-profiles-with-executors.md#Constant-VUs) executor, each virtual user executes the `default function ()` continuously, so how can there be such a disparity? 

This disparity in iteration counts is due to the _ramping_ aspect of the executor. k6 will linearly scale up or down the number of running VUs to achieve the `target` number of VUs defined within the stage. The `duration` will determine how long the scaling with take place.

Because we did not specify a `startVUs` option, k6 used the default value of 1. Therefore, our test started with a single VU, then _ramped up_ to 10 VUs over a period of 30 seconds. For this reason, we may then infer that _VU #7_ became active much later in the stage than _VU #4_.

```text
VUs
   
10 |                                .......
   |                        ......./
 5 |                ......./
   |        ......./
 1 |......./
   +---------------------------------------+ 30s
                 S T A G E  # 1    
```

### Inverse the slope

Let's invert the slope of our test by changing our `startVUs` and the `target` for the stage. We'll update the `options` in our test script as follows:

```js
export const options = {
  scenarios: {
    k6_workshop: {
      executor: 'ramping-vus',
      stages: [
        { target: 1, duration: "30s" },
      ],
      startVUs: 10,
    },
  },
};
```
```bash
INFO[0026] [VU: 3, iteration: 24] Starting iteration...  source=console
INFO[0027] [VU: 6, iteration: 25] Starting iteration...  source=console
INFO[0027] [VU: 7, iteration: 25] Starting iteration...  source=console
INFO[0028] [VU: 6, iteration: 26] Starting iteration...  source=console
INFO[0028] [VU: 7, iteration: 26] Starting iteration...  source=console
INFO[0029] [VU: 6, iteration: 27] Starting iteration...  source=console
INFO[0029] [VU: 7, iteration: 27] Starting iteration...  source=console

running (0m30.5s), 00/10 VUs, 168 complete and 0 interrupted iterations
k6_workshop ✓ [======================================] 00/10 VUs  30s
```

This time, you can see the number of VUs performing a higher count of iterations diminishes over the duration.

```text
VUs
   
10 |.......
   |       \.......
 5 |               \.......
   |                       \.......
 1 |                               \.......
   +---------------------------------------+ 30s
                 S T A G E  # 1    
```

When _ramping down_ VUs as we did in this last exercise, k6 provides some flexibility when reclaiming resources. By default, VUs targeted for removal are given a 30-second grace period during which to complete the current iteration it may be working on. This grace period may be adjusted using the `gracefulRampDown` option to fine-tune the value if necessary.

### Simulate spikes in active users

The real power of _ramping_ is the ability to simulate activity spikes. This can be done by defining multiple stages.

```text
VUs
                   
10 |                 .  
   |                / \ 
 5 |               /   \
   |              /     \............      
 1 |............./                              
   +------------+---+---+------------+ 30s
        #1        #2  #3       #4
```

From our lovely _ASCII art_ diagram, we'll modify our script to run 4 stages to simulate a spike in virtual users. Let's alter our `startVUs`, first stage, and add new stages to our simulation:

```js
export const options = {
  scenarios: {
    k6_workshop: {
      executor: 'ramping-vus',
      stages: [
        { target: 1, duration: "12s" },
        { target: 10, duration: "3s" },
        { target: 3, duration: "3s" },
        { target: 3, duration: "12s" },
      ],
      startVUs: 1,
    },
  },
};
```

Run the script once more:

```bash
k6 run test.js
```

Now, you should notice that the test starts slowly, then ramps up quickly as the spike occurs, then ramps down to a moderate pace until the end of the test.

```bash
INFO[0028] [VU: 3, iteration: 26] Starting iteration...  source=console
INFO[0028] [VU: 2, iteration: 14] Starting iteration...  source=console
INFO[0028] [VU: 7, iteration: 15] Starting iteration...  source=console
INFO[0029] [VU: 3, iteration: 27] Starting iteration...  source=console
INFO[0029] [VU: 2, iteration: 15] Starting iteration...  source=console
INFO[0029] [VU: 7, iteration: 16] Starting iteration...  source=console

running (0m30.7s), 00/10 VUs, 80 complete and 0 interrupted iterations
k6_workshop ✓ [======================================] 00/10 VUs  30s
```

### Wrapping up

With this exercise, you should be able to see the power in being able to ramp up and down the number of VUs in order to model your test activity.
