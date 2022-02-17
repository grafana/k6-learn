# Performance testing Methodologies
Software development methodologies. The software world has been changing a lot recently, not only in technological terms but also in how we create it. Both changes impact software's multiple areas, especially how we test it and assure its quality. As performance testing is a proud member of the QA realm, of course, it gets several impacts and changes to its ways.

On top of it, new technologies are changing how we do things. Some of those new techs are service tiered applications, micro-services spread all over the place, and even the cloud! All are changing how we do things.

But before we get deeper into those impacts on the performance ways, let's do a quick recap on what are these software development methodologies.

## Methodologies in general

Today, right after the pandemic days, we have two primary methodologies used in the software industry. Each of the two types has variations, but we can group them into two big flavors: Waterfall and Agile.

Waterfall seems to be on its way out. Most organizations are trying to transition away from Waterfall and embrace a variation of the new Agile methodologies. Some are taking steps, others are struggling, and very few are successfully implementing and reaping their success.

Here is a short description of each type.

  

### Waterfall methodologies

The waterfall methodologies have been present in the software development industry almost from its beginnings. A brief description would be a phased project. Each phase involved specific groups of specialized people, and generally, the final product was delivered several months and even years after it started.

  

An average waterfall project would start with a **discovery** phase defining problems and needs around making it happen. Then, a **design** phase would plan every second of the project's long life. The team would begin the **build-up** phase that constructed everything on the plan at hand. The **testing** phase would start once all the code was written and assembled. Finally, after the software (hopefully) passes all the tests, it is ready for **release**. Once finished, the implementing team would **wrap up** and set off to new pastures.

  

Some of the flaws in the waterfall methodologies are: 

Most of the time, the projections and estimations were wrong with so much time in advance. Issues impacted the schedule, but management rarely changed the release date or scope. Other sliding phases commonly ate the time allowed for testing. It was hard to go back to the development phase when testing found issues. As the release date came closer, the teams churned to deliver still on time. And many more.

  

### Agile methodologies

There are so many variations for these development styles. Among them, we can find Scrum, CI/CD, DevOps, Kanban, Shape-Up, SAFE, and the list goes on and on. 

But an essential characteristic for all these methodologies is splitting the deliverable into small pieces. Then, releasing those pieces as often as possible. Contrary to the Waterfall, which had a single big-bang release once or twice a year.

The goal is to get those pieces in front of the end-user as fast as possible, measure the reception and quality, and define the following steps based on that feedback.

  

**_Note_**: If you find a project that claims to be an Agile flavor but doesn't release to _production_ frequently nor pay close attention to those frequent releases' feedback, they may not be agile.

  ![Waterfall vs Agile](../images/WvsA.png)

## Tech landscape

In addition to those crazy changes in how we do projects, the software development technologies will impact how we test them. 

Here we also have two principal classifications on the way software is done. They are called multiple names, but we will name them the **Monolith** and **Modern** tech for this explanation.

  

### The Monolith

We refer to most old software solutions as monolithic. In some ways, this officially means that a solution sits in a single box, environment, realm, or packed up together. No service tier (or very weak), front-end and back-end requests are usually in the same call, no distribution, any change/problem will stop the whole thing, it is tough to segment test steps, and the list goes on.

  

### Modern apps

These applications have implemented multiple new technologies or ways to do software. To start, they are considerably modular and distributed. They separate the front-end tier from the back-end processing tier through services, making it easier to update continuously and somewhat isolated. Those services may be micro, distributed, separated, in the cloud, or provided by third parties. The modularity and distribution provide a crazy amount of possibilities!

  

**_Note_**: There are hybrid solutions. Some organizations try to migrate gradually without dumping old systems at once. The approach to performance testing will be complex in those cases. 


![Monolith vs Serviced](../images/MvsM.jpg)

## Performance testing

In the same way, QA practices, and especially performance testing, are different depending on the methodology and technology that the application has.

Let's dive into how is the approach on each of those methodologies. But beware, there is a mix on the path. We have the two methodologies mentioned above, but our solutions also have two other variations: ancient designs and modern technology. These are the monoliths on the one hand, and on the other, the contemporary service-tiered cloud apps.

We will go over each of those variations with a brief description of how we should do each project mix.

  

### Waterfall + Monolith

In the past, this was the traditional mix. Most of the projects were performance testing this way ten years ago.

It is heavily phased in the same way as Waterfall does. On top of that, since it is monolithic, it focuses on automating front-end and end-to-end load tests. The big-bang release nature of Waterfall and the Monolithic solutions make it almost mandatory to focus on load testing for production and worst-case scenario loads.

The performance (load) testing project will have the following phases that usually start after development has finished: **Discovery**, figuring out the performance risks, the system uses, and processes available. **Design**, identify the business processes to script, document load test cases, plan every script, every scenario run, and document it all. **Creation**, script all the business processes, create the scenarios, getting everything ready to run some load tests. **Execution**, run all the planned load scenarios, gather the results from each, report any found issues, and repeat if needed/viable. **Reporting**, right before the production release, present the findings; this may stop the production release if the results need rework.

