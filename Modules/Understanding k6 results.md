In the last section, you ran your first k6 test-- but how do you know what happened in the test? 

In this section, you'll learn how to understand the default output of k6 and determine whether your script did as intended.

## The End-of-test summary report

Here's that output again:

```plain
$ k6 run test.js

          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: test.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 10m30s max duration (incl. graceful stop):
           * default: 1 iterations for each of 1 VUs (maxDuration: 10m0s, gracefulStop: 30s)

INFO[0001] Hello world!                                  source=console

running (00m00.7s), 0/1 VUs, 1 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  00m00.7s/10m0s  1/1 iters, 1 per VU

     data_received..................: 5.9 kB 9.0 kB/s
     data_sent......................: 564 B  860 B/s
     http_req_blocked...............: avg=524.18ms min=524.18ms med=524.18ms max=524.18ms p(90)=524.18ms p(95)=524.18ms
     http_req_connecting............: avg=123.28ms min=123.28ms med=123.28ms max=123.28ms p(90)=123.28ms p(95)=123.28ms
     http_req_duration..............: avg=130.19ms min=130.19ms med=130.19ms max=130.19ms p(90)=130.19ms p(95)=130.19ms
       { expected_response:true }...: avg=130.19ms min=130.19ms med=130.19ms max=130.19ms p(90)=130.19ms p(95)=130.19ms
     http_req_failed................: 0.00%  ✓ 0        ✗ 1
     http_req_receiving.............: avg=165µs    min=165µs    med=165µs    max=165µs    p(90)=165µs    p(95)=165µs   
     http_req_sending...............: avg=80µs     min=80µs     med=80µs     max=80µs     p(90)=80µs     p(95)=80µs    
     http_req_tls_handshaking.......: avg=399.48ms min=399.48ms med=399.48ms max=399.48ms p(90)=399.48ms p(95)=399.48ms
     http_req_waiting...............: avg=129.94ms min=129.94ms med=129.94ms max=129.94ms p(90)=129.94ms p(95)=129.94ms
     http_reqs......................: 1      1.525116/s
     iteration_duration.............: avg=654.72ms min=654.72ms med=654.72ms max=654.72ms p(90)=654.72ms p(95)=654.72ms
     iterations.....................: 1      1.525116/s

```

This is called the end-of-test summary report, and is the default way that k6 displays test results.

Let's go through it, line by line.

### Execution parameters

```plain
execution: local
```

k6 OSS can be used to run test scripts either on the machine it is installed on ("local") or on k6 Cloud ("cloud"). In this test, the test script was executed on your local machine.

```plain
script: test.js`
```

This is the filename of the script that was executed.

```plain
output: -`
```

This indicates that the default behavior: k6 has printed your test results to standard output. 

