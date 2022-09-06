# High-level overview of the performance testing process


Performance testing is a vast practice. It is full of variations, ways to do it, dependencies, and context-dependent particularities. To me, performance testing is comparable with the field of medicine. Medicine is a far-reaching practice, has lots of specialties, and even as some symptoms may be similar, the specialty and treatment needed will vary from case to case.
In the same way, performance testing has no silver bullet solution. Even as many medical specialists may heal most problems by giving antibiotics for every illness, we know that is not the best course of action.
There are multiple system risks related to performance and each requires a specific process. We must avoid silver bullet approaches. But, that being said, there are general steps that the performance testing practice can follow.

  

# The incremental performance process

Performance testing is the process that helps us to verify and validate the speed and impact of actions in our software. 
An initial goal is to assess that new processes are not slow or do not consume too many resources on themselves. The teams must define strategies, define thresholds, create automations, test each created element,and assure it comes out of the developer's machine performing at it's best.
Then they must validate that updates or other new items will not degrade that existing good performance.
After we validate that a single process is performant, we want to assess that our software will not degrade its performance when it interacts with multiple users simultaneously. Especially in the case of a large number of users.

  

# Initial steps

The first step is to ensure that we know every piece of software's performance (speed and impact) at any point in its life, regardless of load, utilization, or use. 

The team must implement multiple techniques from the beginning to enable this.

1.  Code instrumentation 
2.  External monitoring
3.  Automations
	-  Unit
	-  Service
	-  Front end
  

Each of the steps above covers some aspects of performance, load testing, SRE, and observability.

Focusing on the k6 tool, this guide will go mostly over the service and frontend automation parts.

But to not to leave gaps on the processes, here is a quick description of each.


## Code instrumentation and monitoring 
This is an extensive topic on itself. These practices focus on measuring the performance at code level through timing comands and attching monitors to automatically measure performance of any use of the code, specially organic use. Such as developers debugging, testers checking the software (manual or automated), end-users while working as UAT, or in the production environment.

## Automated unit tests 
These are also part of the solution's code. They trigger and test every piece of code. Unit testing focuses on simulating a set of inputs and validates the outputs to verify that the piece of code works as expected. Unit testing can provide performance measurements if the code implemented proper instrumentation, telemetry, and monitoring. Even unit tests can have instrumentation to provide performance metrics while they run.

## Automating services

Automated service tests generate service requests to trigger and measure its performance. 

In modern software practices, teams should generate service automations _au pair_ with each developed service. A recommendation is to automate most of the service calls available in the solution, especially those frequently invoked.

Once created, they should be included and executed in the pipeline with a combination of single thread runs and small load tests. When a check-in happens, these small tests run on each environment as the code moves over and even as it reaches production.

These automations should be as modular as possible and invokable from larger automations if longer E2E processes are needed. 

Last, teams can simulate complete load tests combining the service automations together in a complex scenario.

The teams can execute the automations from multiple locations: near the server that hosts the services, remotely while measuring differences and combining locations and load profiles.

  

## End2End

"END TO END automations" is a term applied to automations that do not execute a single step or the service type. They simulate a set of steps, focusing on simulating the user's steps in the system to reach the business process of interest.

These types of automations are becoming less common. They are needed when the only way to simulate system activity or trigger the required processes is by following the steps needed to reach that point. Modern applications are modular, and most do not need this set of steps. Teams automate older applications in an E2E way, when they do not have a service tier, are not modular, or cannot be scripted at the protocol level.

This type of automations is generally and commonly used on traditional load tests (waterfall style).

Some teams use the single-service automations and chain the different steps to simulate this real-user behavior when they can automate at the service tier. But it is recommended to avoid that practice. If the application supports a service tier; it is preferable to load test each service separately.

  

## Front-End

Frontend simulations are the ones that work directly on the user interface, such as a browser, a desktop application, or a mobile app. This limitation makes these automations of the E2E type, as there is no other way to trigger processes in the frontend. That is the case unless the front end has a modular design, which is not a common thing to happen. 

There are a few reasons to simulate at the frontend tier from the performance and load testing perspective.

One reason is that the application offers no means of automation at the service or protocol tier. The only way to automate it is by simulating actions directly in the GUI. This limitation poses disadvantages as frontend automations require considerably more resources than the protocol or service automations, limiting the capacity to simulate load. But that is the only way to automate and load test an application if there is no other way.

The other reason performance teams use these automations is not for load testing. It is helpful to have some frontend for performance measurements, even if we can automate the application at the service tier. Teams can monitor real user and frontend performance metrics (web performance) when they have frontend automations on critical business processes running in a single thread at intervals.

_Note_: It is best to avoid automating load tests at a frontend level because it is easier. These tend to be unstable and hard to maintain. Have just a few critical processes, and do not try to load-test them unless there is no other way.

# The process


# Closing

To sum, the performance testing process focuses on a few areas:

1.  Monitoring (gather performance metrics from real users and pre-prod processes)
2.  Instrumentation (Gather performance metrics from within the application)
3.  Automations (Trigger the process with a simulation and measure its performance)

The automations focus on where to automate and how to automate.

### WHERE

1.  Unitary (as part of the code)
2.  Service (triggering services and APIs)
3.  Front-End (interacting with the UI)

### HOW

1.  Single (one process, one request)
2.  Small single loads (one process, few requests in parallel)
3.  Large loads single process (multiple processes called separately in parallel)
4.  Baseline and load E2E (chained steps or processes in parallel)
5.  Continuous synthetic (few key processes triggered at intervals)