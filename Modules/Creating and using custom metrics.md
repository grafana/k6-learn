# Creating and using custom metrics

In [Understanding k6 results](Understanding%20k6%20results.md), you learned how to interpret the metrics that k6 reports by default. But what if you want to measure something else that k6 doesn't keep track of?

k6 allows you to create your own custom metrics within your script. Once you've defined what you want measured, k6 collects the measurements during the test and reports your custom metrics along with the built-in ones in the end-of-test summary report.

## Types of metrics

There are four types of custom metrics that you can create, and each one measures a different kind of data.

### Counter

A counter is an integer that can be incremented whenever a certain event happens. Counters are good for keeping track of occurrences like:
- the number of times a specific error occurred
- user accounts that have access to Admin functions
- how often a request is redirected
- visits of a specific page, in case your script accesses randomly determined pages

### Gauge

A gauge metric stores three numbers: the minimum value, maximum value, and the _last_ value. Gauges are useful to watch in real time for tracking things that are relevant only while the test is running. You could use gauges to measure:
- the size of response bodies returned
- a custom version of the response time (for example, the response time of three ungrouped URLs)
- the number of unprocessed applications, in a test involving scenarios that create applications and process them simultaneously

### Rate

A rate metric tracks a boolean value over the total number of measurements taken. At the end of the test, the rate expresses the percentage of all the measurements that were `true` and the percentage of them that were `false`. Rate metrics can be used to measure:
- what percentage of the VUs performed the checkout process for a product
- the proportion of pages where an ad appeared
- the percentage of user accounts with insufficient permissions

### Trend

A trend metric measures minimum, maximum, average, and percentile statistics. Unlike gauges, trends keep _all_ values and report the distribution of all the values at the end of the test. Trends are similar to how `http_req_duration` (response time) is measured in k6, and they can be used to track:
- custom timers, such as one where the think time or sleep is added to the response time
- the number of retries executed before the correct response is returned (such as when simulating polling behavior)
- the number of active user accounts reported to an admin user account

## Example: Function duration with sleep

## Test your knowledge

### Question 1

In which of the following situations might it be appropriate to use a custom metric in your k6 script?

A: When you want to know the response time of a certain URL

B: When you are asked to report how many requests were executed in total during a test

C: When you want to measure something that the built-in metrics don't cover

### Question 2

Which type of custom metric would be best for tracking how many opened forms had a certain checkbox ticked?

A: Trend

B: Counter

C: Gauge

### Question 3

How can you get a report on custom metrics after a test?

A: All custom metrics are displayed in the end-of-test summary report.

B: You have to log in to k6 Cloud to see the results.

C: Only rate and trend metric results are shown in the end-of-test summary report.

### Answers

C, B, A