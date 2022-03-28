# Realistic scripts
Automated Performance and load testing have faced the challenge of modeling realistic user behavior. That is a problem that comes from few main sources. 

### Super fast computers
Automated simulations can go at inhuman speeds. A machine does not have to stop and think like a human being, and it will go as fast as a machine can go, which is incredibly fast.

### Random human behavior
Load testing has to simulate tons of humans interacting with the system, adding to the trouble of simulating one human being. Each with its peculiarities over how fast they can work.

### Simulations simulate in bulk
Adding up to the mix, a possible third element is that lately, the performance simulations do not focus so much on the end-to-end set of steps in the interaction of a single user. Simulations have to mimic these complex and multi step behaviors at times, and others just focus on having separate processes that will trigger each step on it's own.

### So how can we make them realitic?

Out of these situations, there are multiple ways in which automations try to solve or approach these issues. They do it through different behaviors and types of automations.
We will go from the smallest and least problematic to the most significant and complex of these types.

  ![Realistic](../Realistic.png)

## Process-oriented automations

As mentioned, these are the simplest automations, as these do not focus on simulating a real user. They are helpful to test a single process that has just been created or was updated. Once we create single-process automations, they can trigger that single process, but in essence, that is the only thing or set of things they will do.

With these, it is not a matter of just repeating a single request, as the response of the request can be slow enough to not to allow the number of requests we desire to simulate. Because of this we also add the number of parallel requests we need to simulate. We will end up using two main parameters. 
1. How many parallel simulations we need (virtual users or threads) 
2. How many times each should execute the process.

Traditionally we figured this by first calculating the number of iterations per thread and then calculating how long each iteration should wait to start again. 

> TotalIterations = NumberOfThreads x IterationsPerThread

Then the wait per thread.

> Wait = (TotalTime - (IterationsPerUser x AvgProcess duration)) / TotalIterations

Crazy amount of calculations for the easiest of them all, right? Thankfully k6 does some of this automatically. Please check the workshop section on Load test options or the k6 documentation for Executors for more information.
  ![Realistic](../Realistic1.png)
  

## Step flow automations

Step flow automations are the ones that simulate a set of steps that a human being may do when working with the system.

These automations are losing popularity as the need to simulate the steps and waits done by an actual human is no longer needed in modern modular and service-oriented applications. The focus is on triggering each service according to what multiple users do on average production.

Simulating a set of steps in a single VUser was a requirement from the days when there was no clear observability on the utilization of each service. The only indication teams had to load test a system was the number of users and vague guidelines to figure out what steps were taking these users.

As we mentioned, machines can go incredibly fast compared to humans when simulating the steps in a process. Humans wait, think, remember, or move their hands slower than the electrons in the silicon board running the simulation.

Process flow automations do different actions one after the other. After that, they also have wait times at the end of the steps to start and do the actions the desired number of times.

As mentioned, automations must simulate the time between each action, where humans are idle. The industry commonly calls it Think Time, Sleep, Wait, and many other synonyms.

We can configure different waits on each of those pauses, but a recommendation is to use a somewhat realistic standard time between each step in the automation. Let's say about 5 seconds.

That leaves us with a process flow like the following:

>Step1 -> Wait -> Step2 -> Wait -> Step3 -> Wait -> Step4 -> WaitToRestart

Another detail is that human beings do not wait exactly 5 seconds between steps. Even if that was the requirement, a person could not wait exactly 5 seconds between steps. Only machines have that precision. The automations must add some randomization to that pause, but still somewhat near those 5 seconds.  

Then what's left is to calculate a reasonable wait time at the end of the steps to simulate the desired volumes in a load test. The random stops, the variable time each step will take, and other factors will increase the complexity to simulate the desired load with a flow of steps.

  ![Realistic](../Realistic2.png)

Again k6 comes to the rescue with the executors.

  

## Multiple processes, multiple flows, multiple users

Load tests had some peculiarities in the past. The most common load tests had multiple test cases, each in a flow of steps simulating a targeted process, each with several virtual users and varied load targets for each.

  

Nowadays, full-scale load tests focus on triggering each targeted process accordingly to what is observed or expected in production.

  

In both cases, the mixed bag of tasks comes down to defining how many times we should run each process, per-thread or virtual user, and how many threads to use for each process.

Getting these numbers right is the core of simulating a realistic full-load scenario.

The first step is to have the total number of actions in the desired period, per process, and a global total.
```
Process TotalxHour

A 10

B 50

C 30

D 20

E 40

TOTAL 150
```
  
Here we need to know the goal number of virtual users desired to be simulated. This can be defined either from the load test requirement, or from the number of threads needed to generate the desired total thorughput, or per process throughput.

When the goal of number of virtual users is provided, we can divide that number between the total throughput goal. That will give us a good aproximate pace to give to each process. Let's say we have a goal of 50 total virtual users.

```
Iterations per VU = Total iterations/Total VUs

Example: 150/50 = 3
```

In the example each Virtual user would have to iterate 3 times per hour with the desired throughput and target number of virtual users.

In escence, on a complex load test, it will be critical to keep the proportion of throughput, pacing, and number of virtual users.

for these situations, k6 has multiple functions that help the test creators to ease this processes with controls over the times each vuser iterates, or all of the users, or control their injection rate, and many more. For more information check the k6