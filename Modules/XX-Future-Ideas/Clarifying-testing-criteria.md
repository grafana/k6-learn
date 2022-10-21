# Clarifying testing criteria

Before you begin testing, it's important to get a good understanding of _why_ you're doing load testing. Now is a good time to talk to your team and other stakeholders about what you're looking to get out of this round of load testing. 

Are you reacting to a production incident that was performance-related? Are you trying to determine whether this application version degraded performance when compared to the version in production? Your reason for load testing may significantly affect the types of tests you run, so getting clarity on the purpose of load testing before you begin is essential.

A fundamental idea in software testing in general is having criteria that help you decide whether a test has passed or failed. Different levels of criteria are applied to testing. High-level criteria directly address the purpose of testing, and low-level criteria have to do with specific functionalities in application code.

Below, we'll discuss the following test criteria and the differences between them:
- Requirements
- SLAs
- SLOs
- Thresholds
- Checks
- Assertions

<iframe width="560" height="315" src="https://www.youtube.com/embed/GyueCZi5qBI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

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

## Service Level Agreements (SLAs)

SLAs are test criteria that exist as a guarantee to users of how an application will perform. They set expectations for the quality, reliability, or stability that give potential or current customers a degree of assurance and confidence in the application.

An example of as common SLA is one that guarantees an uptime of 99.99%, which is a promise that an application will remain online, available, and operational at least 99.99% of the time. SLAs are often contractual, and as such, there can sometimes be significant costs involved when SLAs are not met.

## Service Level Objectives (SLOs)

SLO, are another level of criteria within a project. SLO is a term borrowed from the related discipline of Site Reliability Engineering, and deals primarily with observable metrics that describe the state of an application. For example, SLOs may involve:
- CPU utilization
- memory utilization
- response time
- throughput
- Network I/O
- latency

SLOs are desired values for system metrics, and can be thought of as internal goals that the development team or company have set for the application. The consequences to SLOs not being met vary depending on the company, but they are usually internal in nature.

SLOs are typically less conservative than SLAs, as companies may be more willing to commit to something internally that they aren't willing to commit to externally.

### A note on SLAs vs SLOs vs SLIs

SLAs, SLOs, and SLIs are sometimes used interchangeably, but they differ in the level that they are applied:
- SLAs (Service Level Agreements) consist of (often) contractual promises about the reliability of an application made by the company to customers.
- SLOs (Service Level Objectives) reflect the ideal state of an application, but they are usually internally defined.
- SLIs (Service Level Indicators) reflect the _current_ state of an application, as measured by predefined system metrics. They are not test criteria because they say nothing about what the values _should_ be.

### Thresholds

In k6, thresholds are used to codify SLOs; that is, developers and testers using k6 are encouraged to define SLOs for each test as part of the [test script options](https://k6.io/docs/using-k6/thresholds/). In this context, thresholds are a way to implement testing criteria rather than testing criteria themselves. Thresholds could also be used to implement SLAs.

## Checks

[Checks](https://k6.io/docs/using-k6/checks/) are test criteria that are more closely related to the execution of the test script rather than the application. 

An example of a check is that a response returned should include "Login" in its body. This check verifies whether the request that a script sent returned an expected response. When a check fails, k6 reports it, but otherwise, the test execution proceeds as normal.

## Assertions

Assertions are similar to checks in that they also verify some aspect of the response message, but assertions go a step further and fail a request if they are not met. In this sense, assertions are like failure criteria, and could also be used to stop test execution entirely.

In k6, assertions are created by [combining checks with thresholds](https://k6.io/docs/using-k6/thresholds/#failing-a-load-test-using-checks). For example, a test execution could be terminated if the check failure rate exceeds 10%.

## Criteria Examples

Here are some examples of what test criteria could look like at each of the levels we've discussed:

_Operational requirement:_ The application should process requests with a 95th percentile response time of 2 seconds even while under the expected peak load of 1,000 requests per second.
*SLA:* [The Company] ensures that 90% of all withdrawal requests from [Client] will be processed within 2 seconds.
_SLO:_ The 95th percentile response time for [Application component] is 2 seconds or less.
*Threshold:* The 95th percentile response time is less than or equal to 2 seconds.
_Check:_ Verify whether the response time for this request is less than or equal to 2 seconds.
*Assertion:* If the check failure rate is 10% or higher, fail the test.

## Test your knowledge

### Question 1

What is *not* a goal of an operational requirement?

A: To clearly define the ideal operational parameters of an application.
B: To ensure that all stakeholders agree on what constitutes good performance.
C: To determine when a test should be stopped due to a large amount of errors.
D: Neither B nor C is a goal of an operational requirement.

_Correct answer: C_

### Question 2 

How might an SLA differ from an SLO?

A: SLAs halt tests mid-execution if they are not met.
B: SLOs are often stricter than SLAs to leave companies wiggle room to meet contractual obligations.
C: SLOs are statements about how an application should behave under certain circumstances.
D: SLAs include text verification of HTTP response codes that are returned by the application.

_Correct answer: B_

### Question 3

Consider the following requirement: _The application must be operational 100% of the time._ What are some possible ways you could make this requirement better?

A: The requirement should be an SLA so that users have legal assurances of availability and uptime.
B: The requirement is unrealistic and the uptime percentage should be reduced.
C: The requirement is vague and should be rewritten to clarify which parts of the application are mission-critical.
D: All of the above.

_Correct answer: B or C._