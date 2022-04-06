# High-level overview of the performance testing process

  

  

Performance testing is a vast practice. It is full of variations, ways to do it, dependencies, and context-dependent particularities. To me, performance testing is comparable with the field of medicine. Medicine is a far-reaching practice, has lots of specialties, and even as some symptoms may be similar, the specialty and treatment needed will vary from case to case.

In the same way, performance testing has no silver bullet solution. Even as many medical specialists may heal most problems by giving antibiotics for every illness, we know that is not the best action path.

There are multiple system risks related to performance, and each requires a specific process. We must avoid silver bullet approaches. But, that said, there are general steps that the performance testing practice can follow.

  

  

# The incremental performance process

  

Performance testing is the process that helps us to verify and validate the speed and impact of actions in our software. 

  

An initial goal is to 

  

Then, assess that new processes are not slow or do not consume too many resources themselves. The teams must define strategies, define thresholds, create automations, test each created element, and ensure it comes out of the developer's machine performing at its best.

Then they must validate that updates or other new items will not degrade that existing good performance.

After we validate that a single process is performant, we want to assess that our software will not degrade its performance when it interacts with multiple users simultaneously, especially in the case of a large number of users.

  

  

# Day -1

  

Common beliefs place performance testing as load tests right before releasing to production. Others advocate implementing it with code development. But performance testing and assurance should start before placing the first digital bit or hardware brick.

  

Before the project starts, teams must involve the performance engineer/team to contribute a set of recommendations, best practices, and guidelines. The input required includes hardware selection, infrastructure design and positioning, development languages, software selection, components, and any preventive decisions.

  

Commonly, the software indications will be for APMs (Application Performance Monitor/Manager), test automation tools, CI/CD platforms, and indications on how to integrate.

  

On the process suggestions, the performance engineer will recommend instrumentation types, unit test pairing, measurements, and process flows to decide what elements to measure and thresholds for the measurements, all per component developed.

  

# Initial steps (Day1)

If the project is a continuous or waterfall project, performance requirements should be defined as soon as the project starts and when the processes are scoped and defined.

  

In the waterfall case, the performance requirements should be created at the design phase and reviewed during development and before starting the testing phase.

  

These requirements must be defined for agile/continuous projects when the team starts designing the MVP. Later on, "day 1" will repeat sprint by sprint at the sprint planning and requirement gatherings. Here the performance requirements should be paired up with each development task in the backlog.

  

Each scoped element will have different performance measurements and thresholds. A few will be mandatory to every process in every circumstance. But below are some examples and times when they may be needed, together with example thresholds:

- Response time - Always. 

- SLOs: Under x (mili)seconds for single thread, under +x for 10 threads 10 iterations, under ++x for load tests.

- Data transferred - When request or response payloads are significant or multiple requests may make it grow. 

- SLO: Under x bytes per request.

- SLO: Under x bytes global per period

- Connection duration - When the process keeps the connection open. 

- SLO: Connection time under x (milli)seconds.

- Consumed Memory - When the process alone or at scale keeps large amounts of data in memory.

- SLO: Under x bytes per process.

- Memory duration - When results must stay longer or shorter than usual in memory.

- SLO: Disposed under x (milli)seconds after use.

- Disk consumption - If the process stores volumes or the number of files in the hard drive.

- SLO: No disk writes.

- SLO: One file per process, size under x bytes.

- SLO: No more than x files written.

- Database connections - When the process connects to the database(s).

- SLO: No more than x connections per process.

- SLO: Connection payload under x bytes.

- Web front end - When the developed element has a component on the web.

- SLO: element under x bytes in size

- SLO: Minimization and optimization done

- SLO: web rendering under x (mili)seconds

  

The examples are several and varied for each situation. It is recommended to bring the performance engineer to gather the team's input and provide feedback on each element.

  

# Define load risks

As the input from the last set of steps already started defining inherent performance risks for each process, the team should identify early and load-related risks.

  

These will need to be defined early and constantly renewed as the project evolves, regardless of the used development methodology.

  

These risks are present if the system is about to be launched (either MVP or Big Bang release.) If the project foresees an upcoming change in utilization patterns (user growth, events, releases.)

  

These risks and possible test scenarios must be defined at this early stage.

  

  

# Creating and Measuring

After the definitions have been created, the team should implement mechanisms to measure the indicated SLI's (Service Level Indicators).

  

A common practice is to use automated scripts to grab some of these measurements. More on that later.

  

Another path, seldom taken, is to instrument the code and implement monitors on these SLIs. Once the monitoring mechanisms are in place, the team can implement the criteria defined to constantly measure, judge, and alert based on the performance metrics defined.

  

# Scripting

The next step is to create automated scripts that will trigger the scoped processes. Either agile or waterfall, the team proceeds to script the scoped processes.

  

In waterfall practices, this is done after development is completed. Some modern waterfall projects try to pair the scripting with development or even assign it to the developers. Something k6 loves! But most of them leave the scripting towards the end.

  

Some waterfall projects do not have modular component-oriented solutions. These have to use step-by-step test case-oriented automations. For more on this, please check the [[Load Testing]] or the [[Making scripts realistic]] sections.

  

On agile projects, best practices suggest not to wait until development has finished. Even as some organizations keep trying to do so, it is counterproductive. Sprint by sprint, as each new service or piece of code, is developed, an automation that focuses on triggering it and measuring the identified SLIs should be created. Hopefully by the same person.

  

This creates a repository of automations that can and will be used afterward.

  

# Continuous performance

This is most commonly implemented in agile projects. Although, some modern waterfall modular service-oriented projects are implementing it as well.

  

As soon as the new functionality is ready to be checked in, it should have as well the mentioned automation. Either done by the developer, by the CI platform, or both, the automation should be executed to measure the new element SLOs. If they are passed, the new code is allowed to be checked in and move through the pipeline.

  

After this, continuous executions of the automation are scheduled to be run at given loads and intervals. This provides continuous feedback on the performance of the developed feature. These executions can and should be scheduled in production and pre-productive environments. This assures that new features won't impact the performance of existing features as they move through the pipeline towards production.

  

# Load tests

Load testing should be conducted when the teams identify load-related risks. The times when these are executed are varied per case, need, and the type of risk they mitigate.

  

Continuous performance can have certain types of load tests scheduled to run repeatedly at given intervals to assure no impacts on new or existing code appear under load. Some are scheduled to happen right after marked critical updates.

  

On waterfall projects, load tests are executed right before releasing to production. They include all the identified risk scenarios that need to be tested to verify the reaction of the system under the risk scenarios.

  

On agile projects, the load testing patterns change somewhat from the waterfall projects. Agile projects supposedly already have the project in production and only push small changes at a time. Hence they already know how the system behaves with production load. If they do not proceed like this and they are unfrequently released into production, check the waterfall approach.

  

On authentic agile projects, load tests are executed, each under the relevant risk scenario. Frequent smaller load tests are executed to assure new additions won't impact existing good performance. But when outstanding load events are expected (such as Black Friday or tax season), full-load automated tests are executed to validate how the system will behave under those circumstances.

  

Every load test execution requires to have the following items:

- Risk concern

- Scenario definition

- SLO definitions

- Scripts for the scoped processes

- Results and measurements repository

1.  All of the above were defined/created in previous steps.

# Analysis


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