There are several drawbacks to this approach, like the impact on the release date or scope if any issue appears. But given the siloed design of Waterfall, the need for load assurance before big-bang releases, and the Monolithic design, there may be no other way for this type of project without redesigning the whole approach.

  

### Waterfall + Modern

Some projects and applications may be embracing modern technologies, but they are still following the Waterfall model. Sadly, this will limit the performance testing steps on the allocated time phases. The project still must flow through the stages described above. Although, the testing team can do the discovery, design, and creation phases au pair with the software development cycle.

The automation processes will be different. If the application is service tiered, the automations should focus on triggering those services instead of mimicking long E2E processes.

The team should execute early tests as the developers finish each new service or functionality.

A big load test is needed since the application still follows a big-bang release. But the risk of facing problems is more negligible as the pieces could be performance tested independently and in advance.

_Key differences_: Create automations in a service or API focus. Do early performance and mini-load tests per piece. 

### Agile + Monolith

Nope. Just nope, and again nope. Sadly many organizations are trying to implement agile methodologies while keeping a monolith.

Following the key characteristics we described for being agile, it is hard to do continuous releases in the Monolith.

In the same way, developing modular, fast, efficient, and straight-to-the-point automations is incredibly difficult. The testers are the only ones who can automate; the automations are often long E2E steps, hard to maintain, and quickly make the technical debt grow.

I can't coherently recommend a way to proceed on these projects. If faced with them, suggest migrating everything to services, focus on making the performance automations as straightforward as possible and on the most frequently triggered processes, and may the force be with you.

  

### Agile + Modern

This mix is the best if implemented well. If the solution is service-oriented, the team releases frequently, there is an efficient Continuous Integration platform/process, there is attention to production feedback, and they share responsibilities. You are in the right spot.

The approach changes vastly here from the ones described above.

Here, testers should no longer do the automations and test executions, as the handover is considered wasteful of time.

Agile projects with modern architectures are already in production. If they are in the process of doing the first release of an MVP, they should not be getting too much activity on that MVP. For this reason, complete production-like load tests are often not required, as the team knows the application's performance that gradually grows its user base and gets new releases.

There are tasks such as instrumentation, testability, and monitoring that are part of the modern performance testing practices, but we will focus on the tasks relevant to automation.

1.  The Performance specialist becomes an advisor on what to test for when new requirements are defined, even when creating the MVP and any other infrastructure or continuous process integration.
2.  As new tasks are defined, the performance specialist will guide relevant tests, SLO's, and types of executions required. The project tasks created are paired up with those test requirements to be automated, implemented, and passed. Without them, the developer cannot mark the project task as completed. 
3.  The developer becomes responsible for pairing performance automations with finished or updated functionalities. After the developer finishes the new requirement and the automation, it must be integrated with the CI platform to run as the new code is checked in. Instead of waiting for a tester to come, automate, test and report, the developer assures the performance right there and then. The developer should place the created automation in a centralized repository accessible to the CI platform and the rest of the team. 
4.  Different types of executions should happen automatically on the automations that the developer created over the existing environments.

1.  Single-threaded: These run as a single thread for a few iterations (1, 3, 5) without wait-time to verify that a single process performs as expected. Or that the performance does not deviate much from the past if it had an update. These must run right after a check-in (new or updated code) on every environment the code passes to reach production. Or continuously as a synthetic, continuous check for processes in production.
2.  Mini load tests on single processes: Similar to the previous, small and quick load tests are run on that single process to validate that it doesn't degrade its performance exponentially with some load. The difference is that the automation stresses the same single process with a few threads. The run still does a few iterations per thread. The recommendation is to run these automations upon code check-in and synthetic production reviews.
3.  Concurrent processes: Still, the project team should run small load tests combining different processes in the solution without doing a full production-like load test. Processes with high chances to run together and at volume should be stressed together by the single automations created by the developers. The runs should happen in every environment as the code flows into production. This approach will mitigate the performance risks of processes fighting for each other's resources.

As mentioned earlier, agile projects are usually already in production. If the team followed the steps above, they would know the performance of each process even in production and the system's behavior under load.

A recommendation to know production's performance under average loads is to monitor production while applying shift-right techniques, such as canary, blue-green, or A-B. But, there will be occasions where leveraging synthetics and real users may not be enough.

Some examples:

-   Expected future growth of the system's user base: A recommendation is to simulate the more significant load, especially if the increase may be sudden.
-   Sudden massive spikes: We cannot test these with real-life users. Usually, these types of tests happen outside of an SDLC process. A sale, an event, or a deadline may bring a massive amount of users at the same time into the system. The number of users is far more significant than the usual volumes or any existing beta users.
-   Other outstanding loads: There are many large loads that we cannot test any other way. Modern shift right techniques will not be enough. The team must do an automated load test if your team is in a situation where the risk of a load is more prominent than usual.

There is a massive advantage in following the recommended steps in an agile project that follows modern software practices. Teams can quickly assemble complex load test scenarios when the developers create the automations au pair with each new service and component.

A load test can be ready in hours or even minutes, gathering production utilization metrics or the expected load patterns.