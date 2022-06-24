# Advanced curriculum

These are more advanced topics that we could consider creating modules around for further study.

### Performance testing principles

#### Theory
- [Performance testing methodologies](Modules/Performance%20testing%20methodologies.md)
- [Performance automation](Modules/Performance%20automation.md)
- [The automation pyramid](Modules/The%20automation%20pyramid.md)
- [Performance test cases](Modules/Performance%20test%20cases.md)

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

#### Executing load tests
- [Parameters of a load test](Modules/Parameters%20of%20a%20load%20test.md)
- On-premise vs cloud execution
- Analyzing load testing results and reporting
	- Important performance testing metrics
- Continuous load testing
	- [What is continuous load testing and why should you do it](Modules/What%20is%20continuous%20load%20testing%20and%20why%20should%20you%20do%20it.md)
	- CI/CD tools

### k6 OSS

#### Testing framework
- Handling cookies
- Source control (git)
- Connection reuse options
- [Caching options](Modules/Caching%20options.md)
- [Additional protocols](Modules/Additional%20protocols.md)
- [Modular scripting](Modules/Modular%20scripting.md) - Framework for a complex test (multiple scripts calling each other)
- Mocks and stubs
- Creating custom summary output
- [Using a proxy with k6](Modules/Using%20a%20proxy%20with%20k6.md)

#### Extending k6
- xk6 extensions
	- [How to use xk6-browser](Modules/How%20to%20use%20xk6-browser.md)
	- [How to use the k6 operator for Kubernetes](Modules/How%20to%20use%20the%20k6%20operator%20for%20Kubernetes.md)
	- [How to do chaos testing with k6](Modules/How%20to%20do%20chaos%20testing%20with%20k6.md)
	- [How to make a k6 extension](Modules/How%20to%20make%20a%20k6%20extension.md)
	- Goja debugger
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

### k6 Cloud

#### Foundations
- [k6 OSS vs k6 Cloud](Modules/k6%20OSS%20vs%20k6%20Cloud.md) differences and use cases
- [Using k6 OSS with k6 Cloud](Modules/Using%20k6%20OSS%20with%20k6%20Cloud.md)
- [Overview of k6 Cloud](Modules/Overview%20of%20k6%20Cloud.md) ==Mark==
- [The k6 Cloud interface](Modules/The%20k6%20Cloud%20interface.md) ==Mark==
- [Creating a script using the Test Builder](Modules/Creating%20a%20script%20using%20the%20Test%20Builder.md)
- Choosing different availability zones
- [Choosing a load profile on k6 Cloud](Modules/Choosing%20a%20load%20profile%20on%20k6%20Cloud.md)
- [Analyzing results on k6 Cloud](Modules/Analyzing%20results%20on%20k6%20Cloud.md) ==Mark==
- [Continuous load testing with k6 Cloud](Modules/Continuous%20load%20testing%20with%20k6%20Cloud.md)

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

