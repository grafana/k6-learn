# Externally Controlled Executor

As noted in [Setting load profiles with executors](../Setting%20load%20profiles%20with%20executors.md#Externally%20Controlled), this particular executor relegates the control of VUs and the running state of tests to external processes. Feel free to use Bash, Python, or some automation component; the source of these processes is of no consequence for the executor.

The focus of the executor will be to set up the test scenario and provide constraints on the overall duration and allowable number of virtual users. From this point, a running test will be in somewhat of a _holding pattern_ waiting for further instructions.

Interaction with the running test utilizes either the [REST APIs](https://k6.io/docs/misc/k6-rest-api/) exposed by the k6 process, or by using the `k6` command line interface (CLI).

## Exercises
For our exercises, we're going to start by using a very basic script which simply performs an HTTP request then waits three seconds before completing the test iteration. We're providing some console output as things change. 

The configured `options` will be the absolute minimum required for the `externally-controlled` executor.

### Create our test script
Create a file named _test.js_ with the following content:
```js
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  scenarios: {
    k6_workshop: {
      executor: 'externally-controlled',
      duration: '5m',
    },
  },
};

export default function () {
  console.log(`[VU: ${__VU}, iteration: ${__ITER}] Starting iteration...`);
  http.get('https://test.k6.io/contacts.php');
  sleep(3);
}
```

### Initial test run
Open a _terminal_ window within the same directory as the `test.js` script. We're now going to execute our script using the k6 binary:
```bash
k6 run test.js
```
k6 should now start. You should see a timer counting up as the test is running, but nothing much happening. We're not seeing our expected console message included in our script! We'll stay in this holding pattern until the timer reaches the configured `duration` from the script options.

### Scaling up VUs
No tests were actually performed due to there being `0` virtual users (VUs) started by the script. k6 waits for the external process to _scale up_ VUs. To scale up, we're going to use the 'k6' commandline.

Let's open another _terminal_ window, this time however, the directory should not matter. If your script timed out in the meantime, start it back up again using `k6 run test.js`.
```bash
k6 scale --vus 2 --max 10
```
> :point_up: If you don't specify the `maxVUs` in your script options, any request to scale up will fail unless you provide a `--max` with the scale request!

Now that VUs have been scaled up, you should now see console output showing that each virtual user is now executing the test code.

### Controlling the execution engine
Continuing with the currently running test from the previous step, let's play with other options available to control the overall test execution.

Using an idle _terminal_ window (one not currently running the k6 test), we'll issue the following commands:
```bash
# Halt the currently running test; console output should stop
k6 pause

# Go ahead and scale up the desired number of VUs
k6 scale --vus 5

# Resume the test; output should confirm the test is running with additional VUs
k6 resume
```
 
### Inspecting state
At any time, you can use the `k6` command to inquire as to the state of a running instance:

```bash
$ k6 status
status: 7
paused: "false"
vus: "5"
vus-max: "10"
stopped: false
running: true
tainted: false
```

### Gather a metrics snapshot
While your script is running, whether paused or active, you can poll the current metrics from the running script. This will dump the current metrics in YAML format to your console which can be _piped_ to an output file.

```bash
$ k6 stats
...
- name: http_req_duration
  type:
      type: trend
      valid: true
  contains:
      type: time
      valid: true
  tainted: ""
  sample:
      avg: 60.06574999999998
      max: 71.202
      med: 59.515
      min: 55.203
      p(90): 63.559000000000005
      p(95): 65.21095
...
```

### Ending your test
If you wish to complete a test before the `duration` timeframe has been met, you will have to use the `Ctrl+C` keyboard command in the _terminal_ running your test or use the REST API:
```bash
curl -X PATCH \
  http://localhost:6565/v1/status \
  -H 'Content-Type: application/json' \
  -d '{
    "data": {
        "attributes": {
            "stopped": true
        },
        "id": "default",
        "type": "status"
    }
}'
```

> The `k6` CLI does not provide an equivalent `k6 stop` command. Simply use `Ctrl+C` to end a test.

### Script options
Our initial script provides the bare minimum to begin your test. 

Consider a best-practice of specifying your `maxVUs` within the script. As noted previously, the `maxVUs` is not required, however any attempt to scale will be met with an error unless a `--max` is specified with the initial scaling request. The `maxVUs` value may be overridden using the `--max` argument should the controlling script deem necessary.

The final script option is the `vus` setting. When provided, this number of VUs will begin processing once the script is started thereby eliminating the need for an initial scale up.

Let's update the _options_ declaration in our _test.js_ script to include these additional settings:
```js
export const options = {
    scenarios: {
        k6_workshop: {
            executor: 'externally-controlled',
            duration: '5m',
            maxVUs: 10,
            vus: 2,
        },
    },
};
```

Running our script now will immediately show that our tests are being executed by 2 virtual users:
```bash
$ k6 run test.js

          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: scripts/test.js
     output: -

  scenarios: (100.00%) 1 scenario, 10 max VUs, 5m0s max duration (incl. graceful stop):
           * k6_workshop: Externally controlled execution with 2 VUs, 10 max VUs, 5m0s duration

INFO[0000] [VU: 4, iteration: 0] Starting iteration...   source=console
INFO[0000] [VU: 1, iteration: 0] Starting iteration...   source=console
INFO[0003] [VU: 1, iteration: 1] Starting iteration...   source=console
INFO[0003] [VU: 4, iteration: 1] Starting iteration...   source=console
INFO[0006] [VU: 1, iteration: 2] Starting iteration...   source=console
INFO[0006] [VU: 4, iteration: 2] Starting iteration...   source=console
```

### Wrapping up
So that's it! Hopefully you see the additional power in being able to control your k6 load test from external source! 
