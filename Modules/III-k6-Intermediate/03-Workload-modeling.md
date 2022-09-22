# Workload modeling

It's not enough to know _what_ to test (which pages or endpoints to hit)&mdash;you should also think about _how_ to test. How many virtual users should you simulate? Will those users pause their execution to simulate "think times" of real users? Are the users new or returning? The answers to these questions can affect your test results.

The process of **workload modeling** involves determining *how* to apply load against the system, and it's essential for a successful load test.

Your workload model is heavily influenced by the situations or scenarios you'd like to test. The closer your load test gets to simulating those circumstances, the more *realistic* it is. Realism could mean simulating peak traffic in production, but it could also mean simulating smaller and more targeted traffic against a particular component of your system. It all depends on the situation you're trying to recreate and test.

If your load-testing script isn't realistic enough, you may not achieve the expected test throughput, or you may not test the same components of a system that real users hit in production. Unrealistic test scripts and scenarios can lead to inconsistent and inaccurate results. More dangerously, they can create a false sense of confidence in what a system can withstand.

## Challenges in workload modeling

Making scripts and scenarios realistic increases the value that a load test can provide. However, test realism is not an easy task. Increasing the realism of a load test can often increase the amount of time and effort required to create and maintain your test suite. There are also many factors that make human behavior hard to simulate:

- **Computers are faster than humans**. Automated simulations can be executed at inhuman speeds. A machine does not have to stop about what to do next.
- **Human behavior is unpredictable**. Sometimes, humans don't do the most logical or reasonable thing. Historical data can help identify exactly how your end users behave and inform your load-test-script behavior.
- **User flows can be complex**. As systems grow in scope, the number of user flows that a load test needs simulate to be realistic increase as well. A load test may need to cover multiple end-to-end flows, each of which may require different test parameters.
- **Distributed systems come with multiple points of failure**. Software with event-driven or microservices-based architectures have many modular components, each of which may need to be tested and monitored.
- **Many systems have multiple traffic sources.** Users' geographical locations and internet speeds affect the load they apply on the system.

So, how can we make automated tests realistic despite these obstacles?

## Elements of a workload model

When creating a workload model, consider these variables.

### Test parameters

Test parameters are values that affect how your load-testing script is executed. Parameters include:
- Duration
- Number of VUs
- Number of iterations
- Load profile, including stages during the test

Each of these parameters influence the amount and type of load that is simulated.

Check out [k6 Load Test Options](../II-k6-Foundations/06-k6-Load-Test-Options.md) for more information on these parameters, or [Setting load profiles with executors](08-Setting-load-profiles-with-executors/Setting-load-profiles-with-executors.md) for instructions on how to implement these in k6.

### Think time and pacing

Think time and pacing are both types of delays in the script that simulate the pauses a real user is likely to take while accessing an application. Think time, often called sleep, can be added before or after actions within the script, while pacing is typically added between iterations.

Longer delays mean fewer requests, given a fixed duration, and shorter delays mean more requests. The number of requests and how quickly they are sent may change how your system responds. We also recommend using dynamic delays if you'd like to make the generated load look a little less regular and uniform.

See [Adding think time using sleep](../II-k6-Foundations/05-Adding-think-time-using-sleep.md) for how to implement delays in k6.

### Adding static resources

In web applications, static resources refer to images, client-side scripts, fonts, and other files embedded onto a page. If you want your script to access that page, you have to decide whether you want the script to also download those resources.

Downloading static resources makes the script more realistic if you want to simulate an end-user behavior, because web browsers automatically download them. However, if you want to download only the HTML of the page (for example, perhaps because the images are served by a [CDN](Performance-Testing-Terminology.md#CDN) that you don't want to test), it may be more prudent *not* to download the static resources.

### Parallel requests

Parallel requests are requests that are sent concurrently. Modern browsers request a certain number of static resources at the same time, so if your script requests them sequentially, that can change the load applied on your system.

Refer to [Parallel requests in k6](05-Parallel-requests-in-k6.md) for instructions on use batching to implement parallel requests.

### Cache and cookie behavior

When users visit a website, some resources may be saved in a cache so that subsequent requests don't require those resources to be downloaded anew. Cookies are small bits of information about previous user activities (such as the last time they visited a site) that are saved for functional, analytical, or marketing purposes.

Both caches and cookies add to the overall load that a script generates and should be tailored to the test objectives. First-time visitors to a site won't have resources cached locally, but repeat visitors may be retrieving resources from the cache.

In k6, you can set cache options [using headers](https://k6.io/docs/using-k6/http-requests/#making-http-requests) and [manage cookies in a few ways](https://k6.io/docs/examples/cookies-example/).

### Test data

Requesting the same resources over and over again in your script can lead to some problems. It can trigger caching on the server side, cause security errors if your script logs in with the same user repeatedly, and limit the scope of your tests as other resources are not requested.

## Test your knowledge

### Question 1

Which of the following issues could have been caused by incomplete or inaccurate workload modeling?

A: The load testing tool selected cannot generate the load required and scripts must be rewritten in another tool.

B: Performance-related production incidents occur despite previous successful load tests.

C: Development effort is wasted on features that users do not want.

### Question 2

Which of the following facts about a hypothetical application are not relevant when building a workload model?

A: Most end users live in Australia.

B: Most end users are single mothers.

C: Most end users access the application on their mobiles, using 3G/4G networks.

### Question 3

Which of the following changes would increase the load on an application server?

A: Decreasing think time

B: Enabling caching

C: Disabling downloading of static resources

### Answers

1. B. Production incidents despite performance testing is a classic symptom that the situation during a load test did not match the situation during production. This may be due to many factors, one of which is workload modeling.
2. B. Users' geographical locations are relevant because Content Distribution Networks (CDNs) do not have servers in every country, and their absence may affect overall user response time. Users' network speeds may similarly affect response times. B is the correct answer because whether or not a user is a single mother is relevant for business demographics, but not response times.
3. A. Decreasing think time will cause a script to be executed more rapidly, and in some cases may contribute to increased resource utilization on both load generators and application servers. Enabling caching and disabling static resources have the opposite effect.
