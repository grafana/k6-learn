# What is performance testing?

The primary concern of performance testing is _how well_ a system works.
Unlike functional testing, which tests _whether_ a system works, performance testing seeks to measure qualitative aspects of a user's experience of a system, such as its responsiveness and success rate.

## Why should we do performance testing?

With performance testing, your team can:

- **Improve user experience.** Identify potential bottlenecks and issues early in the development process. Performance testing provides a complete picture of what the experience of a user accessing your application is like, beyond just the application functionality.
- **Prepare for unexpected demand.** Test beyond expected load to find the breaking points of the application and formulate better procedures for responding to and capitalizing on unprecedented success.
- **Increased confidence in the application.** Lower the overall risk of failure with systematic performance testing. This reduced risk also builds team confidence. Teams can work knowing their application can withstand unexpected conditions in production.
- **Assess and optimize infrastructure.** Reduce unnecessary infrastructure costs without compromising performance. Simulate scenarios to observe horizontal and vertical scaling, and run experiments to verify the resources that the system under test actually requires.

If performance testing is so valuable, why don't more teams do it?

## Common excuses for not performance testing

These concerns are often rooted in misconceptions about the necessary cost and complexity of testing performance.

### Our application is too small

The idea that only larger corporations or more complex applications require performance testing stems mostly from the misconception that performance testing needs to simulate hundreds or even thousands of users. In fact, measuring how a system performs with just a handful of users can bring significant benefits. Even simulating a single user could highlight bottlenecks in the application that would not have otherwise been spotted. Costly performance inefficiencies can also exist in small systems.

### It's expensive or time-consuming

Performance testing *can* be expensive and time-consuming, but teams can pick and choose the type of activities that fall within their budgets for cost and time. The cost of _not_ performance testing is often far greater than the initial investment in some performance-testing practices.

### It requires extensive technical knowledge

Different types of performance testing require more different degrees of technical knowledge. On its face, however, performance testing is no more or less complex than other forms of testing. Teams can choose from a spectrum of performance-testing activities according to their appetite for complexity. Accessing a web page while looking at timings from the Network panel of DevTools within a browser is a type of performance testing that adds immediate value for little effort.

### We don't have a performance environment

Performance testing doesn't always mean load testing, and even load testing doesn't always involve stressing an application to its breaking point. Some ways to assess performance don't require dedicated performance-testing environments, for example:
- Unit tests for performance during development
- API tests during System testing
- And synthetic monitoring or low-load tests in production.

### Observability trumps performance testing

Having a mature observability platform encourages many to forego performance testing in favor of monitoring application performance in production. However, the efficacy of observability depends on having data to observe, and without the ability to generate data artificially, application performance is often observed only after bottlenecks are already live.

With performance testing, teams can simulate rich user scenarios *before* potential performance issues are released to production, making observability useful in test environments as well. Some types of tests, such as disaster recovery, chaos engineering, and reliability testing, also help teams prepare for inevitable failures.

Both performance testing and observability are essential components to improving the quality of a system.

### The cloud is infinite; we can always scale up

Now that many applications are hosted in the cloud, it can be tempting to think that horizontal or vertical scaling negates the need to test performance. However, this belief can lead to significantly increased costs if efficiency is not taken into account.

Scalability is only *one* aspect of application performance that should be tested. Even efficiently scaled systems can be slow or prone to failure and outages that render the application unusable. In fact, scaling systems up can exacerbate some types of cascading failures, like retry storms and the thundering-herd problem.


## Test your knowledge

### Question 1

Which of the following are *not* reasons why we should do performance testing?

A: We want to make using our application a more pleasant experience for our customers.

B: Who knows what could happen in production? We want to be ready for anything.

C: We want to replace our observability stack with a more proactive testing suite.

### Question 2

Someone tells you performance testing is too expensive. What's a good way to respond?

A: More and more professionals are adding performance testing to their CV, so we may be able to hire someone for cheap.

B: Recording a script and replaying it costs very little, so we can just do that.

C: Performance defects are potentially more expensive to fix after they are deployed to production.

D: A and B.

### Question 3

Which of the following statements is true?

A: Performance testing is always about generating high user load or traffic against application servers.

B: Performance testing is an activity that requires specialized expertise to carry out.

C: Performance testing requires a production-like environment.

D: Observability and performance testing are complementary approaches to improving application quality.

### Answers

1. C. Performance testing and observability complement each other. They do not replace each other, and instead work together to improve confidence in a system.
2. C. A and B are both incorrect because they apply to frontend performance testing.
3. D. A is incorrect because performance testing can be done at lower load levels. B is incorrect because anyone can do  performance testing, not just specialized performance testers. C is incorrect because performance testing can be done in development, staging, and test environments as well.

