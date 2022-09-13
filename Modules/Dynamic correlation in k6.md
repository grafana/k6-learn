# Dynamic correlation in k6

In the previous section, you learned [different approaches to debugging a script in k6](Modules/How%20to%20debug%20k6%20load%20testing%20scripts.md), and ended up encountering an issue that every load tester faces: correlation.

## What is correlation?

Correlation is the process of extracting a value from a previous HTTP response and using that value in the next HTTP request.

The request flow of a user accessing an application might look like this:
- Step 1. HTTP GET request for *My Messages* page.
- Step 2. HTTP POST request with username and password

In the previous section, the script attempted to log in immediately (skipping Step 1 and going straight to Step 2), but after applying some debugging techniques, you discovered that the response code is an HTTP 403 Forbidden, with `error: invalid csrf token` in the response body.

To correct this error and accurately mimic user behavior, the script must:
- Save the response to the request in Step 1.
- Extract the csrf token from Step 1.
- Pass the csrf token when requesting Step 2.

Since the script starts with Step 2, you need to add another request for Step 1.

## Scripting the previous request

Comment out everything in the `default` function for now and paste this code in:

```js
let response = http.get('https://test.k6.io/my_messages.php');
    check(response, {
        'is Unauthorized': r => r.body.includes('Unauthorized'),
    })
```

This snippet requests the *My Messages* page and verifies whether it contains the word "Unauthorized" in the body. To see that in action, run the script with full HTTP debugging:

```shell
k6 run test.js --http-debug=full
```

Your output should look something like this:

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

