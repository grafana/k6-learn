# Creating and using custom metrics

In [Understanding k6 results](../II-k6-Foundations/03-Understanding-k6-results.md), you learned how to interpret the metrics that k6 reports by default. But what if you want to measure something else that k6 doesn't keep track of?

k6 allows you to create your own custom metrics within your script. Once you've defined what you want measured, k6 collects the measurements during the test and reports your custom metrics along with the built-in ones in the end-of-test summary report.

## Types of metrics

There are four types of custom metrics that you can create, and each one measures a different kind of data.

### Counter

A counter is an integer that can be incremented whenever a certain event happens. Counters are good for keeping track of occurrences like:
- the number of times a specific error occurred
- user accounts that have access to Admin functions
- how often a request is redirected
- visits of a specific page, in case your script accesses randomly determined pages

### Gauge

A gauge metric stores three numbers: the minimum value, maximum value, and the _last_ value. Gauges are useful to watch in real time for tracking things that are relevant only while the test is running. You could use gauges to measure:
- the size of response bodies returned
- a custom version of the response time (for example, the response time of three ungrouped URLs)
- the number of unprocessed applications, in a test involving scenarios that create applications and process them simultaneously

### Rate

A rate metric tracks a boolean value over the total number of measurements taken. At the end of the test, the rate expresses the percentage of all the measurements that were `true` and the percentage of them that were `false`. Rate metrics can be used to measure:
- what percentage of the VUs performed the checkout process for a product
- the proportion of pages where an ad appeared
- the percentage of user accounts with insufficient permissions

### Trend

A trend metric measures minimum, maximum, average, and percentile statistics. Unlike gauges, trends keep _all_ values and report the distribution of all the values at the end of the test. Trends are similar to how `http_req_duration` (response time) is measured in k6, and they can be used to track:
- custom timers, such as one where the think time or sleep is added to the response time
- the number of retries executed before the correct response is returned (such as when simulating polling behavior)
- the number of active user accounts reported to an admin user account

## Example: Custom timers

A common reason to use custom metrics is to set up a timer for specific actions that you specify. For example, k6 automatically removes sleep times in the calculation for response time, but it may sometimes be necessary to keep track of the total time that a VU spends on a part of the script, including the sleep. 

Here's a short script you can use to create a custom timer:

```js
import http from 'k6/http';
import { sleep, check } from 'k6';
import { Trend } from 'k6/metrics';

const transactionDuration = new Trend('transaction_duration');

export default function () {

  // This is a transaction
    let timeStart = Date.now();
    let res = http.get('https://test.k6.io', {tags: { name: '01_Home' }});
    check(res, {
      'is status 200': (r) => r.status === 200,
    });
    sleep(Math.random() * 5);
    let timeEnd = Date.now();
    transactionDuration.add(timeEnd - timeStart);
    console.log('The transaction took', timeEnd - timeStart, 'ms to complete.');

  // This is another transaction
  res = http.get('https://test.k6.io/about', {tags: { name: '02_About' }});
}
```

First, import the metric type required.

```js
import { Trend } from 'k6/metrics';
```

In this case, the Trend metric seems most appropriate, so that k6 will report full statistics on your new timer.

Second, declare your timer.

```js
const transactionDuration = new Trend('transaction_duration');
```

Third, determine where to start and stop the timer.

```js
let timeStart = Date.now();
let timeEnd = Date.now();
```

Place these lines strategically in your script so that the execution of all code between `timeStart` and `timeEnd` is included in the elapsed time you want to measure.

Finally, add the elapsed time to your timer.

```js
transactionDuration.add(timeEnd - timeStart);
```

When you run the script, you'll see something like this:

```plain
checks.........................: 100.00% ✓ 1        ✗ 0  
     data_received..................: 17 kB   5.3 kB/s
     data_sent......................: 621 B   194 B/s
     http_req_blocked...............: avg=320.48ms min=15µs     med=320.48ms max=640.95ms p(90)=576.86ms p(95)=608.9ms 
     http_req_connecting............: avg=59.06ms  min=0s       med=59.06ms  max=118.12ms p(90)=106.31ms p(95)=112.21ms
     http_req_duration..............: avg=221.24ms min=128.58ms med=221.24ms max=313.89ms p(90)=295.36ms p(95)=304.63ms
       { expected_response:true }...: avg=128.58ms min=128.58ms med=128.58ms max=128.58ms p(90)=128.58ms p(95)=128.58ms
     http_req_failed................: 50.00%  ✓ 1        ✗ 1  
     http_req_receiving.............: avg=71µs     min=55µs     med=71µs     max=87µs     p(90)=83.8µs   p(95)=85.4µs  
     http_req_sending...............: avg=546µs    min=12µs     med=546µs    max=1.08ms   p(90)=973.2µs  p(95)=1.02ms  
     http_req_tls_handshaking.......: avg=258.3ms  min=0s       med=258.3ms  max=516.6ms  p(90)=464.94ms p(95)=490.77ms
     http_req_waiting...............: avg=220.62ms min=127.42ms med=220.62ms max=313.83ms p(90)=295.19ms p(95)=304.51ms
     http_reqs......................: 2       0.623378/s
     iteration_duration.............: avg=3.2s     min=3.2s     med=3.2s     max=3.2s     p(90)=3.2s     p(95)=3.2s    
     iterations.....................: 1       0.311689/s
     transaction_duration...........: avg=2893     min=2893     med=2893     max=2893     p(90)=2893     p(95)=2893    
     vus............................: 1       min=1      max=1
     vus_max........................: 1       min=1      max=1
```

Your custom metric, `transaction_duration`, is reported along with the other built-in k6 metrics.

## Test your knowledge

### Question 1

In which of the following situations might it be appropriate to use a custom metric in your k6 script?

A: When you want to know the response time of a certain URL

B: When you are asked to report how many requests were executed in total during a test

C: When you want to measure something that the built-in metrics don't cover

### Question 2

Which type of custom metric would be best for tracking how many opened forms had a certain checkbox ticked?

A: Trend

B: Counter

C: Gauge

### Question 3

How can you get a report on custom metrics after a test?

A: All custom metrics are displayed in the end-of-test summary report.

B: You have to log in to k6 Cloud to see the results.

C: Only rate and trend metric results are shown in the end-of-test summary report.

### Answers

1. C. Both A and B describe metrics that already exist by default. Custom metrics are for creating and measuring things beyond what comes with k6 out of the box.
2. B. A counter would be best for tracking the number of occurrences of an event during the test.
3. A. Custom metrics are displayed at the end-of-test summary report, although they are *also* available in k6 Cloud if you use it. C is false.