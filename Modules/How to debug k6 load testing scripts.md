# How to debug k6 load testing scripts
While the k6 metrics help you in [understanding what happened in a k6 test](Understanding%20k6%20results.md), you may need more detailed information when you're in the process of writing your load testing script. In this section, you'll learn what you can do to figure out why your script is failing.

<iframe width="560" height="315" src="https://www.youtube.com/embed/Zln_TWOuoho" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
*In this k6 Office Hours, Tom Miseur and Nicole van der Hoeven demonstrate different ways to debug a k6 load testing script.*

## Modify your script

There are a few things you can add to your script that can help you determine what's happening at which point in the script.

### Add checks

You already learned that [adding checks to your script](Adding%20checks%20to%20your%20script.md) helps you identify issues during text execution, but they can be useful during debugging as well. It's good practice to include checks for every major action your script makes, so that it's clear where the issue lies.

Consider the script below.

```js
import http from 'k6/http';

let usernameArr = ['admin', 'user', 'guest'];
let passwordArr = ['adminpw', 'userpw', 'guestpw'];

export default function() {
    // Get random username and password from array
    let rand = Math.floor(Math.random() * 3);
    let username = usernameArr[rand];
    let password = passwordArr[rand];

    http.post('http://test.k6.io/login.php', { login: username, password: password });
}
```

In the script, two simple arrays are declared: one containing usernames, and one containing passwords. The script chooses one pair from those arrays randomly, and then passes them onto an HTTP POST request.

When you run this script, you'll notice that no errors are returned:

```shell

          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: testdata-simple.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 10m30s max duration (incl. graceful stop):
           * default: 1 iterations for each of 1 VUs (maxDuration: 10m0s, gracefulStop: 30s)


running (00m01.1s), 0/1 VUs, 1 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  00m01.1s/10m0s  1/1 iters, 1 per VU

     data_received..................: 6.3 kB 5.5 kB/s
     data_sent......................: 839 B  743 B/s
     http_req_blocked...............: avg=424.56ms min=248.87ms med=424.56ms max=600.26ms p(90)=565.12ms p(95)=582.69ms
     http_req_connecting............: avg=156.1ms  min=131.71ms med=156.1ms  max=180.49ms p(90)=175.61ms p(95)=178.05ms
     http_req_duration..............: avg=139.17ms min=130.49ms med=139.17ms max=147.84ms p(90)=146.1ms  p(95)=146.97ms
       { expected_response:true }...: avg=130.49ms min=130.49ms med=130.49ms max=130.49ms p(90)=130.49ms p(95)=130.49ms
     http_req_failed................: 50.00% ✓ 1        ✗ 1  
     http_req_receiving.............: avg=84.99µs  min=74µs     med=84.99µs  max=96µs     p(90)=93.8µs   p(95)=94.9µs  
     http_req_sending...............: avg=203µs    min=91µs     med=203µs    max=315µs    p(90)=292.59µs p(95)=303.79µs
     http_req_tls_handshaking.......: avg=209.81ms min=0s       med=209.81ms max=419.63ms p(90)=377.66ms p(95)=398.65ms
     http_req_waiting...............: avg=138.88ms min=130.08ms med=138.88ms max=147.67ms p(90)=145.91ms p(95)=146.79ms
     http_reqs......................: 2      1.771779/s
     iteration_duration.............: avg=1.12s    min=1.12s    med=1.12s    max=1.12s    p(90)=1.12s    p(95)=1.12s   
     iterations.....................: 1      0.885889/s
     vus............................: 1      min=1      max=1
     vus_max........................: 1      min=1      max=1
```

There's nothing there that indicates an error, yet there is one.

To find it, add a check to see what the response returned is.

```js
import http from 'k6/http';
import { check } from 'k6';

let usernameArr = ['admin', 'user', 'guest'];
let passwordArr = ['adminpw', 'userpw', 'guestpw'];

export default function() {
    // Get random username and password from array
    let rand = Math.floor(Math.random() * 3);
    let username = usernameArr[rand];
    let password = passwordArr[rand];

    let response = http.post('http://test.k6.io/login.php', { login: username, password: password });
    check(response, {
        'is status 200': (r) => r.status === 200,
    })
}
```

The above script now checks whether the response returned is an HTTP 200.

Run that script, and you'll see a significant change in the end-of-test summary:

```shell
     ✗ is status 200
      ↳  0% — ✓ 0 / ✗ 1
```



### Add logging

You can add logging at specific parts of your script by using `console.log()`. The script below shows this statement in action:

```js
import http from 'k6/http';
import { check } from 'k6';

let usernameArr = ['admin', 'user', 'guest'];
let passwordArr = ['adminpw', 'userpw', 'guestpw'];

export default function() {
    // Get random username and password from array
    let rand = Math.floor(Math.random() * 3);
    let username = usernameArr[rand];
    let password = passwordArr[rand];
    console.log('username: ' + username, ' / password: ' + password);

    let response = http.post('http://test.k6.io/login.php', { login: username, password: password });
    check(response, {
        'is status 200': (r) => r.status === 200,
    })
}
}
```

Imagine that you ran this script, and you got back an HTTP 403 Forbidden. This error usually means that something went wrong with the authentication. How do you know which username and password combination the script tried?

The `console.log()` statement prints out the exact combination used, like this:

```shell
INFO[0000] username: guest  / password: guestpw          source=console
```

That way, you know exactly which combination to try. Perhaps the username or the password is incorrect, or perhaps both. Either way, adding logs to your script help you understand the value of key variables your script uses.



### The HTTP debug flag

### Streamlining script structure

## Create a custom summary output

## Use a proxy

## Experimental: Use a debugger

## A note on debugging

Disable it for test execution

## Test your knowledge