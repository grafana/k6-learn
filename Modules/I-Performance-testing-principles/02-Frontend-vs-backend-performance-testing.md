For a holistic view of performance, testers need to test both the front and back ends of an application. Though there is some overlap in the tools and techniques, the approach and focus differs when testing different application parts.

## Frontend performance testing

Frontend performance testing verifies application performance on the interface level, measuring round-trip metrics that consider how and when page elements appear on the screen.
It is concerned with the end-user experience of an application, usually involving a browser.
Frontend performance testing excels at identifying issues on a micro level but does not expose issues in the underlying architecture of a system.

Because it primarily measures a single user's experience of the system, frontend performance testing tends to be easier to carry out on a small scale.
Frontend performance testing has metrics that are distinct from backend performance testing. Frontend performance tests for things like:
- Whether the pages of the application are optimized to render quickly on a user's screen
- How long it takes a user to interact with the UI elements of the application.

Some concerns when doing this type of performance testing are its dependency on fully integrated environments and the cost of scaling. You can test frontend performance only once the application code and infrastructure have been integrated with a user interface. Tools to automate frontend testing are also inherently more resource-intensive, so they can be costly to run at scale and are not suitable for high load tests.


### Why isn't frontend performance testing enough?

Since frontend performance testing already measures end-user experience, why do we even need backend performance testing?

Frontend testing tools are executed on the client side and are limited in scope. They do not provide enough information about backend components for fine-tuning beyond the user interface.

This limitation can lead to false confidence in overall application performance when the amount of traffic against an application increases. While the frontend component of response time remains more or less constant, the backend component of response time increases exponentially with the number of concurrent users:

![A chart aggregating front and backend response times. As concurrency increases, backend response time becomes much longer.](../../images/frontend-backend.png)

Testing only frontend performance ignores a large part of the application, one more susceptible to increased failures and performance bottlenecks at higher levels of load.


## Backend performance testing

Backend performance testing targets the underlying application servers to verify the scalability, elasticity, availability, reliability, and responsiveness of a system as a whole.

- *Scalability*: Can the system adjust to steadily increasing levels of demand?
- *Elasticity*: Can the system conserve resources during periods of lower demand?
- *Availability*: What is the uptime of each of the components in the system?
- *Reliability*: Does the system respond consistently in different environmental conditions?
- *Resiliency*: Can the system gracefully withstand unexpected events?
- *Latency*: How quickly does the system process and respond to requests?

Backend testing is broader in scope than frontend performance testing.
API testing can be used to target specific components or integrated components, meaning that application teams have more flexibility and higher chances of finding performance issues earlier. Backend testing is less resource-intensive than frontend performance testing and is thus more suitable for generating high load.

Some concerns when doing this type of testing are its inability to test "the first mile" of user experience and breadth. Backend testing involves messaging at the protocol level rather than interacting with page elements. It verifies the foundation of an application rather than the highest layer of it that a user ultimately sees. Depending on the complexity of the application architecture, backend testing may also be more expansive in scope.

## Test your knowledge

### Question 1

Which type of testing does k6 excel in?

A: Backend testing

B: Manual testing

C: Accessibility testing

### Question 2

Which of the following is an advantage of backend performance testing?

A: It provides metrics like Time To Interactive (TTI) that measure when users can first interact with the application.

B: It simulates users by driving real browsers to test the application.

C: It can target application components before they're integrated.

D: A and B.

### Question 3



A: 

B: 

C: 

### Answers

