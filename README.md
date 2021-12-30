# k6 Workshop

## Objectives

The main goal of this workshop is to give attendees enough hands-on experience to be able to build and execute their own performance tests as part of their current testing efforts.

Upon completing the workshop, attendees will know how to write realistic load tests that mimic real-life user behavior, how to identify what to focus their testing efforts on, how to automate their tests as well as how to visualize and interpret the results.

## Agenda

### 1: Performance testing principles

 - [Introduction to Performance Testing](Modules/Introduction%20to%20Performance%20Testing.md)
 - ==[Goals of performance testing](Goals%20of%20performance%20testing.md)==
 - [Parameters of a load test](Modules/Parameters%20of%20a%20load%20test.md)
 - ==[[Load testing types]]==
 - [Clarifying testing criteria](Modules/Clarifying%20testing%20criteria.md)
 - Making scripts realistic
- What to test: Determining scope
- Where to test: environments
- Who does the testing?
- [[Types of load tests]]
- The architecture of a load testing stack: diagram and explanation
- Performance testing metrics
	- Consider just measuring steady state

### 2: k6 Foundations

- [k6 OSS vs k6 Cloud](Modules/k6%20OSS%20vs%20k6%20Cloud.md) differences and use cases
- k6 OSS
	- [Getting started with k6 OSS](Getting%20started%20with%20k6%20OSS.md)
	- [Understanding k6 results](Understanding%20k6%20results.md)
	- [Adding checks to your script](Adding%20checks%20to%20your%20script.md)
	- [Adding think time using sleep](Adding%20think%20time%20using%20sleep.md)
	- [k6 Test Options](k6%20Test%20Options.md)
		- VU, duration, and iteration settings
	- Adding thresholds
- k6 Cloud
	- Recording a script using the browser extension
	- Creating a script using the Test Builder
	- Choosing different availability zones
	- Choosing a load profile
	- Explanation of output per tab

## 3: k6 Intermediate

### Scripting

- Debugging, including web proxies
- Best practices for writing reusable and maintainable code
- Data correlation
- Shared Array and CSV Files
- [HTTP Requests - Metrics](HTTP%20Requests%20-%20Metrics.md)
- [HTTP Requests - Batching Requests](HTTP%20Requests%20-%20Batching%20Requests.md)
- Using groups
- Setup and Teardown functions
- Custom metrics
- Environment variables
- Using tags
- Best practices for designing realistic load tests

### Execution

- Debugging
- k6/execution
- Executors and which is best when
- Multiple scenarios
- Stages
- Thresholds, including those that stop tests if breached
- Environment variables
- Sending results to k6 Cloud `k6 run test.js -o cloud`
- `k6 login cloud`
- Running a test from CLI on k6 Cloud

### Analysis

- Custom metrics
- Output to other formats (CSV, JSON)
- k6 Cloud
	- Custom dashboards
	- Performance insights
	- Threshold list
	- Performance over time
	- Baseline tests
	- Test comparison
	- Test scheduling
	- Shareable links
	- PDF export


## 4: k6 Advanced

- Performance testing environments
- Handling cookies
- Source control (git)
- Connection reuse options
- Caching options
- [[Additional protocols]]
- Framework for a complex test (multiple scripts calling each other) - modular scripting
- Mocks and stubs
- xk6 extensions
- k6 jslib
- Custom summary output
- Custom end-of-test summary (`handleSummary`)
- Chaos experiments
- k6 operator
- CI/CD
- Integration with observability tools like Grafana, Prometheus

## End-to-end testing example

Apply as much of the above as possible to a single example, and show what we've done.

- QuickPizza?

## Glossary: [[Performance Testing Terminology]]