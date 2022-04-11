# High-level overview of the performance testing process

Performance testing is a vast practice. It is full of variations, ways to do it, dependencies, and context-dependent particularities. To me, performance testing is comparable with the field of medicine. Medicine is a far-reaching practice, has lots of specialties, and even as some symptoms may be similar, the specialty and treatment needed will vary from case to case.

In the same way, performance testing has no silver bullet solution. Even as many medical specialists may heal most problems by giving antibiotics for every illness, we know that is not the best action path.

There are multiple performance-related system risks, and each requires a specific process. We must avoid silver bullet approaches. But, that said, there are general steps that the performance testing practice can follow.


# The incremental performance process

Performance testing is the process that helps us to verify and validate the speed and impact of actions in our software. 

- Risks. First, we must identify performance-related risks in our system. 

- Create tests. Create devices (observe and trigger) to provide performance metrics from the components impacted by those risks.  

- Test the new. Assess that the risk-related processes are not slow or do not consume too many resources themselves. For this, the teams must define strategies, define thresholds, create automations, test each created element, and ensure it comes out of the developer's machine performing at its best.

- Test updates. Then the team must validate that updates or other new items will not degrade that existing good performance.

- Load test. After we validate that a single process is performant, we want to assess that our software will not degrade its performance when it interacts with multiple users simultaneously, especially in the case of a large number of users.

Let's do a general overview of these steps. But, as a best practice, the team should implement even before the beginning the elements that will enable the performance tests and measurements to be as straightforward and transparent as possible.
 

# Day -1

Common beliefs place performance testing as only load tests right before the production release. Others advocate implementing it with code development. Both are good practices, but performance testing and assurance should start before placing the first digital bit or brick of hardware.

Before the project starts, teams must involve the performance engineer/team to contribute, providing recommendations, best practices, and guidelines. The input required includes hardware selection, infrastructure design and positioning, development languages, software selection, coding practices, components, and other project-related decisions.

- On software indications. We will commonly find APMs (Application Performance Monitor/Manager), test automation tools, CI/CD platforms, and indications on how to integrate everything best.

- On process suggestions. The performance engineer will recommend instrumentation types, unit test guidelines, measurements, and process requirements, such as requiring to define elements to measure and thresholds per component developed.
  

# Initial steps (Day1)

The team must define performance requirements when the project starts and later when the scoped tasks are defined, whether the project is agile or a waterfall project.

If it is waterfall, the performance requirements should be created at the design phase and reviewed during development and before the testing phase. 

If it is an agile project, these requirements must be defined when the team starts designing the MVP. After that, "day 1" will repeat sprint by sprint at the sprint planning and requirement gatherings. Here the team must create and pair-up performance requirements with each development task in the backlog.

Each scoped element will have different performance measurements and thresholds. A few will be mandatory to every process in every circumstance, as the response time of the process. Below are some examples and times when they may be needed, together with example thresholds:

- Response time - **Always**. 
	- SLOs: Under x (milli)seconds for a single thread, under +x for 10 threads 10 iterations, under ++x for load tests.

- Data transferred - When request or response payloads are significant on single or multiple requests. 
	- SLO: Under x bytes per request.
	- SLO: Under x bytes global per period

- Connection duration - When the process keeps the connection open. 
	- SLO: Connection time under x (milli)seconds.

- Consumed Memory - When the process alone or at scale keeps large amounts of data in memory.
	- SLO: Under x bytes per process.

- Memory duration - When results must stay longer or shorter than usual in memory.
	- SLO: Disposed under x (milli)seconds after use.

- Disk consumption - If the process stores large data volumes or multiple files on the hard drive.
	- SLO: No disk writes.
	- SLO: One file per process, size under x bytes.
	- SLO: No more than x files written.

- Database connections - When the process connects to the database(s).
	- SLO: No more than x connections per process.
	- SLO: Connection payload under x bytes.

- Web front end - When the developed element has web components.
	- SLO: element under x bytes in size
	- SLO: Minimization and optimization done
	- SLO: web rendering under x (milli)seconds

The examples are several and varied for each situation. The performance engineer must gather the team's input and guide them over the best elements to measure and their limits.

  

# Define load risks

As the last set of steps already started defining inherent performance risks for each process, the team should also identify load-related risks.

These will need to be constantly defined and reviewed as the project evolves, regardless of the development methodology used in the project.

These risks are present if the system is about to be launched (either MVP or Big Bang release), or if the project foresees an upcoming change in utilization patterns (user growth, events, releases), and many other circumstances when the team will have to assess new load-related risks.

The team must define risks and design test scenarios to mitigate those risks at this stage.

Risk examples:
- Developed/updated processes: 
	- are slow
	- consume too many resources
	- hurt performance elsewhere
- The system can't handle the expected user base growth
- Non-performing system or unavailable during a big sale
- The system's performance degrades after days/hours
- Basal resource consumption is high (when there are no users)
- Changing components/HW/Infra affects perf

The number of performance-related risks is enormous, varied, and at times a system can have many at once. Test scenario design must verify how the system will behave under the identified risk events. Please avoid testing multiple risks with the same test, as result analysis must review each risk at a time.

# Automating and Measuring
After the team defines the processes in scope, the paired SLIs (Service level indicators) and SLOs (service level objectives), and load risks, they should implement mechanisms to measure and validate those SLIs and SLOs.

