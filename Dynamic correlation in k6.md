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



## Test your knowledge

### Question 1



A: 
B: 
C: 

Answer: 

### Question 2



A: 
B: 
C: 

Answer: 

### Question 3



A: 
B: 
C: 

Answer: 