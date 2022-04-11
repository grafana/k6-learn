# High-level overview of the performance testing process

Performance testing is a vast practice. It is full of variations, ways to do it, dependencies, and context-dependent particularities. To me, performance testing is comparable with the field of medicine. Medicine is a far-reaching practice, has lots of specialties, and even as some symptoms may be similar, the specialty and treatment needed will vary from case to case.

In the same way, performance testing has no silver bullet solution. Even as many medical specialists may heal most problems by giving antibiotics for every illness, we know that is not the best action path.

There are multiple performance-related system risks, and each requires a specific process. We must avoid silver bullet approaches. But, that said, there are general steps that the performance testing practice can follow.


# The incremental performance process

Performance testing is the process that helps us to verify and validate the speed and impact of actions in our software. 

- Risks. First we must identify performance-related risks in our system. 

- Create tests. Then we can create devices to provide performance metrics from the components impacted by those risks.  

- Test the new. Then, assess that the risk-related processes are not slow or do not consume too many resources themselves. For this, the teams must define strategies, define thresholds, create automations, test each created element, and ensure it comes out of the developer's machine performing at its best.

- Test updates. Then the team must validate that updates or other new items will not degrade that existing good performance.

- Load test. After we validate that a single process is performant, we want to assess that our software will not degrade its performance when it interacts with multiple users simultaneously, especially in the case of a large number of users.

Lets do a general overview on these steps. But first we must check some 
 

# Day -1

Common beliefs place performance testing as load tests right before releasing to production. Others advocate implementing it with code development. But performance testing and assurance should start before placing the first digital bit or hardware brick.

Before the project starts, teams must involve the performance engineer/team to contribute a set of recommendations, best practices, and guidelines. The input required includes hardware selection, infrastructure design and positioning, development languages, software selection, components, and any other preventive decisions.

Commonly, the software indications will be for APMs (Application Performance Monitor/Manager), test automation tools, CI/CD platforms, and indications on how to integrate.

On the process suggestions, the performance engineer will recommend instrumentation types, unit test pairing, measurements, and process flows to decide what elements to measure and thresholds for the measurements, all per component developed.
  

# Initial steps (Day1)

If the project is a continuous or waterfall project, the team must define performance requirements as soon as the project starts and later when the processes in scope are defined.

In the waterfall case, the performance requirements should be created at the design phase and reviewed during development and before the testing phase.

These requirements must be defined for agile/continuous projects when the team starts designing the MVP. Later on, "day 1" will repeat sprint by sprint at the sprint planning and requirement gatherings. Here the team must create and pair-up performance requirements with each development task in the backlog.

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
	- SLO: web rendering under x (milli)seconds

The examples are several and varied for each situation. The performance engineer must gather the team's input and provide feedback on each element.

  

# Define load risks

As the input from the last set of steps already started defining inherent performance risks for each process, the team should identify early and load-related risks.

These will need to be defined early and constantly renewed as the project evolves, regardless of the used development methodology.

These risks are present if the system is about to be launched (either MVP or Big Bang release.) If the project foresees an upcoming change in utilization patterns (user growth, events, releases.)

The team must define risks and possible test scenarios at this early stage.

Risk examples:
- Developed processes are slow
- Developed processes consume too many resources
- Developed processes hurt performance elsewhere
- Expected user base growth
- Non-performing system or unavailable during a big sale
- The system degrades after days/hours
- Basal resource consumption is high (when there are no users)
- Changing components/HW/Infra affects perf
  

# Creating and/while Measuring
After creating the definitions, the team should implement mechanisms to measure the indicated SLI's (Service Level Indicators).

A common practice is to use automated scripts to grab some of these measurements. More on that later.

Another path, seldom taken, is to instrument the code and implement monitors on these SLIs. Once the monitoring mechanisms are in place, the team can implement the criteria to measure constantly, judge, and alert based on the performance metrics defined.

# Scripting
The next step is to create automated scripts that will trigger the scoped processes. Either agile or waterfall, the team proceeds to script the scoped processes.

In waterfall practices, scripting happens after the team completes development. Some modern waterfall projects try to pair the scripting with development or even assign it to the developers. Something k6 loves! But most of them leave the scripting towards the end.

