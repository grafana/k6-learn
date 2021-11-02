## What is performance testing?

Performance testing is the branch of software testing whose primary concern is verifying _how_ a system functions rather than _what_ its functions are. Performance testing seeks to measure qualitative aspects of a user's experience of a system such as its responsiveness during the course of normal operations.

There are two general types of performance testing: front-end and back-end. Each one focuses on a different part of the system under test, although there may be some overlap in techniques and tools. Both types of testing are necessary to get a holistic view of application performance, and can be combined for the best testing results.

### Front-end performance testing

Front-end performance testing is concerned with the end user-experience of an application, usually involving a browser. It verifies application performance on the interface level, measuring round-trip metrics that take into account how and when page elements appear on the screen.

Front-end performance testing provides insights that back-end performance testing does not, such as whether pages of the application are optimized to render quickly on a user's screen or how long it takes for a user to be able to interact with the UI elements of the application. Because it primarily measures a single user's experience of the system, front-end performance testing tends to be easier to carry out on a small scale.

Some disadvantages of this type of performance testing are its dependency on fully integrated environments and cost of scaling. Front-end performance testing can only be done once the application code and infrastructure have been integrated with a user interface, so it begins later in a cycle than does back-end performance testing. Tools to automate the front-end are also inherently more resource-intensive, so they can be costly to run at scale and are not suitable for high load tests.

Front-end performance testing excels at identifying issues on a micro level, but does not expose issues in the underlying architecture of a system.

### Back-end performance testing

Back-end performance testing targets the underlying application servers to verify the scalability, elasticity, availability, reliability, and responsiveness of a system as a whole.

- *Scalability*: Can the system adjust to steadily increasing levels of demand?
- *Elasticity*: Can the system conserve resources during periods of lower demand?
- *Availability*: How resilient is the system against outages?
- *Reliability*: Does the system respond consistently in different environmental conditions?
- *Responsiveness*: How quickly does the system process and respond to requests?

Back-end testing is broader in scope than front-end performance testing, and it can be carried out at multiple stages in the development cycle. API testing can be used to target specific components or integrated components, allowing application teams more flexibility and higher chances of finding performance issues earlier. Back-end testing is less resource-intensive than front-end performance testing, and is thus more suitable to generating high amounts of load.

Some disadvantages of this type of testing are its complexity and its inability to test "the first mile" of user experience. Back-end testing involves sending messages at the protocol level, so it requires some knowledge of the syntax and content of those messages, as well as of networking principles. Back-end performance testing verifies the foundation of an application rather than the highest layer of it that a user ultimately sees.

Back-end performance testing excels at identifying issues in the application code and infrastructure, but does not expose issues in the application interface.

### What is load testing?

The term "load testing" refers to a type of back-end performance testing that involves simulating a number of users accessing the application. However, back-end performance testing encompasses more than just load testing. Load testing is one technique that can be used to verify back-end performance.

k6 is primarily a back-end performance testing tool that specializes in load testing but can also be used to run other types of tests, such as chaos experiments or functional API tests.

## Why should we do performance testing?

Software testing began from what we now call "functional testing", which verifies whether an application functions as expected (as per requirements). However, modern definitions of functionality have now expanded to encompass aspects of an application that arise as side effects of its operation, like speed or reliability.

To skip performance testing is to ignore a large part of what makes up a user's experience. If an application is meant to be used by multiple users, single user manual testing is no longer a sufficient or accurate measure of what it will actually be like to use the application. Web applications, in particular, should be prepared to withstand some degree of viral popularity, or face the loss of potential customers or brand reputation.

If performance testing is so valuable, why don't more teams do it?

### Common excuses for not doing performance testing

Below are common concerns that cause teams to decide not to do performance testing, and how to mitigate these concerns.

### Our application is too small to warrant it

The idea that only larger corporations or more complex applications require performance testing is due mostly to the misconception that performance testing needs to involve the simulation of hundreds or even thousands of users. There can be significant benefits to measuring an application's performance with just a handful of users. Even the automation of a single user could highlight bottlenecks in the application that would not have otherwise been spotted.

### It's expensive or time-consuming

Performance testing *can* be expensive and time-consuming, but teams can pick and choose the type of activities that fall within their budgets for cost and time. 

### It requires extensive technical knowledge

There are different types of performance testing, and some require more technical knowledge than others. At its face, however, performance testing is no more or less complex than other forms of testing. Teams can choose from a spectrum of performance testing activities according to their appetite for complexity. Accessing a web page while looking at timings from the Network panel of DevTools within a browser is a type of performance testing that adds immediately value for little effort.

### We don't have a performance environment

Performance testing doesn't always have to mean load testing, and even load testing doesn't always involve stressing an application to its breaking point. There are opportunities to assess performance that don't require dedicated performance testing environments: unit tests for performance during development, API tests during System testing, and synthetic monitoring or low-load tests in production.

### Observability trumps performance testing

The development of mature observability platforms encourages many to forego performance testing in favor of monitoring application performance in production. However, the efficacy of observability is dependent on having data to observe, and without the ability to generate data artificially, application performance is often only observed when bottlenecks are already live.

Performance testing enables teams to simulate rich user scenarios *before* potential performance issues are released to production, making observability useful in test environments as well. Some types of tests, such as disaster recovery, chaos engineering, and reliability testing also help teams prepare for inevitable failures.

## Test your knowledge

### Question 1

Which type of performance testing does k6 excel in?

A: Back-end testing
B: Front-end testing
C: Usability testing

### Question 2

Which of the following is an advantage of back-end performance testing?

A: It provides metrics like Time To Interactive (TTI) that measure when users can first interact with the application.
B: It simulates users by driving real browsers to test the application.
C: It can target application components before they're integrated.
D: A and B.

### Question 3

Which of the following statements is true?

A: Performance testing is generating high user load or traffic against application servers.
B: Performance testing is an activity that requires specialized expertise to carry out.
C: Performance testing requires a production-like environment.
D: Observability and performance testing are complementary approaches to improving application quality.