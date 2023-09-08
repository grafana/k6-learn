# Think time

---

## What is think time?

The amount of time that a script pauses during test execution to simulate delays that real users have in the course of using an application.

---

## When should you use think time?

- If your test follows a user flow
- If you want to simulate actions that take some time to carry out
- Your load generator, or the machine you're running k6 from, displays high (> 80%) CPU utilization during test execution.

---

## When should you **NOT** use think time?

- You want to do a [stress test](https://k6.io/docs/test-types/stress-testing/) 
- The API endpoint you're testing experiences a high amount of requests per second in production that occur without delays
- Your load generator can run your test script without crossing the 80% CPU utilization mark.

---

## k6 Sleep

```js [2|11]
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

---

**Sleep does not affect the response time (`http_req_duration`); the response time is always reported with sleep removed. Sleep is, however, included in the `iteration_duration`.**

---

## Dynamic think time

A dynamic think time is more realistic, and simulates real users more accurately.

---

### Random sleep

One way to implement dynamic think time is to use the JavaScript `Math.random()` function:

```js
sleep(Math.random() * 5);
```

---

### Random sleep between

```js [1|3]
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.0.0/index.js";

sleep(randomIntBetween(1,5));
```

---

## How much think time should you add?

The real answer is: it depends.

---

## Let's move to scaling up your test

- Move to: [09-load-test-options](?p=09-load-test-options)