Some waterfall projects do not have modular component-oriented solutions. These have to use step-by-step test case-oriented automations. For more on this, please check the [[Load Testing]] or the [[Making scripts realistic]] sections.

On agile projects, best practices suggest not to wait until development has finished. Even as some organizations keep trying to do so, it is counterproductive. Sprint by sprint, after developing each new service or code piece, an automation that focuses on triggering it and measuring the identified SLIs should be created. Hopefully by the same person.

The team must have a repository to place all the created automations accessible to everyone in the team at any moment.

# Continuous performance
A commonly implemented practice in agile projects. Although, some modern waterfall modular service-oriented projects are implementing it as well.

As soon as the new functionality is ready to be checked in, it should also have the mentioned automation. The automation execution should be done by the developer, the CI platform, or both to measure the new element SLOs. If they pass, the new code is allowed to be checked in and move through the pipeline.

After this, we enable continuous executions by scheduling the automation to run at given loads and intervals. The continuous script executions will provide feedback on the performance of the developed feature. We can and should schedule these executions in production and pre-productive environments. With continuous executions, we assure that new features won't impact the performance of existing features as they move through the pipeline towards production.

# Load tests
Teams should conduct load tests when they identify load-related risks. The times to execute them vary per case, need, and the type of risk they mitigate. Generally, they execute as infrequent big-time events.

Continuous performance can have certain load test types scheduled to run repeatedly at given intervals to assure no impacts on new or existing code appear under load. Some happen right after critical updates happen in production.

On waterfall projects, load tests are executed right before releasing to production. They include all the identified risk scenarios to test and verify the system's reaction under those risk scenarios.

The load testing patterns change somewhat from waterfall projects to agile projects. Agile projects supposedly already have the project in production and only push small changes at a time. Hence they already know how the system behaves with production load. Check the waterfall approach if the project does not proceed like this, and production releases rarely occur, regardless of how much they say they are agile.

We often execute load tests on authentic agile projects following each relevant risk scenario. Teams assure that new additions won't impact existing good performance by scheduling frequent smaller load tests. But when outstanding load events are expected (such as Black Friday or tax season), full-load automated tests are executed to validate how the system will behave under those circumstances.

Every load test execution requires to have the following items:
- Risk concern
- Scenario definition
- SLO definitions
- Scripts for the scoped processes
- Results and measurements repository

All of the above were defined/created in previous steps.

The execution may provide live data during the load tests to analyze and react. The teams involved should be aware of or review metrics at the test time.

# Analysis
Traditionally, in waterfall projects, performance testing generated several metrics analyzed in a post-mortem mode. As mentioned earlier, there may be incidents at the moment of the execution that may need immediate analysis. But every execution will leave a myriad of data points analyzed after the fact.

Teams schedule this analysis to be done somewhat automatically in agile and continuous executions or provide outstanding elements to review.

Load tests will always need further analysis as the risks, and blast radius of a performance issue can be greater than in smaller performance tests.

At times, management may require a documented report on the findings and even a presentation to share the findings with team members. The end goal is to communicate to the team members the findings and recommendations, either by mail, report, presentation, or any other communication channel available.

# Test, Fix, Repeat
Performance testing is an iterative process, even in waterfall projects. New risks may appear, changes in the environment, new releases, and especially continuous integrations.

When the tests identify defects, the fixes need to be applied, and then teams repeat the test, either in full-load or modular automations. Usually, new risks are identified in these iterations, clearing out some, but the team should constantly repeat the efforts to assure performance in a living application.

# Closing
To sum, the performance testing process follows a general flow:

1. Decide on best practices to enable performance assurance as effectively as possible
2. Identify performance risks
	- General
	- Load related
	- Others
3. Define SLs and processes to include in the performance test efforts
4. Define Load scenarios to test for the identified risks
5. Automate the scoped process(es) and integrate it into the CI or Load scenarios
6. Leverage the scripted processes and integrate them to create the load scenarios
7. Execute the defined automated tests (modular, continuous, or load)
8. Observe metrics and behavior, act if outstanding issues occur
9. Gather results, analyze metrics, and present findings
10. Repeat from step 2