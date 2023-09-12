# k6 checks

---

## Our script

```js
import http from 'k6/http';

export default function() {
  let url = 'https://httpbin.test.k6.io/post';
  let response = http.post(url, 'Hello world!');

  console.log(response.json().data);
}
```

---

## Add checks to your script

```js [1|3-6]
import { check } from 'k6';

check(response, {
    'Application says hello': (r) => r.body.includes('Hello world!')
  });
}
```

---

## Let's run our test again!

Do you remember the command to run the test? 👀

```shell
	✓ Application says hello

     checks.........................: 100.00% ✓ 1        ✗ 0
```

---

## Failed checks

```js
check(response, {
      'Application says hello': (r) => r.body.includes('Bonjour!')
  });
}
```

---

## Let's run our test again!

```shell
     ✗ Application says hello
      ↳  0% — ✓ 0 / ✗ 1

     checks.........................: 0.00%  ✓ 0        ✗ 1
```

---

## Failed checks are not errors!

> 💡 To make failing checks stop your test, you can [combine them with thresholds](https://k6.io/docs/using-k6/thresholds/#failing-a-load-test-using-checks).

---

## Making your scripts realistic with think time

- Move to: [08-adding-think-time](?p=08-adding-think-time)