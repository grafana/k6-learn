## Review

In [Clarifying testing criteria](Clarifying%20testing%20criteria.md#Checks), you learned about the different levels of test criteria. One type of test criteria, [checks](Performance%20Testing%20Terminology.md#Check), can be used to verify the response returned by a request.

Up until now, you've been using `console.log()` to print the response body to the terminal. This approach is useful for debugging, but it can quickly get out of hand if the response body is large or if you decide to run the test with more than one VU. Instead, in this section, you'll learn how to use checks.

## How to add checks to your script

Back to the script!

You already know the expected response of the target server to the request the script is sending: it should send back whatever the script sends to it. In this case, that's `Hello world!`

So, remove the `console.log()` statement and add a check by copying this code snippet:

```js
import http from 'k6/http';
import check from 'k6';

export default function() {
  let url = 'https://httpbin.test.k6.io/post';
  let response = http.post(url, 'Hello world!');
  check(response, {
      'Application says hello': (r) => r.body.includes('Hello world!')
  });
}
```

Note that you need to import the `check` from the k6 library:

```js
import check from 'k6'
```

And you need to put the actual check in the default function:

```js
check(response, {
      'Application says hello': (r) => r.body.includes('Hello world!')
  });
}
```

The check you've just added looks for the string `Hello world!` in the body of the response of *every* request.

### Running the script

What does it look like in the end-of-test summary? Save your script and run:

```plain
k6 run test.js
```

and you should see output similar to this:

```plain
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


running (00m00.7s), 0/1 VUs, 1 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  00m00.7s/10m0s  1/1 iters, 1 per VU

     ✓ Application says hello

     checks.........................: 100.00% ✓ 1        ✗ 0
     data_received..................: 5.9 kB  8.4 kB/s
     data_sent......................: 564 B   801 B/s
     http_req_blocked...............: avg=582.6ms  min=582.6ms  med=582.6ms  max=582.6ms  p(90)=582.6ms  p(95)=582.6ms 
     http_req_connecting............: avg=121.14ms min=121.14ms med=121.14ms max=121.14ms p(90)=121.14ms p(95)=121.14ms
     http_req_duration..............: avg=120.62ms min=120.62ms med=120.62ms max=120.62ms p(90)=120.62ms p(95)=120.62ms
       { expected_response:true }...: avg=120.62ms min=120.62ms med=120.62ms max=120.62ms p(90)=120.62ms p(95)=120.62ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 1
     http_req_receiving.............: avg=72µs     min=72µs     med=72µs     max=72µs     p(90)=72µs     p(95)=72µs    
     http_req_sending...............: avg=292µs    min=292µs    med=292µs    max=292µs    p(90)=292µs    p(95)=292µs   
     http_req_tls_handshaking.......: avg=405.16ms min=405.16ms med=405.16ms max=405.16ms p(90)=405.16ms p(95)=405.16ms
     http_req_waiting...............: avg=120.26ms min=120.26ms med=120.26ms max=120.26ms p(90)=120.26ms p(95)=120.26ms
     http_reqs......................: 1       1.419825/s
     iteration_duration.............: avg=703.46ms min=703.46ms med=703.46ms max=703.46ms p(90)=703.46ms p(95)=703.46ms
     iterations.....................: 1       1.419825/s
```

The new check is displayed in the lines:

```plain
	✓ Application says hello

     checks.........................: 100.00% ✓ 1        ✗ 0
```

and the `✓` means that all the requests executed (just one in this test run) passed the check. This test run had a 100% pass rate for checks.

### Failed checks

What does it look like when the check fails?

Modify the script to search for text that shouldn't be found in the response, like so:

```js
import http from 'k6/http';
import { check } from 'k6';

export default function() {
  let url = 'https://httpbin.test.k6.io/post';
  let response = http.post(url, 'Hello world!');
  check(response, {
      'Application says hello': (r) => r.body.includes('Bonjour!')
  });
}
```

Run that, and you should get the following result:

```plain
     ✗ Application says hello
      ↳  0% — ✓ 0 / ✗ 1

     checks.........................: 0.00%  ✓ 0        ✗ 1
```

This time, the `✗ 1` indicates that one check failed.

### Failed checks are not errors

You may have noticed that in the last example, `http_req_failed`, or the HTTP error rate, was not affected by the failing check. This is because checks do not stop a script from executing successfully, and they do not return a failed exit status.

```ad-tip
To make failing checks stop your test, you can [combine them with thresholds](https://k6.io/docs/using-k6/thresholds/#failing-a-load-test-using-checks).
```

## Other types of checks

The [checks](https://k6.io/docs/using-k6/checks/) page contains other types of checks you can do, including the HTTP response code and the response body size. You can also include multiple checks for a single response.

## Next up

You're almost ready to scale up your test to multiple users! Before you do so, the next section discusses how to make your test realistic with think time.

## Test your knowledge

### Question 1

Which of the following can you use a check to verify?

A: Whether the 95th percentage response time of the request was greater than 1 s
B: The size of the response body returned
C: The error rate of the test



### Question 2

What part of the test do checks assess?

A: The response time of a request
B: The syntax of the request sent to the application
C: The application server's response


### Question 3

In the following snippet from the end-of-test summary, how many checks failed?

```plain
     ✗ Application says hello
      ↳  51% — ✓ 1215 / ✗ 1144

     checks.........................: 51.50% ✓ 1215      ✗ 1144
```

A: 51.50%
B: 1215
C: 1144

### Answer

1. B. The 95th percentile of the response time is an aggregated metric: it relies on measurements from all requests up to that point. This is not something you can create a check for, although you can certainly include this as a [threshold](https://k6.io/docs/using-k6/thresholds/) in your script. The error rate of a test is similarly aggregated. B, the size of the response body, is the correct answer.
2. C. Checks parse the responses from the application server, not the request sent by k6.
3. C. The number of checks that failed is displayed in  `✗ 1144`. This request's checks passed 51.50% of the time.
