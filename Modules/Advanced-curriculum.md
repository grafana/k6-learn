# Advanced curriculum

These are more advanced topics that we could consider creating modules around for further study.

### Performance testing principles

#### Theory
- [Performance testing methodologies](Modules/Performance-testing-methodologies.md)
- [Performance automation](Modules/Performance-automation.md)
- [The automation pyramid](Modules/The-automation-pyramid.md)
- [Performance test cases](Modules/Performance-test-cases.md)

#### Planning
- [Clarifying testing criteria](Modules/Clarifying-testing-criteria.md)
- What to test: Determining scope
- Where to test: environments
- Monitoring, instrumentation, and observability
- Who does the testing?
- The architecture of a load testing stack: diagram and explanation

#### Writing load testing scripts
- [Choosing a load testing tool](Modules/Choosing-a-load-testing-tool.md)
- [Load tests as code and shift-left testing](Modules/Load-tests-as-code-and-shift-left-testing.md)

#### Executing load tests
- [Parameters of a load test](Modules/Parameters-of-a-load-test.md)
- On-premise vs cloud execution
- Analyzing load testing results and reporting
	- Important performance testing metrics
- Continuous load testing
	- [What is continuous load testing and why should you do it](Modules/What-is-continuous-load-testing-and-why-should-you-do-it.md)
	- CI/CD tools

### k6 OSS

#### Testing framework
- Handling cookies
- Source control (git)
- Connection reuse options
- [Caching options](Modules/Caching-options.md)
- [Additional protocols](Modules/Additional-protocols.md)
- [Modular scripting](Modules/Modular-scripting.md) - Framework for a complex test (multiple scripts calling each other)
- Mocks and stubs
- Creating custom summary output
- [Using a proxy with k6](Modules/Using-a-proxy-with-k6.md)

#### Extending k6
- xk6 extensions
	- [How to use xk6-browser](Modules/How-to-use-xk6-browser.md)
	- [How to use the k6 operator for Kubernetes](Modules/How-to-use-the-k6-operator-for-Kubernetes.md)
	- [How to do chaos testing with k6](Modules/How-to-do-chaos-testing-with-k6.md)
	- [How to make a k6 extension](Modules/How-to-make-a-k6-extension.md)
	- Goja debugger
- k6 jslib
- Custom summary output
- Custom end-of-test summary (`handleSummary`)

#### Continuous testing
- CI/CD tools
	- [GitHub Actions](Modules/GitHub-Actions.md)
	- [GitLab](Modules/GitLab.md)
	- [Azure DevOps](Modules/Azure-DevOps.md)
	- [Circle CI](Modules/Circle-CI.md)

#### Observability
- [Observability and performance testing](Modules/Observability-and-performance-testing.md)
- [Integrating k6 with Grafana and Prometheus](Modules/Integrating-k6-with-Grafana-and-Prometheus.md)
- [k6 and Netdata](Modules/k6-and-Netdata.md)
- [k6 and New Relic](Modules/k6-and-New-Relic.md)

#### [k6 Use Cases](Modules/k6-Use-Cases.md)

### k6 Cloud

#### Foundations
- [k6 OSS vs k6 Cloud](Modules/k6-OSS-vs-k6-Cloud.md) differences and use cases
- [Using k6 OSS with k6 Cloud](Modules/Using-k6-OSS-with-k6-Cloud.md)
- [Overview of k6 Cloud](Modules/Overview-of-k6-Cloud.md) ==Mark==
- [The k6 Cloud interface](Modules/The-k6-Cloud-interface.md) ==Mark==
- [Creating a script using the Test Builder](Modules/Creating-a-script-using-the-Test-Builder.md)
- Choosing different availability zones
- [Choosing a load profile on k6 Cloud](Modules/Choosing-a-load-profile-on-k6-Cloud.md)
- [Analyzing results on k6 Cloud](Modules/Analyzing-results-on-k6-Cloud.md) ==Mark==
- [Continuous load testing with k6 Cloud](Modules/Continuous-load-testing-with-k6-Cloud.md)

#### Intermediate
- Custom dashboards
- Performance insights
- Threshold list
- Performance over time
- Baseline tests
- Test comparison
- Test scheduling
- Shareable links
- PDF export
### End-to-end testing example

Apply as much of the above as possible to a single example, and show what we've done.

- QuickPizza?