k6 can also [output results elsewhere](https://k6.io/docs/getting-started/results-output/#external-outputs), in different formats. When these options are used, they will also be displayed in `output`.

```plain
scenarios: (100.00%) 1 scenario, 1 max VUs, 10m30s max duration (incl. graceful stop):`
```

An execution [scenario](Performance%20Testing%20Terminology.md#Scenario) is a set of instructions about running a test: what code should be run, when and how often it should be run, and other configurable parameters. In this case, your first test was executed using default parameters: one scenario, one [virtual user (VU)](Performance%20Testing%20Terminology.md#Virtual%20user), and a max duration of 10 minutes and 30 seconds. 

The max duration is the execution time limit; it is the time beyond which the test will be forcibly stopped. In this case, k6 received a response to the request in the script long before this time period elapsed.

A [graceful stop](Performance%20Testing%20Terminology.md#Graceful%20stop) is a termination of the test that allows k6 to finish off any running [iterations](Performance%20Testing%20Terminology.md#Iteration), if possible. By default, k6 includes a graceful stop of 30 seconds within the max duration of 10 minutes and 30 seconds.

```plain
* default: 1 iterations for each of 1 VUs (maxDuration: 10m0s, gracefulStop: 30s)`
```

`default` here refers to the scenario name. Since the test script did not have any explicitly set up, the default name has been chosen for it.

An iteration is a single execution loop of the test. Load tests typically involve repeated execution loops within a certain amount of time so that requests are continuously made. Unless otherwise specified, k6 runs through the default function once.

Think of a virtual user as a single thread or instance that attempts to simulate a real end user of your application. In this case, k6 only started one virtual user to run the test.

### Console output

This section of the end-of-test summary is usually skipped, but your test script included a line to save part of the response body to the console (`console.log(response.json().data);`). Here's what that looks like in the report:

```plain
INFO[0001] Hello world!                                  source=console`
```

The test script's target endpoint, `https://httpbin.test.k6.io/post` returns whatever was sent in the POST body, so this is a good sign! It means that the target endpoint received the `Hello world!` that you sent in your script and sent the same body back.

If you had used multiple `console.log()` statements in the test script, they would all appear in this section.

### Execution summary

The execution summary shows an overview of what happened during the test run.

```plain
running (00m00.7s), 0/1 VUs, 1 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  00m00.7s/10m0s  1/1 iters, 1 per VU
```

In this case, the test ran for 0.7 seconds with 1 VU. A single iteration was executed and fully completed (i.e., it was not interrupted). 1 iteration per VU was executed (a total of 1).

### k6 built-in metrics

Now for the [metrics](Performance%20Testing%20Terminology.md#Metric)! k6 comes with [many built-in metrics](https://k6.io/docs/using-k6/metrics/#built-in-metrics).

```plain
     data_received..................: 5.9 kB 9.0 kB/s
     data_sent......................: 564 B  860 B/s
     http_req_blocked...............: avg=524.18ms min=524.18ms med=524.18ms max=524.18ms p(90)=524.18ms p(95)=524.18ms
     http_req_connecting............: avg=123.28ms min=123.28ms med=123.28ms max=123.28ms p(90)=123.28ms p(95)=123.28ms
     http_req_duration..............: avg=130.19ms min=130.19ms med=130.19ms max=130.19ms p(90)=130.19ms p(95)=130.19ms
       { expected_response:true }...: avg=130.19ms min=130.19ms med=130.19ms max=130.19ms p(90)=130.19ms p(95)=130.19ms
     http_req_failed................: 0.00%  ✓ 0        ✗ 1
     http_req_receiving.............: avg=165µs    min=165µs    med=165µs    max=165µs    p(90)=165µs    p(95)=165µs   
     http_req_sending...............: avg=80µs     min=80µs     med=80µs     max=80µs     p(90)=80µs     p(95)=80µs    
     http_req_tls_handshaking.......: avg=399.48ms min=399.48ms med=399.48ms max=399.48ms p(90)=399.48ms p(95)=399.48ms
     http_req_waiting...............: avg=129.94ms min=129.94ms med=129.94ms max=129.94ms p(90)=129.94ms p(95)=129.94ms
     http_reqs......................: 1      1.525116/s
     iteration_duration.............: avg=654.72ms min=654.72ms med=654.72ms max=654.72ms p(90)=654.72ms p(95)=654.72ms
     iterations.....................: 1      1.525116/s
```

Below are the most important metrics to look at to assess your test results.

#### Response time

```plain
http_req_duration..............: avg=130.19ms min=130.19ms med=130.19ms max=130.19ms p(90)=130.19ms p(95)=130.19ms
```

"Response time" can be vague, because it can be broken down into multiple components. However, in most cases, `http_req_duration` is the metric you're looking for. It includes:
- `http_req_sending` (the time it took to send data to the target host)
- `http_req_waiting` (Time to First Byte or "TTFB"; the time it took before the target server began to respond to the request)
- `http_req_receiving` (the time it took for the target server to process and fully respond to k6)

The response time in this line is reported as an average, minimum, median, maximum, 90th percentile, and 95th percentile, in milliseconds (ms). If you're not sure which to use, take the 95th percentile figure.

A 95th percentile response time of 130.19 ms means that 95% of the requests had a response time of 130.19 ms or less. In this particular situation, however, your test script only made a single request, so all the metrics in this line are reporting the same value: 130.19 ms. When you run tests with multiple requests, you'll see a variation in these values.

Something to keep in mind here is that `http_req_duration` is the value for *all* requests, whether or not they passed. This behavior can cause misunderstandings when interpreting response times, because failed requests can often have a shorter or longer response time than successful ones.

The line below reports the response time for only the successful requests.

```plain
  { expected_response:true }...: avg=130.19ms min=130.19ms med=130.19ms max=130.19ms p(90)=130.19ms p(95)=130.19ms
```

To improve accuracy and prevent failed requests from skewing results, use the 95th percentile value of the successful requests as a response time.

#### Error rate

The `http_req_failed` metric describes the [error rate](Performance%20Testing%20Terminology.md#Error%20rate) for the test. The error rate is the number of requests that failed during the test, as a percentage of the total requests.

```plain
http_req_failed................: 0.00%  ✓ 0        ✗ 1
```

`http_req_failed` automatically marks HTTP response codes of between 200 and 399. This means that HTTP 4xx and HTTP 5xx response codes are considered errors by k6 by default. (Note: This behavior can be changed using [`setResponseCallback`](https://k6.io/docs/javascript-api/k6-http/setresponsecallback-callback).)

This test run had an error rate of `0.00%`, because the single request it ran succeeded. It may seem counter-intuitive, but the `✓` on this line actually means that no requests had `http_req_failed = true`, meaning that there were no failures. Conversely, the `✗` means that 1 request had `http_req_failed = false`, meaning that it was successful.

#### Number of requests

The number of total requests sent by all VUs during the test is described in the line below.

```plain
http_reqs......................: 1      1.525116/s
```

Additionally, the number `1.525116/s` is the number of **requests per second (rps)** that the test executed throughout the test. In some tools, this is described as "test throughput". This helps you further quantify how much load your application experienced during the test.

#### Iteration duration

`http_req_duration`, the most commonly used metric for "response time", measures the time taken for an HTTP request within the script to get a response from the server. But what if you have multiple HTTP requests strung together in a user flow, and you'd like to know how the entire flow would take for a user?

In that case, the iteration duration is the metric you should have a look at.

```plain
iteration_duration.............: avg=654.72ms min=654.72ms med=654.72ms max=654.72ms p(90)=654.72ms p(95)=654.72ms
```

The iteration duration is the amount of time it took for k6 to perform a single loop of your entire script. If your script included steps like logging in, browsing a product page, adding to a cart, and entering payment information, then the iteration duration gives you an idea of how long one of your application's users might take to purchase a product.

This metric could be useful when you're trying to decide on what is an acceptable response time for each HTTP request. For example, perhaps the payment request takes 2 seconds, but if the total iteration duration is still only 3 seconds, you might decide that's acceptable anyway.

Like the other metrics, the iteration duration is expressed in terms of the average, minimum, median, maximum, 90th percentile, and 95th percentile times, in milliseconds.

#### Number of iterations

The number of iterations describes how many times k6 looped through your script in total, including the iterations for all VUs. This metric can be useful when you want to verify some output associated with each iteration, such as an account signup.

```plain
iterations.....................: 1      1.525116/s
```

The number `1.525116/s` on the same line is the **iterations per second**. It describes the rate at which k6 did full iterations through the script. This, like [requests per second](Understanding%20k6%20results.md#Number%20of%20requests), is a measure of the speed or rate at which k6 sent messages to the application server.

## Next up

Logging the response bodies of requests to the console might be good when troubleshooting, but what if you just want to verify the response automatically, without having to check the log? In the next section, you'll learn about checks.

## Test your knowledge

To answer the following questions, refer to the sample end-of-test summary report below.

```plain
          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: test.js
     output: -

  scenarios: (100.00%) 1 scenario, 10 max VUs, 2m30s max duration (incl. graceful stop):
           * default: 10 looping VUs for 2m0s (gracefulStop: 30s)


running (2m00.1s), 00/10 VUs, 9463 complete and 0 interrupted iterations
default ✓ [======================================] 10 VUs  2m0s

     data_received..................: 6.3 MB 52 kB/s
     data_sent......................: 1.5 MB 12 kB/s
     http_req_blocked...............: avg=4.46ms   min=1µs      med=5µs      max=647.67ms p(90)=9µs      p(95)=11µs    
     http_req_connecting............: avg=1.4ms    min=0s       med=0s       max=255.11ms p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=122.22ms min=111.57ms med=120.95ms max=282.39ms p(90)=127.78ms p(95)=131.04ms
       { expected_response:true }...: avg=122.22ms min=111.57ms med=120.95ms max=282.39ms p(90)=127.78ms p(95)=131.04ms
     http_req_failed................: 0.00%  ✓ 0         ✗ 9463
     http_req_receiving.............: avg=107.08µs min=15µs     med=85µs     max=13.35ms  p(90)=163µs    p(95)=197µs   
     http_req_sending...............: avg=35.86µs  min=5µs      med=30µs     max=2.7ms    p(90)=59µs     p(95)=72µs    
     http_req_tls_handshaking.......: avg=2.99ms   min=0s       med=0s       max=501.24ms p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=122.08ms min=111.47ms med=120.81ms max=282.16ms p(90)=127.64ms p(95)=130.87ms
     http_reqs......................: 9463   78.808231/s
     iteration_duration.............: avg=126.85ms min=111.75ms med=121.14ms max=803.13ms p(90)=128.46ms p(95)=132.55ms
     iterations.....................: 9463   78.808231/s
     vus............................: 10     min=10      max=10
     vus_max........................: 10     min=10      max=10
```


### Question 1

Which of the following is the best value to use as the response time for all HTTP requests?

A: 131.04 ms
B: 122.08 ms
C: 4.46 ms

### Question 2

How many virtual users did this test execute?

A: 9463
B: 1
C: 10


### Question 3

How many requests failed?

A: 0
B: 9463
C: 10

### Answers

1. A. B refers to `http_req_waiting`, which is only a component of the response time. C refers to `http_req_blocked`, which refers to the time spent waiting for a TCP connection to be established before sending the request. A is the 95th percentile value for `http_req_duration`, which is the best metric to use for response time.
2. C. The number of VUs is listed in the second to the last row in the results, and is 10 in this case.
3. A. In the line with the metric `http_req_failed`, the `0.00%  ✓ 0` refers to the number of responses with errors. That is, how many of the requests had `http_req_failed` set to `true`. 9463 is the number of requests that passed, or had `http_req_failed` set to `false`. The correct answer is A, 0. None of the requests failed, and the test ha a 0% error rate.
