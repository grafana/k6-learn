Before you ramp up your load tests, there's one more thing to add: think time.

[Think time](Performance%20Testing%20Terminology.md#Think%20time) is the amount of time that a script pauses during test execution to simulate delays that real users have in the course of using an application.

### When should you use think time?

You should consider adding think time in the following situations:
- Your test follows a user flow, like accessing different parts of the application in a certain order
- You want to simulate actions that take some time to carry out, like reading text on a page or filling out a form
- Your [load generator](Performance%20Testing%20Terminology.md#Load%20generator), or the machine you're running k6 from, displays high (> 80%) CPU utilization during test execution.

Not including think time in a script that is executed iteratively takes up more resources on the load generator, which could lead to inaccurate results. Adding think time is one way to [reduce high CPU usage](https://k6.io/docs/cloud/analyzing-results/performance-insights/#high-load-generator-cpu-usage).

### When shouldn't you use think time?

Think time is unnecessary in the following situations:
- You want to do a [stress test](Types%20of%20load%20tests.md#Stress%20Test) to find out how many requests per second your application can handle
- The API endpoint you're testing experiences a high amount of requests per second in production that occur without delays
- Your load generator can run your test script without crossing the 80% CPU utilization mark.

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

Including sleep does not affect the response time (`http_req_duration`); the response time is always reported with sleep removed. Sleep *is*, however, included in the [iteration duration](Understanding%20k6%20results.md#Iteration%20duration).

### Dynamic think time

The problem with hard-coding a delay into your script is that it introduces an artificial pattern to your test that may cause later cause load on your application to be more predictable than it would be in production.

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

Some factors that may influence the duration of the right think time for your script are:
- 

## Test your knowledge

### Question 1

You're testing a new "Open a Ticket" page where users are asked to type in their name, email address, and a description of their issue, and their responses are sent to the application team. Should you use think time?

A: Yes, because it will take time for the application team to respond to the ticket.
B: Yes, because users take time to type out their issue.
C: No, because the load generator's CPU utilization is too high.

Answer: B

### Question 2



A: 
B: 
C: 

Answer: C

### Question 3



A: 
B: 
C: B

Answer: 

## Next Up

You've got your script, and you've added a check and think time. Time to ramp it up and run a larger test with multiple users! In the next section, you'll learn how to change test options in k6.