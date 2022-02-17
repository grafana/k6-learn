We load-test a system to observe and validate how it will behave or endure (survive) a significant volume of interactions. It generates a load similar to the one identified as a risk by different means.

There are two main ways to classify load testing. One deals with the ways or means to do the simulation, and the other deals with the types of load to simulate, also known as **scenarios**. 

As mentioned earlier, the first classification for load-tests defines how to simulate load. They divide into organics and synthetics. For more information on that distinction, refer to the module that describes them <<add link>>.

  

This section will focus on the types of loads that we can simulate with synthetics or automated load tests. In other words, load scenarios.

  

# Load test scenarios

A scenario is a combination of actions to execute in a system, together with specific amounts for each action.

The scenarios get interesting as they can combine multiple mixes and behaviors. They can simulate only one action or process. They can mix many different ones. They can simulate concurrent executions of each process, simulating many different users triggering them. The number of concurrent executions per process can vary throughout the test. And in the same line, the tested processes can start and stop at different times throughout the scenario.

These variations will also have a total duration of the scenario in the end.

  

Trying to test scenarios that vary too much or have crazy patterns is unwise, as identifying a source for a problem may become hectic. Because of that, there is a standard set of load test scenarios that teams traditionally run to validate usual risk sources.

  

The following parameters will generally define the scenarios:

-   Name. Silly as it sounds, the scenarios need to distinguish themselves clearly.
-   Total threads/VUsers. The sum of the VUsers that each process will simulate.
-   Processes. A list of the processes or scripts to execute. Each process must come with a few specifications:

-   Iterations: Total number of iterations per hour. It could be defined in total or per VUser as well.
-   Threads/VUsers: Number of concurrent threads that run the given process.

-   Ramp up. The period in which the number of threads or iterations will increase until reaching the desired amount.
-   Load duration. The amount of time a test will not change once the test reaches the desired volume of VUsers or volume of actions.
-   Ramp down. It is a gradual stop of the threads or volumes of action. It can be instantaneous, but generally, load tests stop gradually.
-   In-test variations. It is generally not recommended, but in some situations, the teams may wish to change the volumes of actions or VUsers more than once after they reach the desired amounts of activity.
-   Total test duration. An approximation of the total duration of the test from beginning to end.

**_Note_**: There is no standardized naming convention for these common scenario types. The names here are descriptive, and some organizations may name them differently.

  

## Mini Load - Single process

This scenario is intended more as a safe check than an actual load test but counts as it uses concurrency. 

The automation created to test it is very straightforward. It simulates a single process, with few iterations and few threads or virtual users. A usual recommendation is to have five to ten iterations with three to five threads.

This type of test validates new/updated code as it moves towards production. It is a rapid test that gives early indications of performance degradation under small loads.

As well, teams frequently use it as synthetic monitoring. It is triggered periodically to check that production systems are not experiencing issues or significant performance degradation.

  

_Example_:
![Min Single Scenario](../images/ScensMinSing.png)
Name: MiniSingleLoad
Total threads: 3
Processes: Process-A, 3 threads, 5 iterations per thread
Ramp-up: 0 seconds
Full load: as long as it takes, no wait time
Ramp-Down: 0 seconds

  

## Mini Load - Concurrent process

This type of scenario puts together different single-process mini-load tests. It executes relevant test processes simultaneously to assess rapidly if any of those processes may degrade the performance of the others. These quick executions are generally done in the last pre-productive environment to avoid releasing conflicting processes into production. This scenario is also executed in the production environment right after the new code is released. With that scenario, the team assures any system difference does not impact the processes' performance.

  

