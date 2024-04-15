k6 doesn't natively have a way to graph load-testing results. However, it does have a lot of options to save the output in different formats. This [blog](https://k6.io/blog/ways-to-visualize-k6-results/) is a good starting point. And you can find the full list of results visualization integrations or tutorials [here](https://k6.io/docs/integrations/#result-store-and-visualization).

In this section, we'll discuss two common test-result formats: CSV and JSON.

Note: For both CSV and JSON formats, you'll need your own visualization tool. This could be anything from [Google Sheets](https://sheets.google.com), to [Grafana](https://grafana.com), to [Tableau](https://tableau.com).

## What's the difference between end-of-test results and time-series results?

## CSV

### Saving k6 results as a CSV

Saving k6 results into a CSV file is good for further analysis in your data visualization software of choice. The CSV can be opened as a spreadsheet or used to generate graphs and summary tables.

To output k6 test results to a CSV file, use this command when running the test:

```plain
k6 run test.js -o csv=results.csv
```

You can also use `--out` instead of `-o`.

### CSV results output format

The command above will save k6 results as a CSV in the following format:

```csv
metric_name,timestamp,metric_value,check,error,error_code,expected_response,group,method,name,proto,scenario,service,status,subproto,tls_version,url,extra_tags
http_reqs,1641298536,1.000000,,,,true,,POST,https://httpbin.test.k6.io/post,HTTP/1.1,default,,200,,tls1.2,https://httpbin.test.k6.io/post,
http_req_duration,1641298536,114.365000,,,,true,,POST,https://httpbin.test.k6.io/post,HTTP/1.1,default,,200,,tls1.2,https://httpbin.test.k6.io/post,
http_req_blocked,1641298536,589.667000,,,,true,,POST,https://httpbin.test.k6.io/post,HTTP/1.1,default,,200,,tls1.2,https://httpbin.test.k6.io/post,
http_req_connecting,1641298536,117.517000,,,,true,,POST,https://httpbin.test.k6.io/post,HTTP/1.1,default,,200,,tls1.2,https://httpbin.test.k6.io/post,
http_req_tls_handshaking,1641298536,415.043000,,,,true,,POST,https://httpbin.test.k6.io/post,HTTP/1.1,default,,200,,tls1.2,https://httpbin.test.k6.io/post,
http_req_sending,1641298536,0.251000,,,,true,,POST,https://httpbin.test.k6.io/post,HTTP/1.1,default,,200,,tls1.2,https://httpbin.test.k6.io/post,
http_req_waiting,1641298536,114.010000,,,,true,,POST,https://httpbin.test.k6.io/post,HTTP/1.1,default,,200,,tls1.2,https://httpbin.test.k6.io/post,
http_req_receiving,1641298536,0.104000,,,,true,,POST,https://httpbin.test.k6.io/post,HTTP/1.1,default,,200,,tls1.2,https://httpbin.test.k6.io/post,
http_req_failed,1641298536,0.000000,,,,true,,POST,https://httpbin.test.k6.io/post,HTTP/1.1,default,,200,,tls1.2,https://httpbin.test.k6.io/post,
checks,1641298536,1.000000,Application says hello,,,,,,,,default,,,,,,
vus,1641298536,2.000000,,,,,,,,,,,,,,,
vus_max,1641298536,100.000000,,,,,,,,,,,,,,,
```

Each line in the file is a single measurement that was taken during the test execution.

The results file uses the following columns:

