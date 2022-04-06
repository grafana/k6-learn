# High-level overview of the performance testing process


Performance testing is a vast practice. It is full of variations, ways to do it, dependencies, and context-dependent particularities. To me, performance testing is comparable with the field of medicine. Medicine is a far-reaching practice, has lots of specialties, and even as some symptoms may be similar, the specialty and treatment needed will vary from case to case.
In the same way, performance testing has no silver bullet solution. Even as many medical specialists may heal most problems by giving antibiotics for every illness, we know that is not the best course of action.
There are multiple system risks related to performance and each requires a specific process. We must avoid silver bullet approaches. But, that being said, there are general steps that the performance testing practice can follow.

  

# The incremental performance process

Performance testing is the process that helps us to verify and validate the speed and impact of actions in our software. 

An initial goal is to 

Then, assess that new processes are not slow or do not consume too many resources on themselves. The teams must define strategies, define thresholds, create automations, test each created element,and assure it comes out of the developer's machine performing at it's best.
Then they must validate that updates or other new items will not degrade that existing good performance.
After we validate that a single process is performant, we want to assess that our software will not degrade its performance when it interacts with multiple users simultaneously. Especially in the case of a large number of users.


# Day -1

Comon beliefs place performance testing as load tests right before relesaing to production. Others advocate to implement it with code development. But performance testing and assurance should start even before the first digital bit or hardare brick is placed.

Before the project starts, teams must involve the performance engineer/team to contribute a set of recommendations, best practices, and guidelines. The input required goes from hardware selection, infrastructure design and positioning, development languages, sotware selection, components, and any preventive decisions.

Commonly the software indications will be for APMs (Application Performance Monitor/Manager), test automation tools, and CI/CD platform, together with indications on how to integrate.

On the process suggestions, the performance engineer will recommend types of instrumentation to do, unit test pairing, measurements, and process flows to decide what elements to measure and thresholds for the measurements, all per component developed.

zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz

# Initial step
Performance testing practices are oriented at mitigating performance related risks.

The very first step on every performance testing effort is to identify those performance related risks and start desagning tests from each risk source identified.





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