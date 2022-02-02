# k6 Workshop

## Objectives

The main goal of this workshop is to give attendees enough hands-on experience to be able to build and execute their own performance tests as part of their current testing efforts.

Upon completing the workshop, attendees will know how to write realistic load tests that mimic real-life user behavior, how to identify what to focus their testing efforts on, how to automate their tests as well as how to visualize and interpret the results.

## Curriculum

### 1: Performance testing principles: ==LEANDRO==

#### Theory
- [Introduction to Performance Testing](Modules/Introduction%20to%20Performance%20Testing.md)
- Performance testing methodologies
- [[Modules/Performance automation]]
- [[Modules/The automation pyramid]]
- [[Modules/Performance test cases]]

#### Planning
- [Clarifying testing criteria](Modules/Clarifying%20testing%20criteria.md)
- What to test: Determining scope
- Where to test: environments
- Monitoring, instrumentation, and observability
- Who does the testing?
- The architecture of a load testing stack: diagram and explanation

#### Writing load testing scripts
- [Choosing a load testing tool](Modules/Choosing%20a%20load%20testing%20tool.md)
- [Load tests as code and shift-left testing](Modules/Load%20tests%20as%20code%20and%20shift-left%20testing.md)
- [Making scripts realistic](Modules/Making%20scripts%20realistic.md)

#### Executing load tests
- [Parameters of a load test](Modules/Parameters%20of%20a%20load%20test.md)
- [Types of load tests](Modules/Types%20of%20load%20tests.md)
- On-premise vs cloud execution
- Analyzing load testing results and reporting
	- Important performance testing metrics
- Continuous load testing
	- [What is continuous load testing and why should you do it](Modules/What%20is%20continuous%20load%20testing%20and%20why%20should%20you%20do%20it.md)
	- CI/CD tools

### 2: k6 Foundations

- [k6 OSS vs k6 Cloud](Modules/k6%20OSS%20vs%20k6%20Cloud.md) differences and use cases

#### k6 OSS: ==NICOLE==
- [Getting started with k6 OSS](Modules/Getting%20started%20with%20k6%20OSS.md)
- [Understanding k6 results](Modules/Understanding%20k6%20results.md)
- [Adding checks to your script](Modules/Adding%20checks%20to%20your%20script.md)
- [Adding think time using sleep](Modules/Adding%20think%20time%20using%20sleep.md)
- [k6 Test Options](Modules/k6%20Test%20Options.md)
- [Setting thresholds in k6](Modules/Setting%20thresholds%20in%20k6.md)
- [k6 results output options](Modules/k6%20results%20output%20options.md)
- [Using k6 OSS with k6 Cloud](Modules/Using%20k6%20OSS%20with%20k6%20Cloud.md)

#### k6 Cloud
- [Overview of k6 Cloud](Modules/Overview%20of%20k6%20Cloud.md) ==Mark==
- [The k6 Cloud interface](Modules/The%20k6%20Cloud%20interface.md) ==Mark==
- [Recording a k6 script](Modules/Recording%20a%20k6%20script.md)
- [Creating a script using the Test Builder](Modules/Creating%20a%20script%20using%20the%20Test%20Builder.md)
- Choosing different availability zones
- [Choosing a load profile on k6 Cloud](Modules/Choosing%20a%20load%20profile%20on%20k6%20Cloud.md)
- [Analyzing results on k6 Cloud](Modules/Analyzing%20results%20on%20k6%20Cloud.md) ==Mark==
- [Continuous load testing with k6 Cloud](Modules/Continuous%20load%20testing%20with%20k6%20Cloud.md)

### 3: k6 Intermediate

#### Scripting

- [How to debug k6 load testing scripts](Modules/How%20to%20debug%20k6%20load%20testing%20scripts.md)
- Best practices for writing reusable and maintainable code
- Data correlation
- Shared Array and CSV Files
- [HTTP Requests - Metrics](Modules/HTTP%20Requests%20-%20Metrics.md)
- [HTTP Requests - Batching Requests](Modules/HTTP%20Requests%20-%20Batching%20Requests.md)
- Using groups
- Setup and Teardown functions
- Custom metrics
- Environment variables
- Using tags
- Thresholds for tags and groups
- Best practices for designing realistic load tests

#### Execution

- Debugging
- k6/execution
- Executors and which is best when
- Multiple scenarios
- Stages
- Environment variables

#### Analysis

- Custom metrics
- Output to other formats (CSV, JSON)

#### k6 Cloud
- Custom dashboards
- Performance insights
- Threshold list
- Performance over time
- Baseline tests
- Test comparison
- Test scheduling
- Shareable links
- PDF export


### 4: k6 Advanced

#### Testing framework
- Performance testing environments
- Handling cookies
- Source control (git)
- Connection reuse options
- Caching options
- [Additional protocols](Modules/Additional%20protocols.md)
- Framework for a complex test (multiple scripts calling each other) - modular scripting
- Mocks and stubs

#### Extending k6
- xk6 extensions
	- [How to use xk6-browser](Modules/How%20to%20use%20xk6-browser.md)
	- [How to use the k6 operator for Kubernetes](Modules/How%20to%20use%20the%20k6%20operator%20for%20Kubernetes.md)
	- [How to do chaos testing with k6](Modules/How%20to%20do%20chaos%20testing%20with%20k6.md)
	- [How to make a k6 extension](Modules/How%20to%20make%20a%20k6%20extension.md)
- k6 jslib
- Custom summary output
- Custom end-of-test summary (`handleSummary`)

#### Continuous testing
- CI/CD tools
	- [GitHub Actions](Modules/GitHub%20Actions.md)
	- [GitLab](Modules/GitLab.md)
	- [Azure DevOps](Modules/Azure%20DevOps.md)
	- [Circle CI](Modules/Circle%20CI.md)

#### Observability
- [Observability and performance testing](Modules/Observability%20and%20performance%20testing.md)
- [Integrating k6 with Grafana and Prometheus](Modules/Integrating%20k6%20with%20Grafana%20and%20Prometheus.md)
- [k6 and Netdata](Modules/k6%20and%20Netdata.md)
- [k6 and New Relic](Modules/k6%20and%20New%20Relic.md)

#### [k6 Use Cases](Modules/k6%20Use%20Cases.md)

## End-to-end testing example

Apply as much of the above as possible to a single example, and show what we've done.

- QuickPizza?

## Glossary: [[Performance Testing Terminology]]