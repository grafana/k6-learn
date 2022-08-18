``# What is performance testing?

Performance testing is a branch of software testing whose primary concern is verifying *how well* a system works instead of *if* it works (the focus of the functional testing practice). Performance testing seeks to measure qualitative aspects of a user's experience of a system such as its responsiveness during the course of normal operations.

There are two general types of performance testing: front-end and back-end. Each one focuses on a different part of the system under test, although there may be some overlap in techniques and tools. Both types of testing are necessary to get a holistic view of application performance, and can be combined for the best testing results.

### Front-end performance testing

Front-end performance testing is concerned with the end user-experience of an application, usually involving a browser. It verifies application performance on the interface level, measuring round-trip metrics that take into account how and when page elements appear on the screen.

Front-end performance testing provides insights that back-end performance testing does not, such as whether pages of the application are optimized to render quickly on a user's screen or how long it takes for a user to be able to interact with the UI elements of the application. Because it primarily measures a single user's experience of the system, front-end performance testing tends to be easier to carry out on a small scale.

Some concerns when doing this type of performance testing are its dependency on fully integrated environments and cost of scaling. Front-end performance testing can only be done once the application code and infrastructure have been integrated with a user interface. Tools to automate the front-end are also inherently more resource-intensive, so they can be costly to run at scale and are not suitable for high load tests.

Front-end performance testing excels at identifying issues on a micro level, but does not expose issues in the underlying architecture of a system.

### Why isn't front-end performance testing enough?

Since front-end performance testing already measures end user experience, why do we even need back-end performance testing?

Front-end testing tools are executed on the client side and are limited in scope. They do not provide enough information about back-end components to allow for fine-tuning beyond the user interface.

This limitation can lead to false confidence in overall application performance when the amount of traffic against an application increases. While the front-end component of response time remains more or less constant, the back-end component of response time increases exponentially with the number of concurrent users:



![](../images/front-end-back-end.png)

Doing only front-end performance testing ignores a large part of the application, one that is more susceptible to increased failures and performance bottlenecks at higher levels of load.


### Back-end performance testing

Back-end performance testing targets the underlying application servers to verify the scalability, elasticity, availability, reliability, and responsiveness of a system as a whole.

- *Scalability*: Can the system adjust to steadily increasing levels of demand?
- *Elasticity*: Can the system conserve resources during periods of lower demand?
- *Availability*: What is the uptime of each of the components in the system?
- *Reliability*: Does the system respond consistently in different environmental conditions?
- *Resiliency*: Can the system gracefully withstand unexpected events?
- *Latency*: How quickly does the system process and respond to requests?

Back-end testing is broader in scope than front-end performance testing. API testing can be used to target specific components or integrated components, allowing application teams more flexibility and higher chances of finding performance issues earlier. Back-end testing is less resource-intensive than front-end performance testing, and is thus more suitable to generating high amounts of load.

Some concerns when doing this type of testing are its inability to test "the first mile" of user experience and breadth. Back-end testing involves sending messages at the protocol level rather than interacting with page elements. It verifies the foundation of an application, rather than the highest layer of it that a user ultimately sees. Depending on the complexity of the application architecture, back-end testing may also be more expansive in scope.


## Why should we do performance testing?

Doing performance testing, even for smaller teams, comes with a few benefits:

- **Improve user experience.** Doing continuous performance testing allows teams to identify potential bottlenecks and issues early on in the development process. Performance testing provides a complete picture of what the experience of a user accessing your application is like, beyond just the application functionality.
- **Prepare for unexpected demand.** Test load scenarios beyond what you might expect, to understand the breaking points of the application and formulate better procedures for responding to and capitalizing on unprecedented success.
- **Increased confidence in the application.** Systematic performance testing and subjecting the application to various states builds the team's confidence in its ability to withstand unexpected conditions in production and lower overall risk of failure.
- **Assess and optimize infrastructure.** Reduce unnecessary infrastructure costs without compromising on performance. Simulate scenarios to observe horizontal and vertical scaling, and run experiments to verify the resources that the system under test actually requires.

If performance testing is so valuable, why don't more teams do it?

## Common excuses for not doing performance testing

Below are common concerns that cause teams to decide not to do performance testing, and how to mitigate these concerns.

#### Our application is too small

The idea that only larger corporations or more complex applications require performance testing is due mostly to the misconception that performance testing needs to involve the simulation of hundreds or even thousands of users. There can be significant benefits to measuring an application's performance with just a handful of users. Even the automation of a single user could highlight bottlenecks in the application that would not have otherwise been spotted. Costly performance inefficiencies can also exist in small systems.

#### It's expensive or time-consuming

Performance testing *can* be expensive and time-consuming, but teams can pick and choose the type of activities that fall within their budgets for cost and time. The cost of _not_ doing performance testing is often far greater than the initial investment needed to implement performance testing practices.

#### It requires extensive technical knowledge

There are different types of performance testing, and some require more technical knowledge than others. At its face, however, performance testing is no more or less complex than other forms of testing. Teams can choose from a spectrum of performance testing activities according to their appetite for complexity. Accessing a web page while looking at timings from the Network panel of DevTools within a browser is a type of performance testing that adds immediate value for little effort.

#### We don't have a performance environment

Performance testing doesn't always have to mean load testing, and even load testing doesn't always involve stressing an application to its breaking point. There are opportunities to assess performance that don't require dedicated performance testing environments: unit tests for performance during development, API tests during System testing, and synthetic monitoring or low-load tests in production.

#### Observability trumps performance testing

The development of mature observability platforms encourages many to forego performance testing in favor of monitoring application performance in production. However, the efficacy of observability is dependent on having data to observe, and without the ability to generate data artificially, application performance is often only observed when bottlenecks are already live.

Performance testing enables teams to simulate rich user scenarios *before* potential performance issues are released to production, making observability useful in test environments as well. Some types of tests, such as disaster recovery, chaos engineering, and reliability testing also help teams prepare for inevitable failures.

Both performance testing and observability are essential components to improving the quality of a system.

#### The cloud is infinite; we can always scale up

Now that many applications are hosted in the cloud, it can be tempting to think that horizontal or vertical scaling can negate the need for performance testing. However, this belief can lead to significantly increased costs if efficiency is not taken into account.

Scalability is only *one* aspect of application performance that should be tested. Even efficiently scaled systems can be slow or prone to failure and outage to the extent that the application is rendered unusable. Cascading failures like retry storms and the thundering herd problem can in fact be exacerbated when systems are scaled up.

## Beware: performance testing is not load testing

A common misconception is that the terms performance testing and load-testing are interchangeable. They are not. In the next section, you'll learn about what load testing is, and how it's different from performance testing.


## Test your knowledge

### Question 1

Which type of testing does k6 excel in?

A: Back-end testing

B: Manual testing

C: Accessibility testing

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

### Answers

1. A. k6 excels at back-end performance testing. With xk6-browser, it does have a front-end performance testing capability, but accessibility testing is not yet possible.
2. C. A and B are both incorrect because they apply to front-end performance testing.
3. D. A is incorrect because performance testing can be done at lower load levels. B is incorrect because anyone can do  performance testing, not just specialized performance testers. C is incorrect because performance testing can be done in development, staging, and test environments as well.