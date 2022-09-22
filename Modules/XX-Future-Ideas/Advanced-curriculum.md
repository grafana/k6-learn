# Advanced curriculum

These are more advanced topics that we could consider creating modules around for further study.

### Performance testing principles

#### Theory
- [Performance testing methodologies](Performance-testing-methodologies.md)
- [Performance automation](Performance-automation.md)
- [The automation pyramid](The-automation-pyramid.md)
- [Performance test cases](Performance-test-cases.md)

#### Planning
- [Clarifying testing criteria](Clarifying-testing-criteria.md)
- What to test: Determining scope
- Where to test: environments
- Monitoring, instrumentation, and observability
- Who does the testing?
- The architecture of a load testing stack: diagram and explanation

#### Writing load testing scripts
- [Choosing a load testing tool](Choosing-a-load-testing-tool.md)
- [Load tests as code and shift-left testing](Load-tests-as-code-and-shift-left-testing.md)

#### Executing load tests
- [Parameters of a load test](Parameters-of-a-load-test.md)
- On-premise vs cloud execution
- Analyzing load testing results and reporting
	- Important performance testing metrics
- Continuous load testing
	- [What is continuous load testing and why should you do it](What-is-continuous-load-testing-and-why-should-you-do-it.md)
	- CI/CD tools

### k6 OSS

#### Testing framework
- Handling cookies
- Source control (git)
- Connection reuse options
- [Caching options](Caching-options.md)
- [Additional protocols](Additional-protocols.md)
- [Modular scripting](Modular-scripting.md) - Framework for a complex test (multiple scripts calling each other)
- Mocks and stubs
- Creating custom summary output
- [Using a proxy with k6](Using-a-proxy-with-k6.md)

#### Extending k6
- xk6 extensions
	- [How to use xk6-browser](How-to-use-xk6-browser.md)
	- [How to use the k6 operator for Kubernetes](How-to-use-the-k6-operator-for-Kubernetes.md)
	- [How to do chaos testing with k6](How-to-do-chaos-testing-with-k6.md)
	- [How to make a k6 extension](How-to-make-a-k6-extension.md)
	- Goja debugger
- k6 jslib
- Custom summary output
- Custom end-of-test summary (`handleSummary`)

#### Continuous testing
- CI/CD tools
	- [GitHub Actions](GitHub-Actions.md)
	- [GitLab](GitLab.md)
	- [Azure DevOps](Azure-DevOps.md)
	- [Circle CI](Circle-CI.md)

#### Observability
- [Observability and performance testing](Observability-and-performance-testing.md)
- [Integrating k6 with Grafana and Prometheus](Integrating-k6-with-Grafana-and-Prometheus.md)
- [k6 and Netdata](k6-and-Netdata.md)
- [k6 and New Relic](k6-and-New-Relic.md)

#### [k6 Use Cases](k6-Use-Cases.md)

### k6 Cloud

#### Foundations
- [k6 OSS vs k6 Cloud](k6-OSS-vs-k6-Cloud.md) differences and use cases
- [Using k6 OSS with k6 Cloud](Using-k6-OSS-with-k6-Cloud.md)
- [Overview of k6 Cloud](Overview-of-k6-Cloud.md) ==Mark==
- [The k6 Cloud interface](The-k6-Cloud-interface.md) ==Mark==
- [Creating a script using the Test Builder](Creating-a-script-using-the-Test-Builder.md)
- Choosing different availability zones
- [Choosing a load profile on k6 Cloud](Choosing-a-load-profile-on-k6-Cloud.md)
- [Analyzing results on k6 Cloud](Analyzing-results-on-k6-Cloud.md) ==Mark==
- [Continuous load testing with k6 Cloud](Continuous-load-testing-with-k6-Cloud.md)

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

