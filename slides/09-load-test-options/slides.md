# k6 Load Test Options

---

## Script options

```js
export let options = {
  vus: 10,
  iterations: 40,
};
```

---

> 💡 If you only define VUs and no other test options, you may get the following error:

```shell
          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

WARN[0000] the `vus=10` option will be ignored, it only works in conjunction with `iterations`, `duration`, or `stages` 
  execution: local
     script: test.js
     output: -
```

---

## Iterations

```js
  vus: 10,
  iterations: 40,
```

> Setting the number of iterations in test options defines it for **all** users.

---

## Duration

```js
  vus: 10,
  duration: '2m'
```

> Setting the duration instructs k6 to repeat the script for each of the VUs until the duration is reached.

---

## Iterations and durations

```js
  vus: 10,
  duration: '5m',
  iterations: 40,
```

> If you set the duration in conjunction with setting the number of iterations, the value that ends earlier is used.

---

## Stages

Defining iterations and duration creates a _simple load profile_

![A simple load profile](../../images/load_profile-no_ramp-up_or_ramp-down.png)
<!-- .element class="stretch" -->

---

## Constand load profile

What if you want to add a ramp-up or ramp-down, so that the profile looks more like this?

![Constant load profile, with ramps](../../images/load_profile-constant.png.png)
<!-- .element class="stretch" -->

---

In that case, you may want to use [stages](https://k6.io/docs/using-k6/options/#stages).

```js
export let options = {
  stages: [
    { duration: '30m', target: 100 },
    { duration: '1h', target: 100 },
    { duration: '5m', target: 0 },
  ],
};
```

---

## The full script so far

If you're using stages, here's what your script should look like so far:

```js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30m', target: 100 },
    { duration: '1h', target: 100 },
    { duration: '5m', target: 0 },
  ],
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

## Let's set some thresholds

- Move to [10-setting-test-criteria-with-thresholds](?p=10-setting-test-criteria-with-thresholds)