# High-level overview of the performance testing process


Performance testing is a vast practice full of variations, dependencies, and context-dependent particularities. To me, it is like comparing performance testing with medicine. Medicine is a far-reaching practice, has lots of specialties, and even as some symptoms may be similar, the specialty and treatment needed will vary from case to case.

In the same way, performance testing has no silver bullet solution. Even as many specialists may give antibiotics for every case and heal most problems, we know that is not the best course of action.

We must avoid silver bullet approaches. But there are general steps that the performance testing practice can follow.

  

The incremental performance process

Performance testing is the process that helps us to verify and validate the speed and impact of actions in our software. An initial goal is to assess that new processes are not slow or do not consume too many resources on themselves and that updates will not degrade that performance.

On the other hand, we want to assess that our software will not degrade its performance when it interacts with multiple users simultaneously. Especially if the case of a large number of users.

  

# Initial steps

The first step is to ensure that we know every piece of software's performance (speed and impact) at any point in its life, regardless of load, utilization, or use. 

The team must implement multiple techniques from the beginning to enable this.

1.  Code instrumentation 
2.  External monitoring
3.  Automations

1.  Unit
2.  Service
3.  Front end

  

To link this information with the k6 tool, we will focus mainly on the service and front-end automation parts. 

**Code instrumentation and monitoring** are extensive topics in themselves. They focus on measuring the performance of organic use. Such as developers debugging, testers checking the software (manual or automated), and end-users while working as UAT or in a productive manner.

**Automated unit tests** are part of the solution's code. They execute every piece of code. It focuses on simulating a set of inputs and validates the outputs to verify that the piece of code works as expected. Unit testing could provide performance measurements if the code implemented proper instrumentation, telemetry, and monitoring.

  

## Automating services

Automated service tests focus on triggering service requests to trigger the service in scope and measure its performance. The automations can execute near the server that hosts the services, remotely to measure differences, and in a mix combining locations and load profiles.

In modern software practices, one of the first steps is for teams to generate automations with each service and its functionalities. A recommendation is to automate each service call in the solution, especially those called the most frequently.

Another recommendation is for these automations to be as modular as possible and invokable from larger automations in longer E2E processes. 

Once created, they should be included and executed in the pipeline with a single thread combined with small load tests; when a check-in happens, the code moves over environments and even as it reaches production.

--WIP--