- **`metric_name`**: The name of the metric for which a value is recorded. By default, k6 comes with [these built-in metrics](https://k6.io/docs/using-k6/metrics/#built-in-metrics). All values for all metrics are put in the same results file for easier analysis.
- **`timestamp`**: The local date and time that each measurement was taken, [in Epoch time](https://www.epochconverter.com/).
- **`metric_value`**: The reading for the given metric at the timestamp provided. The unit of measurement for this value differs depending on the metric. For example, `http_req_duration` values are in milliseconds.
- **`check`**: The unique name given to the check being verified. In the check example below, the check name is `Application says hello`:

  ```js
  check(response, {
  'Application says hello': (r) => r.body.includes('Hello world!')
  });
  ```
      
- **`error`**: The text of any non-HTTP errors encountered, such as network or DNS errors. This value is empty if there were no errors.
- **`error_code`**: A k6 error code. This value is empty if there were no errors. [Here is a full list](https://k6.io/docs/javascript-api/error-codes) of possible error codes.
- **`expected_response`**: A boolean (`true` or `false`) indicating whether the response returned was as expected (an HTTP code less than 400 by default).
- **`group`**: The name of a [request group](https://k6.io/docs/using-k6/tags-and-groups/#groups) that the metric belongs to.
- **`method`**: The name of the HTTP method used, such as `GET` or `POST`, or the RPC method name for gRPC.
- **`name`**: The name of the request sent. This defaults to the URL, but can be [changed using tags](https://k6.io/docs/using-k6/http-requests#url-grouping).
- **`proto`**: The name of the protocol being used, such as `HTTP/1.1`.
- **`scenario`**: The name of the test scenario within which the measurement was taken. The standard scenario is `default`.
- **`service`**: For gRPC, the RPC service name.
- **`status`**: The HTTP status code of the request/response.
- **`subproto`**: For websockets, the subprotocol name.
- **`tls_version`**: The type of Transport Layer Security (TLS) used to encrypt the connection.
- **`url`**: The URL of the request sent. Unless the name is changed, this is the same as `name`.
- **`extra_tags`**: Tags that apply to this measurement. Empty unless [tags](https://k6.io/docs/using-k6/tags-and-groups/) are used within the script.

## JSON

### Saving k6 results as a JSON

To output k6 results to a JSON file, run the test with this command:

```plain
k6 run test.js -o json=results.json
```

### JSON results output format

The JSON file will look something like this:

```plain
{"type":"Metric","data":{"name":"http_reqs","type":"counter","contains":"default","tainted":null,"thresholds":[],"submetrics":null,"sub":{"name":"","parent":"","suffix":"","tags":null}},"metric":"http_reqs"}
{"type":"Point","data":{"time":"2022-01-05T12:46:23.603474+01:00","value":1,"tags":{"expected_response":"true","group":"","method":"POST","name":"https://httpbin.test.k6.io/post","proto":"HTTP/1.1","scenario":"default","status":"200","tls_version":"tls1.2","url":"https://httpbin.test.k6.io/post"}},"metric":"http_reqs"}
{"type":"Metric","data":{"name":"http_req_duration","type":"trend","contains":"time","tainted":null,"thresholds":["p(95)<=100"],"submetrics":null,"sub":{"name":"","parent":"","suffix":"","tags":null}},"metric":"http_req_duration"}
{"type":"Point","data":{"time":"2022-01-05T12:46:23.603474+01:00","value":118.96,"tags":{"expected_response":"true","group":"","method":"POST","name":"https://httpbin.test.k6.io/post","proto":"HTTP/1.1","scenario":"default","status":"200","tls_version":"tls1.2","url":"https://httpbin.test.k6.io/post"}},"metric":"http_req_duration"}
{"type":"Metric","data":{"name":"http_req_blocked","type":"trend","contains":"time","tainted":null,"thresholds":[],"submetrics":null,"sub":{"name":"","parent":"","suffix":"","tags":null}},"metric":"http_req_blocked"}
```

Each line is either a metric or a point. A **metric** defines either [built-in metrics](https://k6.io/docs/using-k6/metrics/#built-in-metrics) or custom metrics in terms of their type, thresholds related to them, or whether they have caused any thresholds to fail. A **point** is a measurement for a metric, and contains the actual value of the metric at a given timestamp.

## Test your knowledge

### Question 1

Which of the following statements about the default k6 CSV results format is true?

A: To graph the response time, you must take the number in the `metric_value` column from every line in the CSV file.

B: Each line contains a metric and a value for that metric at a specific timestamp.

C: The `metric_name` column in the CSV file refers to the URL of the HTTP request that was sent.

### Question 2

Below is a line from a JSON containing k6 test results:

```plain
{"type":"Point","data":{"time":"2022-01-05T12:46:26.893633+01:00","value":100,"tags":null},"metric":"vus_max"}
```

What can we determine from this line?

A: The maximum number of VUs at the time was 100.

B: This measurement is for the `http_req_duration` metric.

C: The test reached the maximum number of VUs at 12:46 on January 5th, 2022.

### Question 3

Which of the following is the correct command for outputting k6 results to different formats? 

A: `k6 run test.js --out json=myresults.json`

B: `k6 run test -o csv=results.csv`

C: `k6 output csv=results.csv`

## k6 Cloud

The previous two options let you output k6 results in different formats, but they still require some setup as you do the analysis in a separate results visualization software.

An alternative to this is to use k6 Cloud. k6 Cloud is a paid SaaS platform built around k6 OSS. You can use k6 without using k6 Cloud, but k6 Cloud does provide some added functionalities that are quite useful, and one of them is results visualization.

The next section talks about k6 Cloud, how to use it in conjunction with k6 OSS, and how it could help you analyze results.

### Answers

1. B. A is incorrect because the CSV output includes multiple metrics, not just `http_req_duration`. C is incorrect because `url` is the column that contains the URL for the request.
2. A. The metric is `vus_max`, which is the number of virtual users that were running at that time (100, in this case). However, this does not necessarily correspond to the maximum number of VUs for the test, since the test could have ramped up further beyond this point.
3. A. Only A has the correct syntax for outputting results.
