# Realistic scripts
One of the goals for automated load automations has been to simulate realistic human behavior and use. That is not an easy task that gets complications from a few primary sources. 

1. **Superfast computers** - Automated simulations can go at inhuman speeds. A machine does not have to stop and think like a human being, and it will go as fast as a machine can go, which is incredibly fast.

2. **Random human behavior** - Load testing has to simulate tons of humans interacting with the system, adding to the trouble of simulating one human being. Each with its peculiarities over how fast they can work.

3. **Simulations simulate in bulk** - Adding up to the mix, a possible third element is that lately, the performance simulations do not focus so much on the end-to-end set of steps in the interaction of a single user. Simulations have to mimic these complex and multi-step behaviors at times, and others focus on having separate processes that will trigger each step on its own.

4. **Modular software** - One new element is that users do not touch a single server anymore while working. They may be touching several services from different ones on a single page. Systems will see a single user in many places; in these modern times with distributed microservices, it is weird to use the user metric to simulate load.

### So, how can we make them realistic?
Load test requirements come with the indication to mimic real users but in particular settings or scenarios. 
- Sometimes, the indication is to load test several users interacting with the system.
- Other times, it will focus on generating some throughput volumes per process.
- Or teams may receive just the indication to simulate production.
At times, the indication may be "just load test it."

Realistic load simulations will require those inputs, such as:
- Goal for throughput. Per process and in total.
	- If we only receive the total, we will need a percentage per component.
- Goal for Virtual users/threads.
	- As mentioned, virtual users are not so transcendent lately, but the needed threads to simulate the throughput.
- Period or duration of the test or load sample.
	- This defines the test duration.

There are multiple ways in which automations try to simulate the indications from above. There are different behaviors and types of automations.
We will go from the smallest and least problematic to the most significant and complex of these types.

  ![Realistic](../images/Realistic.png)

## Process-oriented automations

These are the simplest automations, as these do not try to simulate a real user with a single script but just one step that the user may do. They are helpful to test a single process that has just been created or was updated. Each of these will automate only one action, paired up with any quick dependencies it may have. IE. Logins or authentications.

Depending on the desired throughput for this single process (and some other variable factors), the team may want/need to use parallel processes or threads (virtual users) to reach the threshold goal in the given period. A single thread will not be enough if the process takes 1 second to respond, and we need to generate ten calls in 5 seconds.
Because of this, we can require to add parallel requests to simulate the desired threshold. There are some other reasons for wanting to generate the load from multiple threads, like multiple user simulations, credential handlings, etc. 
We end up with two main parameters to simulate a realistic threshold. 
1. How many parallel simulations do we need (virtual users or threads) 
2. How many times should each process execute in the given time.

The time it takes the process to respond is a significant dependency here. As the load increases, the response time of the process can increase. That is another reason to have multiple threads if the project has not indicated already how many to simulate. 

We need to give some buffer time or "pacing" to accommodate this possible extension in the duration of the process. That pace also helps to simulate the action of a real user who doesn't start all over immediately.