- Automations. A common practice is to use automated scripts to grab some of these measurements. More on that later.

- Observability. Another practice, seldom taken, is to instrument the code and implement monitors on these SLIs. Once the monitoring mechanisms are in place, the team can implement the criteria to measure constantly, judge, and alert based on those SLIs and SLOs.

Best practices include both, but we will only go over the automated script option for this workshop.

# Scripting
The next step is to create automated scripts that will trigger the scoped processes regardless of the agile or waterfall methodology.

In waterfall practices, scripting happens after the development phase. Some modern waterfall projects pair scripting with development or even assign the scripting process to the developers. Something k6 loves! Sadly, most waterfalls leave scripting towards the end.

On top of that, some waterfall projects do not have modular component-oriented solutions. These require step-by-step test cases and automations. For more on this, please check the [[Load Testing]] or the [[Making scripts realistic]] sections.

On agile projects, best practices suggest not to wait until development has finished. Even as some organizations keep trying to do so, it is counterproductive. Sprint by sprint, after developing each new service or code piece, an automation that focuses on triggering it and measuring the identified SLIs should be created. Hopefully by the same person.

The team must place the created automations in a shared repository, accessible to everyone in the team at any moment. Everyone should be able to access, update/create, trigger, and even delete them. The same goes for the CI/CD platform and other automated elements. Some will put the automations in an exclusive test repository, and others sharing the solution's code repository. Either option has pros and cons, and the choice depends on each team's preferences.

# Continuous performance
A commonly implemented practice in agile projects. Although, some modern waterfall modular service-oriented projects are implementing it as well.

As soon as the new functionality is ready to be checked in, it should also have a script automating the process call. Then, the developer, the CI platform, or both should execute the automation to measure the new element's SLO'ss. If they pass, the new code is allowed to be checked in and move through the pipeline. Otherwise, the developer must review and improve the performance of the code. In the case of code updates or fixes, the developer must make sure the automation still works or fix it.

After this, we enable continuous executions by scheduling the automation to run at given loads and intervals. The continuous script executions will provide constant feedback on the performance of the developed feature. We can and should schedule these executions in production and pre-productive environments. With continuous executions, we assure that new features won't impact the performance of existing features as they move through the pipeline towards production and can monitor performance-related incidents.

# Load tests
Teams must conduct load tests when they identify load-related risks. The time to execute them varies per case, need, and the type of risk they mitigate. But most commonly, they execute as infrequent big-time events.

Continuous performance can have certain load test types scheduled to run repeatedly at given intervals to assure no impacts on new or existing code appear under load, as some happen right after production receives updates.

- On waterfall projects. Load tests are executed right before releasing to production. They include all the identified risk scenarios to test and verify the system's reaction under those risk scenarios.

- On agile projects. The load testing patterns change somewhat from waterfall projects. 
	- For continuous load assurance: teams can validate that new additions won't impact existing good performance by scheduling frequent smaller load tests. 
	- For large-scale load tests: the project is already in production and should be receiving only small changes at a time. Hence we already know how the system's performance under production load. Agile projects execute load tests when a relevant risk scenario appears or when outstanding load events are expected (such as Black Friday or tax season); the execution of full-load automated tests validates how the system will behave under those circumstances.

Every load test execution requires to have the following items that were defined/created in previous steps:
- Risk concern
- Scenario definition
- SLO definitions
- Scripts for the scoped processes
- Results and measurements repository

During the execution, the load-test execution provides live results to react at the moment. A common practice when a critical problem appears during executions. Depending on the severity of the problem, it may need to be addressed right away or can wait for the next step in the process.

# Analysis
Traditionally, performance testing generates several metrics in waterfall projects to analyze in a post-mortem mode. As mentioned earlier, there may be incidents at the moment of the execution that may need immediate analysis. But every execution will leave a myriad of data points to analyze after the fact.

In agile or continuous executions, teams will schedule this analysis to be somewhat automatic and alert on outstanding elements to review.

Load tests will often need further analysis as the risks and blast radius of a performance issue can be greater than in continuous/smaller performance tests.

At times, management may require a documented report on the findings and even a presentation to share the findings with team members. The end goal is to communicate the findings and recommendations to the team members, either by mail, report, presentation, or other available communication channels.

# Test, Fix, Repeat
Performance testing is an iterative process, even in waterfall projects. New risks may appear, changes in the environment, new releases, and especially continuous integrations.

When the tests identify defects, the fixes need to be applied, and then teams repeat the test, either in full-load or modularly. Usually, new risks can be identified and require another iteration. The team should constantly repeat the efforts to assure performance in a living application that receives changes in code, user patterns, and the general vicissitudes of life.

# Closing
To sum, the performance testing process follows a general flow:

-1. Decide on best practices to enable performance assurance as effectively as possible
1. Identify performance risks
	- General
	- Load related
	- Others
2. Define SLs and processes to include in the performance test efforts
3. Define Load scenarios to test for the identified risks
4. Automate the scoped process(es) and integrate it into the CI or Load scenarios
5. Leverage the scripted processes and integrate them to create the load scenarios
6. Execute the defined automated tests (modular, continuous, or load)
7. Observe metrics and behavior, act if outstanding issues occur
8. Gather results, analyze metrics, and present findings
9. Repeat from step 1