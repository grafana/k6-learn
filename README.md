# k6 Workshop

_Note: While this is in progress, this is best viewed in [Obsidian](https://obsidian.md). That will change when it's released! - Nicole_

## Objectives

The main goal of this workshop is to give attendees enough hands-on experience to be able to build and execute their own performance tests as part of their current testing efforts.

Upon completing the workshop, attendees will know how to write realistic load tests that mimic real-life user behavior, how to identify what to focus their testing efforts on, how to automate their tests as well as how to visualize and interpret the results.

## Agenda

### 1: Performance testing principles

- [Introduction to Performance Testing](Modules/Introduction%20to%20Performance%20Testing.md)
- Planning
	- [Clarifying testing criteria](Modules/Clarifying%20testing%20criteria.md)
	- What to test: Determining scope
	- Where to test: environments
	- Who does the testing?
	- The architecture of a load testing stack: diagram and explanation
- Writing load testing scripts
	- [[Choosing a load testing tool]]
	- [[Load tests as code and shift-left testing]]
	- [[Making scripts realistic]]
- Executing load tests
	- [Parameters of a load test](Modules/Parameters%20of%20a%20load%20test.md)
	- [[Types of load tests]]
	- On-premise vs cloud execution
- Analyzing load testing results and reporting
	- Important performance testing metrics
- Continuous load testing
	- [[What is continuous load testing and why should you do it]]
	- CI/CD tools

### 2: k6 Foundations

- [k6 OSS vs k6 Cloud](Modules/k6%20OSS%20vs%20k6%20Cloud.md) differences and use cases
- k6 OSS
	- [Getting started with k6 OSS](Getting%20started%20with%20k6%20OSS.md)
	- [Understanding k6 results](Understanding%20k6%20results.md)
	- [Adding checks to your script](Adding%20checks%20to%20your%20script.md)
	- [Adding think time using sleep](Adding%20think%20time%20using%20sleep.md)
	- [k6 Test Options](k6%20Test%20Options.md)
	- [Setting thresholds in k6](Setting%20thresholds%20in%20k6.md)
	- [k6 results output options](k6%20results%20output%20options.md)
- [Using k6 OSS with k6 Cloud](Using%20k6%20OSS%20with%20k6%20Cloud.md)
- k6 Cloud
	- [[Overview of k6 Cloud]]
	- [[The k6 Cloud interface]]
	- [Recording a k6 script](Recording%20a%20k6%20script.md)
	- [[Creating a script using the Test Builder]]
	- Choosing different availability zones
	- [Choosing a load profile on k6 Cloud](Choosing%20a%20load%20profile%20on%20k6%20Cloud.md)
	- [[Sending k6 results to k6 Cloud]]
	- [[Analyzing results on k6 Cloud]]
	- [[Continuous load testing with k6 Cloud]]

## 3: k6 Intermediate

### Scripting

- [[How to debug k6 load testing scripts]]
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
- Thresholds for tags and groups
- Best practices for designing realistic load tests

### Execution

- Debugging
- k6/execution
- Executors and which is best when
- Multiple scenarios
- Stages
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
	- [[How to use xk6-browser]]
	- [[How to use the k6 operator for Kubernetes]]
	- [[How to do chaos testing with k6]]
	- [[How to make a k6 extension]]
- k6 jslib
- Custom summary output
- Custom end-of-test summary (`handleSummary`)
- CI/CD
	- [[GitHub Actions]]
	- [[GitLab]]
	- [[Azure DevOps]]
	- [[Circle CI]]
- Integration with observability tools
	- [[Observability and performance testing]]
	- [[Integrating k6 with Grafana and Prometheus]]
	- [[k6 and Netdata]]
	- [[k6 and New Relic]]
- [[k6 Use Cases]]

## End-to-end testing example

Apply as much of the above as possible to a single example, and show what we've done.

- QuickPizza?

## Glossary: [[Performance Testing Terminology]]