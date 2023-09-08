# k6 Thresholds

---

## Add thresholds to your script

```js [7-10]
export let options = {
  stages: [
    { duration: '30m', target: 100 },
    { duration: '1h', target: 100 },
    { duration: '5m', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<=0.05'],
    http_req_duration: ['p(95)<=5000'],
  },
};
```

---

> 💡 Thresholds are **always** based on metrics.

---

## Types of thresholds

- Error rate
- Response time
- Checks

> 💡 Recommended: Use error rate, response time, and checks thresholds in your tests where possible.

---

### Error rate

```js
thresholds: {
    http_req_failed: ['rate<=0.05'],
},
```

---

### Response time

```js
thresholds: {
    http_req_duration: ['p(95)<=5000'],
},
```

> 💡 Recommended: Start with the 95th percentile response time. 

---

#### Using multiple response time thresholds

```js
thresholds: {
    http_req_duration: ['p(90) < 400', 'p(95) < 800', 'p(99.9) < 2000'],
},
```

---

### Checks

```js
thresholds: {
  checks: ['rate>=0.9'],
},
```

---

## Aborting test on fail

```js
thresholds: {
    http_req_failed: [{
      threshold: 'rate<=0.05',
      abortOnFail: true,
    }],
},
```

---

## The full script

```js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30m', target: 100 },
    { duration: '1h', target: 100 },
    { duration: '5m', target: 0 },
  ],
  thresholds: {
    http_req_failed: [{
      threshold: 'rate<=0.05',
      abortOnFail: true,
    }],
    http_req_duration: ['p(95)<=100'],
    checks: ['rate>=0.99'],
  },
};

export default function() {
  let url = 'https://httpbin.test.k6.io/post';
  let response = http.post(url, 'Hello world!');
  check(response, {
      'Application says hello': (r) => r.body.includes('Hello world!')
  });

  sleep(Math.random() * 5);
}
```

---

## Output k6 results in different ways

- Move to [11-k6-results-output-options](?p=11-k6-results-output-options)