_Example_:
![Min Concurrent Scenario](../images/ScensMinConc.png)
Name: MiniConcurrentLoad
Total threads: 3x3 = **9** (# of threads times # of processes)
Processes: 
Process-A, 3 threads, 5 iterations per thread
Process-B, 3 threads, 5 iterations per thread
Process-C, 3 threads, 5 iterations per thread
Ramp-up: 0 seconds
Full load: as long as it takes, no wait time
Ramp-Down: 0 seconds

  

## Average Load

This scenario simulates the system's user workload during an average hour. The scenario includes the most frequently executed processes during that hour and aims to trigger each process as much as projected. 

In real life, the activity in the system does not start all at once. Users gradually log in and interact with the system. The load test gradually increases the number of actions or threads until it reaches the desired load to mimic the average load behavior. 

After that, the test maintains the total load simulation for an hour or so. Depending on the size of the test, some organizations run the target load for 30 minutes, 60 minutes, or even 90. The most common is an hour.

After that, the test ramps down gradually.

  

_Example_:
![Average Load Scenario](../images/ScensAvg.png)
Name: AverageLoad
Total threads: 53 (sum of all threads)
Processes: 
Process-A, 10 threads, 10 iterations per thread/hour
Process-B, 15 threads, 12 iterations per thread/hour
Process-C, 5 threads, 100 iterations per thread/hour
Process-D, 20 threads, 30 iterations per thread/hour
Process-E, 3 threads, 10 iterations per thread/hour
Ramp-up: 30 minutes
Full load: 60 minutes
Ramp-Down: 15 minutes
Total duration:~105 minutes  

## Endurance

This scenario is almost the same as the average load test. The only difference is that the total duration is considerably longer. The test aims to verify how the system will do over extended periods. A common problem with centralized systems is that they must be active 24/7. If there are problems with memory management, the performance may degrade after extended periods or have sudden alterations when the system restores memory.

Some teams run just the endurance test since it is identical to the average load scenario. If it does well during the same period as the average load, they leave it running.

Typical durations for this are 4, 8, and even 24 hours. Some leave the test running even whole days.

  

_Example_:
![Endurance Scenario](../images/ScensEndur.png)
Name: Endurance
Total threads: 53 (sum of all threads)
Processes: 
Process-A, 10 threads, 10 iterations per thread/hour
Process-B, 15 threads, 12 iterations per thread/hour
Process-C, 5 threads, 100 iterations per thread/hour
Process-D, 20 threads, 30 iterations per thread/hour
Process-E, 3 threads, 10 iterations per thread/hour
Ramp-up: 30 minutes
Full load: **360** minutes
Ramp-Down: 15 minutes
Total duration:~**405** minutes

  

## Stress Load

This scenario simulates expected periods where the load becomes higher than usual. This test mitigates the risk of degrading performance during rush hours or when most people in the organization use the system at once, such as on paydays or end-of-month processes.

The configuration of this scenario is similar to the average load, only that it increases the number of threads (VUsers or people) interacting with the system.

A variation of this scenario is where specific processes increase instead of an even increase.

The phases and duration of the test are similar to the average load test.

  

_Example_:
![Stress Scenario](../images/ScensStress.png)
Name: StressLoad
Total threads: 85 (sum of all threads)
Processes: 
Process-A, 15 threads, 10 iterations per thread/hour
Process-B, 25 threads, 12 iterations per thread/hour
Process-C, 10 threads, 100 iterations per thread/hour
Process-D, 30 threads, 30 iterations per thread/hour
Process-E, 5 threads, 10 iterations per thread/hour
Ramp-up: 30 minutes
Full load: 60 minutes
Ramp-Down: 15 minutes
Total duration:~105 minutes

  

## Breakpoint load

This scenario increases the load on the system until it reaches a breaking point. The only goal is to find the system's upper limits (or capacity) until the performance starts to degrade, become problematic, or the system stops working.

The scenario usually departs from the average load utilizations defined per process and VUser. It consists of only ramp-up. It increases the number of threads per process in the same proportion defined in the average load. The top increase will be up to a point where the team may consider it above the expected limits. Usually, the total duration will be when the system breaks, but it may sometimes reach the whole load and duration of the test.

  

_Example_:
![Break Point Scenario](../images/ScensBP.png)
Name: BreakpointLoad
Total threads: 1000
Processes: 
Process-A, 25% of threads, 10 iterations per thread/hour
Process-B, 35% of threads, 12 iterations per thread/hour
Process-C, 20% of threads, 100 iterations per thread/hour
Process-D, 15% of threads, 30 iterations per thread/hour
Process-E, 5% of threads, 10 iterations per thread/hour
Ramp-up: 30 minutes
Full load: 60 minutes
Ramp-Down: 15 minutes
Total duration:~105 minutes  
	

## Spike load

The spike scenario simulates a sudden and extreme increase in the tested load. Generally, the ramp-up is way faster than the other tests, with a short full-load duration and a quick ramp-down.

Teams rarely execute these scenarios, as they focus on outstanding events. Those sudden spikes happen on peculiar expected situations like:

-   Sudden product announcements (like in a super-bowl ad)
-   Timed opening of desired sales (product launches or concert tickets)
-   Deadlines (last days of tax submissions)
-   Sales seasons (Black Friday or Cyber Monday)

Another difference with the previous scenarios is the selection of processes to be tested. Here, the team must pick only the priority actions for the event instead of the usual day-to-day processes. For example, in an event ticket sale, the users' focus will be on the buying process for the desired event instead of browsing other events.

  

_Example_:
![Spike Scenario](../images/ScensSpike.png)
Name: SpikeLoad
Total threads: 300 (sum of all threads)
Processes: 
Process-A, 55 threads, 100 iterations per thread/hour
Process-R, 100 threads, 120 iterations per thread/hour
Process-Z, 150 threads, 300 iterations per thread/hour
Ramp-up: 5 minutes
Full load: 20 minutes
Ramp-Down: 5 minutes
Total duration:~30 minutes