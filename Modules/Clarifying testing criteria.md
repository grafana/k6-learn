Before you begin testing, it's important to get a good understanding of _why_ you're doing load testing. Now is a good time to talk to your team and other stakeholders about what you're looking to get out of this round of load testing. 

Are you reacting to a production incident that was performance-related? Are you trying to determine whether this application version degraded performance when compared to the version in production? Your reason for load testing may significantly affect the types of tests you run, so getting clarity on the purpose of load testing before you begin is essential.

A fundamental idea in software testing in general is having criteria that help you decide whether a test has passed or failed. Different levels of criteria are applied to testing. High-level criteria directly address the purpose of testing, and low-level criteria have to do with specific functionalities in application code.

## Requirements

Requirements are high-level testing criteria. Requirements related to application performance are often called non-functional requirements or NFRs. The term "non-functional" is outdated and misleading, because it implies that how well or poorly an application performs is not related to the function of an application. A better term is "operational".

Operational requirements are statements about load testing, performance, and many other aspects of the application. They describe the focus of the testing cycle and the desired state of the application.

### Who writes requirements?

Traditionally, requirements come from the business and are gathered by business analysts. On Agile team or smaller projects, however, requirements gathering may fall to developers or testers. _Who_ fulfills this role is less important than making sure that it gets done. Ultimately, everyone involved in an application is responsible for its performance, and that includes clarity around priorities.

### Writing good requirements

The format of requirements can vary depending on the framework or methodology that teams use. Large or complex projects may require spreadsheets or more formal documentation of requirements, while smaller teams may choose to use a list of bullet points on a Kanban board. Different software development methodologies involve formulas for stating requirements or refer to requirements using different terminologies, such as user stories. All of these approaches are valid. The sample requirements below are kept purposely general so that they can be modified to fit within the chosen framework.

Good requirements are SMART: Specific, Measurable, Agreed Upon, Realistic, and Timely.

#### Specific

Requirements are clear to everyone involved, and are not open to misinterpretation.

❌ _Application performance has not significantly degraded._
✅ _The 95th percentile response time of all transactions for v2 of the Product Page during the peak load scenario does not exceed that measured for v1 (3 seconds)._

#### Measurable

Good requirements are quantitative, not qualitative, and are based on facts that can be gathered about the application during testing.

❌ _The application should not display a memory leak over time._
✅ _The memory utilization of the payment processing server 5 minutes after the spike load scenario finishes should not exceed 5%._

#### Agreed Upon

Requirements that aren't communicated to other stakeholders may not take into account secondary effects on other application components or company departments.

For example, it may seem like a good idea to tune a component to generate many emails in a short amount of time, but contentious emails may create more work for customer support and cause the company to be in breach of support response Service Level Agreements (SLAs).

❌ _The application must be capable of sending 1000 lapsed subscription emails per second._
✅ _Lapsed subscription emails are grouped into batches, with up to 300 emails in one batch sent per day.

#### Realistic

Performance tuning can take a lot of time and effort. Realistic requirements take into account user experience and commercial considerations.

❌ _There should be no reported errors during the peak load scenario._
✅ _The error rate for the Login transaction during the peak load scenario should not exceed 3%._

#### Timely

Good load testing requirements are time-bounded whenever possible and avoid terms like _immediate_, _at once_, and _as soon as_. Thinking in terms of timeframes for events occuring helps teams quantify progress towards objectives as performance is improved.

❌ _Customers must immediately receive a confirmation email after making a purchase._
✅ _Customers receive a confirmation email within 30 minutes of making a purchase._

## Thresholds and Service Level Objectives (SLOs)

Thresholds, or SLOs, are another level of criteria within a project. SLO is a term borrowed from the related discipline of Site Reliability Engineering, and deals primarily with observable metrics that describe the state of an application. For example, SLOs may involve:
- CPU utilization
- memory utilization
- response time
- throughput
- Network I/O
- latency

SLOs are desired values for system metrics 

### SLAs vs SLOs vs SLIs


## Checks and assertions

## Criteria Examples

_Operational requirement:_ 
_SLO:_ 
_Check:_

## Test your knowledge

