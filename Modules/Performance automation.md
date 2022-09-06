

- Synthetics and Organics
- Why/when to automate for performance  
- Types of performance automated tests  
- Types of automations in performance  
- Non-automated performance tests  


  ### Performance testinf types

//Define here content from introduction//

The two main classifications on the mechanisms that trigger these scenarios are Organics and Synthetics.

  

**_Organic_**_: This category is for the triggering mechanisms done by real-life people. These include developers debugging, QA manual tests, UAT, beta users, production users, and living organisms interacting with the tested system. A critical requirement is to have performance monitors in the points of interest while the organic use occurs._

  

**_Synthetic_**_: This category refers to any automated or computer process that triggers the action(s) of interest. Automations mimic real user interaction continuously, single-threaded, or in volumes (load testing.) They generally include performance measurement mechanisms for the simulated actions (mainly response times). Also, the term commonly refers to the recurrent automated triggering of the processes to constantly measure and monitor their status._

  

As the goal of this workshop is around the k6 tool, we will focus on synthetics. Although, from the Grafana perspective, organics-monitoring and instrumentation may be valuable material to produce.



### Frontend performance testing

Frontend performance testing is concerned with the end user-experience of an application, usually involving a browser. It verifies application performance on the interface level, measuring round-trip metrics that take into account how and when page elements appear on the screen.

Frontend performance testing provides insights that backend performance testing does not, such as whether pages of the application are optimized to render quickly on a user's screen or how long it takes for a user to be able to interact with the UI elements of the application. Because it primarily measures a single user's experience of the system, frontend performance testing tends to be easier to carry out on a small scale.

Some disadvantages of this type of performance testing are its dependency on fully integrated environments and cost of scaling. Frontend performance testing can only be done once the application code and infrastructure have been integrated with a user interface, so it begins later in a cycle than does backend performance testing. Tools to automate the frontend are also inherently more resource-intensive, so they can be costly to run at scale and are not suitable for high load tests.

Frontend performance testing excels at identifying issues on a micro level, but does not expose issues in the underlying architecture of a system.

### Backend performance testing

Backend performance testing targets the underlying application servers to verify the scalability, elasticity, availability, reliability, and responsiveness of a system as a whole.

- *Scalability*: Can the system adjust to steadily increasing levels of demand?
- *Elasticity*: Can the system conserve resources during periods of lower demand?
- *Availability*: How resilient is the system against outages?
- *Reliability*: Does the system respond consistently in different environmental conditions?
- *Responsiveness*: How quickly does the system process and respond to requests?

Backend testing is broader in scope than frontend performance testing, and it can be carried out at multiple stages in the development cycle. API testing can be used to target specific components or integrated components, allowing application teams more flexibility and higher chances of finding performance issues earlier. Backend testing is less resource-intensive than frontend performance testing, and is thus more suitable to generating high amounts of load.

Some disadvantages of this type of testing are its complexity and its inability to test "the first mile" of user experience. Backend testing involves sending messages at the protocol level, so it requires some knowledge of the syntax and content of those messages, as well as of networking principles. Backend performance testing verifies the foundation of an application rather than the highest layer of it that a user ultimately sees.

Backend performance testing excels at identifying issues in the application code and infrastructure, but does not expose issues in the application interface.




## Test your knowledge

### Question 1

Which type of performance testing does k6 excel in?

A: Backend testing
B: Frontend testing
C: Usability testing

### Question 2

Which of the following is an advantage of backend performance testing?

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