So we have a triad of parameters to be defined to simulate the desired load.
- How many threads to use.
- Total threshold to simulate.
- How much to wait per process. (or # of iterations in the duration of the test)

These three parameters are dependent and proportional to each other. We cannot affect one number without impacting the others. This simple equation displays this balance. 

> TotalIterations = NumberOfThreads x IterationsPerThread

As mentioned earlier, the project may have already provided some parameters. But we must keep in mind this proportion.

It remains to define how much each process should wait between the iterations or indicate the number of iterations desired.

Finding the wait time or pacing needed to simulate the number of desired iterations can be challenging.

The formula is something like the following:

> Wait = (TotalTime - (IterationsPerUser x AvgProcess duration)) / TotalIterations

Crazy amount of calculations for the most accessible type of automation, right? Thankfully k6 does some of this automatically. Please check the workshop section on Load test options or the k6 Executors documentation for more information.

  ![Realistic](../images/Realistic1.png)
  

## Step flow automations

Step flow automations simulate a flow of different steps that a human being may do when working with the system in a single script. Contrary to the previous one which a single script simulates one step.

These automations are losing popularity as the need to simulate the steps and waits done by an actual human is no longer needed in modern modular and service-oriented applications. The focus is on triggering each service according to average production use or test goals.

Simulating a set of steps in a single VUser was a requirement when there was no clear observability of the utilization of each service, and the whole thing resided in a monolithic design. The only indication teams had to load test a system was the number of users and vague guidelines to figure out what steps were done by the users.

Process flow automations do multiple and different actions one after the other in a single script or flow. 

As we mentioned, machine simulations can go incredibly fast compared to humans. Humans wait, think, remember, or move their hands slower than the electrons in the silicon board running the simulation.
Hence, we must add wait or sleep times between each of the different steps the process follows. Automations must simulate the time between each action when humans are idle. The industry commonly calls it Think Time, Sleep, Wait, and many other synonyms. We will refer to them as sleep from now on.

That is different from the pacing time we mentioned earlier. Sleep gives realism to the automation taking a virtual breath in between steps where pacing is a wait at the very end before starting all over to control the number of iterations and generate the desired throughput.

For the sleep time between steps, we can configure different waits on each of those pauses. Still, a recommendation is to use a somewhat realistic standard time between each significant step in the automation. Let's say about 5 seconds.

That leaves us with a process flow like the following:

>Step1 -> Sleep -> Step2 -> Sleep -> Step3 -> Sleep -> Step4 -> WaitToRestart

Another detail is that human beings do not wait precisely 5 seconds between steps. Even if that was the requirement, a person could not wait precisely 5 seconds between steps. Only machines have that precision. The automations must add some randomization to that pause, but still somewhat near those 5 seconds.  

Then what's left is to calculate a reasonable wait time at the end of the steps to simulate the desired volumes in a load test. The random stops, the variable time each step will take, and other factors will increase the complexity to simulate the desired load with a flow of steps.

  ![Realistic](../images/Realistic2.png)

Again k6 comes to the rescue with the executors, which streamline some of these calculations. But in the case of multi-step or E2E automations, it is recommended to add them manually between steps.

  

## Multiple processes, multiple flows, multiple users

Load tests were considerably complex in the past. 

The most common load tests had multiple test cases; each test case or script had a flow of steps simulating a targeted process. We assign to each test script several virtual users and varied load targets for each. *(see 'All together option 1')*

Nowadays, full-scale load tests focus on triggering each targeted process accordingly to what is observed or expected in production. *(see 'All together option 2')*

In both cases, the mixed bag of tasks comes down to defining how many times we should run each process/script, per-thread or virtual user, and how many threads to use for each process.

Getting these numbers right is the core of simulating a realistic full-load scenario.

Again, the first step is to have the total number of actions in the desired period, per process, and a global total.
```
Process TotalxHour

A 10

B 50

C 30

D 20

E 40

TOTAL 150
```
  
Here we need to know the goal number of virtual users to be simulated. That can be defined either from the load test requirement, the number of threads needed to generate the desired total throughput, or the per-process throughput.

When the number of virtual users is provided as a target, we can divide that number between the total throughput goal. That will give us a great approximate pace to give to each process. Let's say we have a goal of 50 total virtual users.

```
Iterations per VU = Total iterations/Total VUs

Example: 150/50 = 3
```

In the example, each Virtual user would have to iterate three times per hour with the desired throughput and target number of virtual users.

As you can see, even if at scale, the proportion between the total number of users, desired throughput, and iterations per vUser stays consistent.

  ![Realistic](../images/Realistic3a.png)

In essence, keeping the proportion of throughput, pacing, and the number of virtual users on a complex load test will be critical.

  ![Realistic](../images/Realistic3b.png)

For these situations, k6 has multiple functions that help the test creators to ease this process with controls over the times each vuser iterates, or all of the users, or control their injection rate, and many more. For more information, check the k6 executors' documentation.
