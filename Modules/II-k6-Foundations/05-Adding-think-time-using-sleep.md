# Adding think time using sleep

Before you ramp up your load tests, there's one more thing to add: think time.

_Think time_ is the amount of time that a script pauses during test execution to simulate delays that real users have in the course of using an application.

### When should you use think time?

In general, using think time to accurately simulate end users' behavior makes a load testing script more realistic. If realism would help you achieve your test objectives, using think time can help with that.

You should consider adding think time in the following situations:
- Your test follows a user flow, like accessing different parts of the application in a certain order
- You want to simulate actions that take some time to carry out, like reading text on a page or filling out a form
- Your load generator, or the machine you're running k6 from, displays high (> 80%) CPU utilization during test execution.

The main danger in removing or reducing think time is that it increases how quickly requests are sent, which can, in turn, increase CPU utilization. When CPU usage is too high, the load generator itself is struggling with *sending* the requests, which could lead to inaccurate results such as false negatives. Adding think time is one way to [reduce high CPU usage](https://k6.io/docs/cloud/analyzing-results/performance-insights/#high-load-generator-cpu-usage). 

### When shouldn't you use think time?

Using think time reduces the maximum request rate per VU that you can achieve in your test. It slows down how quickly requests are sent. 

Think time is unnecessary in the following situations:
- You want to do a [stress test](https://k6.io/docs/test-types/stress-testing/) to find out how many requests per second your application can handle
- The API endpoint you're testing experiences a high amount of requests per second in production that occur without delays
- Your load generator can run your test script without crossing the 80% CPU utilization mark.

The last point is a requirement for ensuring that think time isn't increasing test throughput to such a point as to affect the health of your load generator, as discussed in the previous section.

As you can see, the question of whether or not to use think time is dependent on your testing goals. When in doubt, use think time.

## Sleep

In k6, you can add think time using [`sleep()`](https://k6.io/docs/javascript-api/k6/sleep-t/). To use it, you'll need to import sleep and then add the sleep to the part of the script within the default function that you want test execution to pause:

```js
import http from 'k6/http';
import { check, sleep } from 'k6';

export default function() {
  let url = 'https://httpbin.test.k6.io/post';
  let response = http.post(url, 'Hello world!');
  check(response, {
      'Application says hello': (r) => r.body.includes('Hello world!')
  });

  sleep(1);
}
```

`sleep(1);` means that the script will pause for 1 second when it is executed.

Including sleep does not affect the response time (`http_req_duration`); the response time is always reported with sleep removed. Sleep *is*, however, included in the [iteration duration](03-Understanding-k6-results.md#Iteration-duration).

### Dynamic think time

The problem with hard-coding a delay into your script is that it introduces an artificial pattern to your test that may later cause load on your application to be more predictable than it would be in production.

**Testing best practice:** Use dynamic think time.

A dynamic think time is more realistic, and simulates real users more accurately, in turn improving the accuracy and reliability of your test results.

#### Random sleep

One way to implement dynamic think time is to use the JavaScript `Math.random()` function:

```js
sleep(Math.random() * 5);
```

The line above instructs k6 to sleep for a random amount of time between 0 and 5, inclusive of 0 but not of 5. The value selected is not guaranteed to be an integer.

#### Random sleep between

If you'd prefer to define your think time in integers, try the `randomIntBetween` function from the k6 library of useful functions, called [jslib](https://jslib.k6.io/).

First, import the relevant function:

```js
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.0.0/index.js";
```

Then, add this within your default function:

```js
sleep(randomIntBetween(1,5));
```

The script will pause for a number of seconds between 1 and 5, inclusive of both 1 and 5.

## How much think time should you add?

The real answer is: it depends.

Some factors that affect the duration of the think time you add are the goals for your testing, what the production traffic looks like, and the computing resources that you have at your disposal. It's best to model test scripts as closely as possible to what occurs in production environments.

In the absence of any data on production traffic, however, you can time how long it takes for *you* to go through a user flow and use that as a starting point.

## Test your knowledge

### Question 1

You're testing a new "Open a Ticket" page where users are asked to type in their name, email address, and a description of their issue, and their responses are sent to the application team. Should you use think time?

A: Yes, because it will take time for the application team to respond to the ticket.

B: Yes, because users take time to type out their issue.

C: No, because the load generator's CPU utilization is too high.

### Question 2

In the following line, what does the number 3 represent?

`sleep(3)`

A: A think time of 3 milliseconds

B: The number of iterations that will get a think time

C: A think time of 3 seconds

### Question 3

A script without think time runs with a single iteration, and the iteration duration was 5 seconds. What would the iteration duration have been if the script had included a sleep of 1 second?

A: 5 seconds

B: 6 seconds

C: 4 seconds

### Answers

1. B. A is incorrect because think time simulates the time taken for the user to interact with the application, not the time taken for the application team to respond. C is incorrect because adding think time does not increase CPU utilization; in fact, the opposite is true in that in reduces CPU utilization by spacing out requests.
2. C. The parameter of `sleep()` takes a value given in seconds, so `sleep(3)` will pause script execution for 3 seconds.
3. B. If a script takes 5 second to execute without sleep, and a sleep of 1 second is included, then the script will take 6 seconds to execute.