INFO[0000] Request:
GET /my_messages.php HTTP/1.1
Host: test.k6.io
User-Agent: k6/0.36.0 (https://k6.io/)
Accept-Encoding: gzip

  group= iter=0 request_id=aae39c79-6ad4-47de-631a-6213e3b218be scenario=default source=http-debug vu=1
INFO[0001] Response:
HTTP/1.1 200 OK
Transfer-Encoding: chunked
Connection: keep-alive
Content-Type: text/html; charset=UTF-8
Date: Thu, 03 Feb 2022 14:01:13 GMT
Set-Cookie: csrf=NjI1NjkwOTkw; expires=Thu, 03-Feb-2022 15:01:13 GMT; Max-Age=3600; path=/; domain=test.k6.io; httponly
X-Powered-By: PHP/5.6.40

3bb
 

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>My messages</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="icon" href="/static/favicon.ico" sizes="32x32">
</head>
<body>

<p><a href="/">&lt; Back</a></p>


<h2>Unauthorized</h2>
<p><small>Hint: try <code>admin</code>/<code>123</code> or
<code>test_user</code>/<code>1234</code></small></p>

<form method="POST" action="/login.php">
<input type="hidden" name="redir" value="1"> 
<input type="hidden" name="csrftoken" value="NjI1NjkwOTkw">
<table cellpadding="5" cellspacing="0" border="0" width="1%">
<tr>
  <td>Login:</td><td><input type="text" name="login" autocomplete="off"></td>
</tr>
<tr>
  <td>Password:</td><td><input type="password" name="password" autocomplete="off"></td>
</tr>
</table>
<input type="submit" value="Go!">
</form>


<p><small>Imitation page. Copyright &copy; 2022, k6.io</small></p>

</body>
</html>

0

  group= iter=0 request_id=aae39c79-6ad4-47de-631a-6213e3b218be scenario=default source=http-debug vu=1

running (00m00.6s), 0/1 VUs, 1 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  00m00.6s/10m0s  1/1 iters, 1 per VU

     ✓ is Unauthorized

     checks.........................: 100.00% ✓ 1        ✗ 0
     data_received..................: 6.7 kB  11 kB/s
     data_sent......................: 526 B   866 B/s
     http_req_blocked...............: avg=493.46ms min=493.46ms med=493.46ms max=493.46ms p(90)=493.46ms p(95)=493.46ms
     http_req_connecting............: avg=112.34ms min=112.34ms med=112.34ms max=112.34ms p(90)=112.34ms p(95)=112.34ms
     http_req_duration..............: avg=112.26ms min=112.26ms med=112.26ms max=112.26ms p(90)=112.26ms p(95)=112.26ms
       { expected_response:true }...: avg=112.26ms min=112.26ms med=112.26ms max=112.26ms p(90)=112.26ms p(95)=112.26ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 1
     http_req_receiving.............: avg=180µs    min=180µs    med=180µs    max=180µs    p(90)=180µs    p(95)=180µs   
     http_req_sending...............: avg=66µs     min=66µs     med=66µs     max=66µs     p(90)=66µs     p(95)=66µs    
     http_req_tls_handshaking.......: avg=378.53ms min=378.53ms med=378.53ms max=378.53ms p(90)=378.53ms p(95)=378.53ms
     http_req_waiting...............: avg=112.02ms min=112.02ms med=112.02ms max=112.02ms p(90)=112.02ms p(95)=112.02ms
     http_reqs......................: 1       1.646844/s
     iteration_duration.............: avg=606.35ms min=606.35ms med=606.35ms max=606.35ms p(90)=606.35ms p(95)=606.35ms
     iterations.....................: 1       1.646844/s
```

Now we're getting somewhere! The entire HTML body of the response is saved in the variable `response`.

## Extracting the value from the response

The HTML for the login form from the previous output includes the CSRF token:

```html
<input type="hidden" name="csrftoken" value="NjI1NjkwOTkw">
```

This value is dynamic, so the script needs to extract it based on the format it is presented in.

Add the following lines to your script:

```js
let csrfToken = response.html().find("input[name=csrftoken]").attr("value");
console.log(csrfToken);
```

The first line parses the HTML response body and looks for the value of an `input` element with a `name` equal to `csrftoken`. Run the script to see if the value of `csrfToken` looks right. You should get something like this:

```js
INFO[0001] NDExODkxOTcz                                  source=console
```

That looks like it's working! Try to get your script working:
- Uncomment the login request and modify it so that the extracted CSRF token is passed along with the request
- Add a check on the phrase "successfully authorized" after the login request, to verify that the script user has logged in.

If you're stuck, compare your script against the script at the end of this section.

## Test your knowledge

### Question 1

You suspect there may be a dynamic value that you need to correlate from a previous response and send with your request. What's the best way to confirm this suspicion?

A: Use DevTools to look at the network traffic as you perform the action, then look at the parameters being passed with the successful request.
B: Record the script and run it using k6.
C: Add a check for the word `csrftoken` to see if there are any being returned in the response.

### Question 2

Which of the following might help you identify when correlation is required?

A: 
```js
check(response, {
        'is Unauthorized': r => r.body.includes('Unauthorized'),
    })
```
B:  `let rand = Math.floor(Math.random() * 2);`
C: `--http-debug=full`

Answer: C

### Question 3

Why might replaying a recorded script yield errors?

A: Some steps may require dynamic values extracted from earlier responses.
B: There were no checks defined in the script.
C: Running with multiple users may exert unnecessary load on the application server.

Answer: A

## The script
```js
import http from 'k6/http';
import { check } from 'k6';

let usernameArr = ['admin', 'test_user'];
let passwordArr = ['123', '1234'];

export default function() {

    let response = http.get('https://test.k6.io/my_messages.php');
    check(response, {
        'is Unauthorized': r => r.body.includes('Unauthorized'),
    })

    let csrfToken = response.html().find("input[name=csrftoken]").attr("value");

    // Get random username and password from array
    let rand = Math.floor(Math.random() * 2);
    let username = usernameArr[rand];
    let password = passwordArr[rand];
    console.log('username: ' + username, ' / password: ' + password);

    response = http.post('http://test.k6.io/login.php', { login: username, password: password, csrftoken: csrfToken });
    check(response, {
        'is status 200': (r) => r.status === 200,
        'Successful login': r => r.body.includes('successfully authorized'),
    })
}
```

### Answers

1. A. DevTools is a great way to run through the request and response pairs of a web application, step by step. B would likely not give much useful information beyond errors, and C is too specific-- there are other dynamic parameters beyond tokens that may cause errors if not properly handled.
2. C. Using the `http-debug` flag may be useful because it prints out all the response and request information. If there is too much information to be useful, consider using DevTools or [a proxy](https://k6.io/blog/k6-load-testing-debugging-using-a-web-proxy/) instead.
