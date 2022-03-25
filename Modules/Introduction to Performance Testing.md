# What is performance testing?

A great starting point on explaining what performance-testing means is defining it word by word. Here are some dictionary-paraphrasing definitions of each word.

**_Performance_**_: refers to the capabilities (how good, fast or efficient) of a machine, vehicle, or product, when observed under particular conditions._

**_Testing_**_: take measures to check the quality, performance, or reliability of (something), especially before putting it into widespread use or practice._

  

When both words and definitions pair up, the meaning of the practice goes something like the following.

  

**_Performance Testing_** _is the act of measuring, validating, or checking a machine, vehicle, or product's capabilities (stability, speed, and efficiency) when observed under particular conditions._

  

For our interests, we will be talking about _Software_ Performance Testing, referring to it as just Performance Testing.

  

In other words, Performance Testing is a branch of software testing whose primary concern is verifying _how well_ a system works instead of _if_ it works (the focus of the functional testing practice). 

### What the perf?

Performance testing has three main focuses.

1.  **_Time_**_: It seeks to measure the responsiveness of the solution to given events. In other words, how fast it will react. It can include qualitative aspects of a user's experience, such as responsiveness during normal operations._
2.  **_Efficiency_**_: Another measurement of interest is the system's impact after the given event. The measurements can be computer resources consumption (CPU, RAM, etc.) and measurable metrics (temperature, connections, data transfers, etc.)_
3.  **_Scenario_**_: This comes directly from the definition's section that states "when observed under particular conditions." The measurements should aim at a particular event or scenario. Things like RUM (Real User Monitoring), instrumentation, load-tests, single-user tests, no-user tests, and many more can be the possible scenarios to test here._

The third part is an integral to the performance testing trade, as it challenges teams on ways to stimulate or trigger those specific circumstances or scenarios.   






# Why should we do performance testing?

Software testing began from what we now call "functional testing," which verifies whether an application works as expected (as per requirements). In other words, Functional confirms that the application does what it is supposed to do. However, the reach of performance testing goes beyond that, assuming that the software already does what it is supposed to, focusing instead on how well it does it.

  

Expanding from the definition we already reviewed, it verifies how fast and efficient is the software function. There are multiple downsides if the teams do not validate that the processes in our software respond fast and efficiently (without consuming or holding too many resources.)

  

1.  One of the downsides happens when the software doesn't respond fast enough. Slow software will eventually impact the end-user. A user affected will experience low productivity, frustrations, and even dislike for the system or any work related to it. In customer-facing solutions, the affection will be lower sales, sales lost, or even lost customers due to frustration. Bot translates in monetary losses regarding customers, productivity, and even public image.
2.  When we do not test the resource consumption, the costs for the software can escalate quickly.
3.  Another impact of resource consumption is the capacity to serve multiple concurrent users. With inefficient software, we can drain computing resources quickly when more users engage with the solution. That will limit the software's ability to serve the volume of intended users. When we reach that limit, the processes slow down or even become unresponsive, losing users, sales, and capacity.
4.  Availability can become a source of concern—an intersection of performance testing and SRE. If we do not test the system's efficiency, it will have frequent failures and even offline time. While offline, the system will ultimately prevent any work or conducting business at all.
5.  Fix, and resolution costs will increase considerably. A fix will be required when the application ultimately experiences any of the above issues mentioned. The usual adage applies here; the latest a problem is detected, the more costly the impact and resolution will be.

  

Ultimately, performance testing cares about a reliable and fast user experience in the developed application. To skip performance testing is to dismiss the user's experience.

  

As you can see, performance testing is priceless and avoids multiple losses. Then, why don't more teams do it? 

  

## Common excuses for not doing performance testing

Below are common reasons that cause teams to decide not to do performance testing and mitigate these concerns.

  

### Plain ignorance

They do not know that they should take performance testing into their software development process. Many others know or infer it is essential but do not know how to embrace it.

### Our application is too small to warrant it

The idea that only large corporations or more complex applications require performance testing is due mainly to the misconception that performance testing needs to involve the simulation of hundreds or even thousands of users. There can be significant benefits to measuring an application's performance with a single or just a handful of users. Focusing on performance only in applications that serve large users can let harmful inefficiencies reach production.

### It's expensive or time-consuming

Many feel that doing performance testing _can_ be expensive and time-consuming. Anything can feel costly, departing from a zero initial cost of no performance testing. 

But as stated earlier, the cost of not doing it can be far greater than the investment needed to implement performance testing practices.

### It requires extensive technical knowledge

There are different types of performance testing, and some require more technical knowledge than others. However, performance testing is no more or less complex than other forms of testing. Teams can choose from a spectrum of performance testing activities according to their appetite for complexity and the nature of the solution. Accessing a web page while looking at timings from the Network panel of DevTools within a browser is a type of performance testing that adds immediate value for little effort.

### We don't have a performance environment

Many organizations believe that to test the application's performance, they need a dedicated environment to overload, break if required, and do it without interfering with others.

Performance testing doesn't always have to mean load testing, and even load testing doesn't always involve stressing an application to its breaking point. There are opportunities to assess performance that don't require dedicated performance testing environments: unit tests for performance during development, API tests during System testing, and synthetic monitoring or low-load tests in production.

### We have observability, no need for performance testing

The development of mature observability platforms encourages many to forego performance testing in favor of monitoring application performance in production. However, the efficacy of observability is dependent on having data to observe. Application performance is often only observed when blockages reach production without generating data artificially.

Performance testing enables teams to simulate rich user scenarios _before_ potential performance issues are released to production, making helpful observability in test environments. And if no user activity is present in the system, you will still receive information about your processes' performance. Some types of tests, such as disaster recovery, chaos engineering, and reliability testing, also help teams prepare for inevitable failures.

Previous <-- [Main](../README.md)

Next -->[[Load Testing]]