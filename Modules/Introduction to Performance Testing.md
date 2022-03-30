# What is performance testing?

Let's start explaining what performance-testing means by defining it word by word. Here are some dictionary-paraphrasing definitions of each word.

>**Performance**
>Refers to the capabilities (how good, fast or efficient) of a machine, vehicle, or product, when observed under particular conditions._

>**Testing**
>To take measures to check the quality, performance, or reliability of (something), especially before putting it into widespread use or practice.

When both words and definitions pair up, the meaning of the practice goes something like the following.

>**Performance Testing** 
>It is the act of measuring, validating, or checking a machine, vehicle, or product's capabilities (stability, speed, and efficiency) when observed under particular conditions.  

In this writing, we will be talking about _Software_ Performance Testing for our interests, referring to it as just Performance Testing.  

In other words, Performance Testing is a branch of software testing whose primary concern is verifying _how well_ a system works instead of _if_ it works (the focus of the functional testing practice). 

# BEWARE
A common misconception is to use the terms performance-testing and load-testing interchangeably.

**They are not the same thing.**

>**Performance testing is not Load testing**

We will get into more detail in the next section. But, as a quick clarification, Load testing is a sub-practice of performance testing.
Performance testing measures performance under many circumstances, and load focuses on measuring performance while the system is under load.

# What is the deal with the performance?

Performance testing focuses on three main elements.

1.  **_Time_**_: It measures the responsiveness of the solution after an event is triggered. In other words, how fast the system reacts to that event. In other words, how fast it reacts to an event (and there are many events, not just user actions and load.)
2.  **_Efficiency_**_: Another interest is to measure the system's impact after the given event. Common measurements can be computer resource consumption (CPU, RAM, etc.) and measurable metrics (temperature, number of connections, data transfer, etc.)
3.  **_Scenario_**_: These are the particular conditions stated in the definition. Performance testing measures the speed and impact during a particular event or scenario. Some events or scenarios are RUM (Real User Monitoring), instrumentation, load-tests, single-user tests, no-user tests, and many more.

Part 3 is integral to the performance testing trade. Teams must figure out ways to stimulate or trigger those specific circumstances or scenarios. The ways to simulate go from manual, automated, synthetic, and even no actions.


# Why should we do performance testing?

Performance testing goes beyond functional tests, which verify that the software does what it is supposed to do. Performance testing assumes that the software already does what it is supposed to; instead, it focuses on how well it does it.

Again, performance testing verifies how fast and efficient the software is. 
If the teams do not validate that the processes in our software respond fast and efficiently (without consuming or holding too many resources), they may face multiple downsides such as:  

1.  **Slow software** One of the downsides happens when the software doesn't respond fast enough. Slow software will impact how much work can be done and, eventually, the end-user. 
	A user affected by slowness will experience the following problems:
	- Low productivity
	- Frustrations
	- Dislike working on the system
	- Low morale
	Similar problems will appear in customer-facing solutions: 
	- Lower sales
	- Lost sales 
	- Lost customers due to frustration
	Those translate into monetary losses regarding customers, productivity, and even public image.
2.  **Expensive to run/host** When we do not test the resource consumption, the costs for the software can escalate quickly.
3.  **Uncertain/low capacity** High resource consumption will limit the capacity to serve multiple concurrent users. Inefficient software will drain computing resources when more users engage the solution. That will limit the software's ability to serve higher user volumes. It will be easy to reach the system's limits where the processes slow down or become unresponsive, losing users, sales, and capacity.
4.  **Availability** A considerable concern—an intersection of performance testing and SRE. If we do not test the system's efficiency, it will be prone to failures and even offline time. While offline, the system will ultimately prevent any work or even conducting any business.
5.  **Fix costs** Resolution costs increase considerably without performance testing. The above problems will appear, and a fix will be required when the application ultimately experiences any of those issues. The usual adage applies here; the latest a problem is detected, the more costly the impact and resolution will be.

Ultimately, performance testing helps determine if the user will have a reliable and fast experience in the developed application. To skip performance testing is to dismiss the user's experience.

As you can see, performance testing is priceless and avoids multiple losses. Then, why don't more teams do it? 


# Common excuses for not doing performance testing

Below are common reasons why teams decide not to test performance and mitigate performance-related risks.

### Plain ignorance

They do not know that they should include performance testing in their software development process. And if organizations know or infer that it is crucial, they may not know how to embrace it.

### Our application is too small ... we don't need it

The idea that only large corporations or more complex applications require performance testing is mainly due to the misconception that performance testing equals load testing; to simulate hundreds or even thousands of users. There are significant benefits to measuring an application's performance with a single or just a handful of users. It can be dangerous to only performance-test applications that serve large volumes of users. Costly performance inefficiencies can also exist in small systems.

### It's expensive or time-consuming

Many feel that doing performance testing _can_ be expensive and time-consuming. Anything can feel overpriced if you depart from the null cost of not doing performance testing. 

That may seem like savings at the moment. But as stated earlier, the cost of not doing it can be far greater than the investment needed to implement performance testing practices. Health insurance seems expensive until we don't have it during an accident.

### It requires extensive technical knowledge

There are different types of performance testing, and some require more technical knowledge than others. However, performance testing is no more or less complex than other forms of testing. Teams can choose from a spectrum of performance testing activities according to the nature of the solution and its risk profile. Accessing a web page while looking at timings from the browser's DevTools' Network panel is performance testing that adds immediate value for little effort.

On the other hand, bringing a person with extensive technical knowledge is always worth it if the solution poses expensive performance risks.

### We don't have a performance environment

Again with the confusion between Performance and load testing. Many believe that to test the application's performance; there must be a dedicated environment to overload it, break it if required, and do all that violence without interfering with others.

Performance testing doesn't always have to mean load testing, and even load testing doesn't mean stressing the application to its breaking point. Most opportunities to assess Performance and catch issues don't require massive load tests or dedicated performance testing environments: unit tests for Performance during development, API tests during System testing, and synthetic monitoring or low-load tests in production.

### We have observability, no need for performance testing

The development of mature observability platforms encourages many to forego performance testing in favor of monitoring application performance in production. However, observability's efficacy depends on having data to observe, which comes from user actions. We can observe application performance only when the users are active in the system. But if a blockage happens and the users get off of the system, monitoring will not be able to measure performance if there is no one working.

Performance testing enables teams to simulate rich user scenarios _before_ potential performance issues are released to production and even after the software reaches production. If no user activity is present in the system, you will still receive information about your processes' Performance through performance tests. 

>*NOTE*: Observability is still excellent as a first-line to measure performance metrics in the system. Pairing observability with performance tests is the best combination. None is better than the other, and both should always be present.

### No need; the cloud is infinite
The cloud may be infinite, but your checking account is not. Pushing new code into the cloud can be very expensive, by only trusting that it will expand to stay performant. Also, not all the performance problems are solved by increasing resources.

A system that performs poorly (consumes lots of resources) is like a car that is not tuned. You may feel that it still goes as fast and runs fine, tuned or not, but you will notice a difference at the gas pump if it is not tuned. The same happens with applications in the cloud; if they are not Performance tested and tuned, you will need a lot of gas!


Previous <-- [Main](../README.md)

Next -->[[Load Testing]]