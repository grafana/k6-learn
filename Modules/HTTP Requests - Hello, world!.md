%%
tags:
  - #workshop
  - #devrel 
  - #community
%%



As a first step, we'll do a basic HTTP POST request against a test API that will echo back whatever we're sending to it.

Create a new file named `test.js`, and open it in your favorite IDE:

```bash
$ touch ./test.js
```

We'll now start by importing the HTTP Client from the built-in module `k6/http`.

```js
import http from 'k6/http';
```

We'll then create and export a default function, which is what will be executed by our virtual user:

```js
export default function() {
}
```

Next, we'll add the logic for making the actual http call.

```js
import http from 'k6/http';

export default function() {
  let url = 'https://httpbin.test.k6.io/';
  http.post(url, 'hello, world!');
}
```

While this will work, it's not particularly useful. We have no idea whether the request actually returns anything, and if it does; whether it is what we expected. Let's log the response to the console, just to make sure:

```js
import http from 'k6/http';

export default function() {
  let url = 'https://httpbin.test.k6.io/';
  let r = http.post(url, 'hello, world!');
  
  console.log(r.json().data);
}
```

As a last step, let's go ahead and actually run our test:

```plain
$ k6 run test.js

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: 01-hello-world.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 10m30s max duration (incl. graceful stop):
           * default: 1 iterations for each of 1 VUs (maxDuration: 10m0s, gracefulStop: 30s)

INFO[0001] hello, world!                                 source=console

running (00m01.1s), 0/1 VUs, 1 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  00m01.1s/10m0s  1/1 iters, 1 per VU

     data_received..................: 6.0 kB 5.6 kB/s
     data_sent......................: 728 B  681 B/s
     http_req_blocked...............: avg=965.29ms min=965.29ms med=965.29ms max=965.29ms p(90)=965.29ms p(95)=965.29ms
     http_req_connecting............: avg=98.43ms  min=98.43ms  med=98.43ms  max=98.43ms  p(90)=98.43ms  p(95)=98.43ms
     http_req_duration..............: avg=102.06ms min=102.06ms med=102.06ms max=102.06ms p(90)=102.06ms p(95)=102.06ms
       { expected_response:true }...: avg=102.06ms min=102.06ms med=102.06ms max=102.06ms p(90)=102.06ms p(95)=102.06ms
     http_req_failed................: 0.00%  ✓ 0   ✗ 1
     http_req_receiving.............: avg=63µs     min=63µs     med=63µs     max=63µs     p(90)=63µs     p(95)=63µs
     http_req_sending...............: avg=240µs    min=240µs    med=240µs    max=240µs    p(90)=240µs    p(95)=240µs
     http_req_tls_handshaking.......: avg=324.53ms min=324.53ms med=324.53ms max=324.53ms p(90)=324.53ms p(95)=324.53ms
     http_req_waiting...............: avg=101.75ms min=101.75ms med=101.75ms max=101.75ms p(90)=101.75ms p(95)=101.75ms
     http_reqs......................: 1      0.936076/s
     iteration_duration.............: avg=1.06s    min=1.06s    med=1.06s    max=1.06s    p(90)=1.06s    p(95)=1.06s
     iterations.....................: 1      0.936076/s
     vus............................: 1      min=1 max=1
     vus_max........................: 1      min=1 max=1

```

Did you spot that? The logging we added is actually part of the output! 

```plain
INFO[0001] hello, world!                                 source=console
```

> ### 🧠  Did you know?
> The k6 HTTP client has built-in support for all of the HTTP methods commonly used to interact with a web server. In this example we did a `POST` request using `http.post`, but the following methods are available as well:
> 
> - `DELETE`, or `http.del`
> - `GET`, or `http.get`
> - `OPTIONS`, or `http.options`
> - `PATCH`, or `http.patch`
> - `PUT`,or `http.put`
>
> ...or if you want to do something completely different, the even more customizable `http.request`.

As for the rest of the output, we'll have a look at that in the next part.

## Test your knowledge

### Question 1

How do we access the JSON body of an HTTP response?

A: `response.json()`
B: `response.body()`
C: `response.content`

Answer: A

### Question 2

What is the name of the built-in module that contains the HTTP client?

A: `http`
B: `k6/http-client`
C: `k6/http`

Answer: C

### Question 3

Where in a test script do we place http calls to have them executed by a virtual user?

A: In the global scope
B: In an exported default function
C: In a function called `exec()`

Answer: B