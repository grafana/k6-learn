# Welcome to the k6 Resource Hub

Want to present about k6 to your company or meetup? This repo contains resources for:
- creating slide presentations
- giving a workshop
- speaking about k6

## Presentations

[Here's a starter slide deck](https://docs.google.com/presentation/d/1gviRg7RTzT0Y2_5WPBADyn5xpa96PIqWivGAThNW6pM/edit?usp=sharing) that you can copy, modify to your use case, and present. It is only intended to be a jumping off point, so you can remove slides that wouldn't appeal to your audience or add new ones to show off your style more.

### Presentations others have given

Looking for inspiration? Here are some presentations that others have given that play off the same information.

- 2022. [Performance y carga con k6 y Grafana](https://docs.google.com/presentation/d/1xEjCmxYGiE-sZJ5bMnJ9q5_ypjUy10QFivPNItnvhbM/edit?usp=sharing) by [Leandro Melendez](https://twitter.com/SrPerf), presented at a Grafana Labs webinar (slides are in English except for the title slide, which is in Spanish).
- 2022. [Grafana k6: Testing without limits](https://docs.google.com/presentation/d/1rTNPk2B7Py2QADfilmxExL-teLWLzBI0TgUgQlax1TM/edit?usp=sharing) by [Paul Balogh](https://twitter.com/javaducky) and [Nicole van der Hoeven](https://twitter.com/n_vanderhoeven), presented at [GrafanaCONline 2022](https://grafana.com/go/grafanaconline/2022/demo-load-testing-with-k6/) (English): extending k6 with xk6 for results analysis, execution within Kubernetes, and browser testing.
- 2022. [Performance testing gRPC Services](https://docs.google.com/presentation/d/1M2acBRmjADMrH_RDRYgqh4Ak8P11Ejy0e9savYw_FsA/edit?usp=sharing) by [Mostafa Moradian](https://twitter.com/MosiMoradian) at a gRPC community meetup (English): gRPC testing with k6.
- 2022. [Shift left performance testing with Grafana k6 Cloud](https://docs.google.com/presentation/d/1mA6Hmsunfx9l10iJblBgFh-arUAWjiuNiEzxkHfuwQE/edit) by Wei Li, Vijay Tolani, and [Mark Meier](https://twitter.com/markjmeier), presented at a [Grafana Labs webinar](https://grafana.com/go/webinar/performance-testing-with-grafana-k6-cloud/) (English): how the performance testing space has shifted left, and how k6 Cloud addresses modern issues faced in testing.
- 2022. [How to be a gish - API, browser, and chaos testing in one script](https://slides.nicolevanderhoeven.com/2022-how-to-be-a-gish/#/) by [Nicole van der Hoeven](https://twitter.com/n_vanderhoeven), presented at [ExpoQA 2022](https://www.youtube.com/watch?v=aq0XSNcXDb0) (English): why testing is a multidisciplinary field, and how to do API load testing, browser automation, and chaos engineering in one k6 script.
- 2021. [Intro to load testing with k6 and Grafana](https://docs.google.com/presentation/d/1WOA50nqIv1NoiHBxGIH_JM02rZqSjX81gHTlwPJ5i1U/edit?usp=sharing) by [Nicole van der Hoeven](https://twitter.com/n_vanderhoeven), presented at [a Grafana Labs webinar](https://www.youtube.com/watch?v=tFsIgbqXbxM) (English): why load testing in pre-prod is still a thing, and how to integrate k6 and Grafana.
- 2021. [Introduction to load testing with k6](https://docs.google.com/presentation/d/1AQOjbJ4LALRvEWq-UvGEC9Q63ItKyBFdlX9nEqVTIA8/edit#slide=id.p) by [Mostafa Moradian](https://twitter.com/MosiMoradian) at a [KarajLug meetup](https://www.youtube.com/watch?v=BmUOrrERPes) (slides in English, video in Farsi): getting started with k6 and how to use k6 with InfluxDB and Grafana.
- 2021. [Schrödinger's Pokémon: k6 and Grafana edition](https://docs.google.com/presentation/d/11HakdG0w2RsOunVnD6qPkTfTPpBxtXFECK_ynSOBraE/edit?usp=sharing) by [Nicole van der Hoeven](https://twitter.com/n_vanderhoeven), presented at [TestCon Europe 2022](https://www.youtube.com/watch?v=jSgH3I8_ldk) (English): chaos testing with k6 using xk6-chaos.
- 2021. [Load tests as code: An introduction to k6](https://slides.nicolevanderhoeven.com/2021-load-tests-as-code/#/) by [Nicole van der Hoeven](https://twitter.com/n_vanderhoeven), presented at the [Cambridge University Press QA Week 2021](https://www.youtube.com/watch?v=kz3Mt97L9CY) (English): the philosophy of having load tests as code and why k6 could be the best tool for the job.


## What if I want something more hands on?

Consider running a workshop for k6. Below is an outline of what that workshop could look like, as well as modules you could use for each topic. Feel free to take these and include the parts most relevant to you!

### I: Performance testing principles

- [Introduction to Performance Testing](Modules/Introduction%20to%20Performance%20Testing.md)
- [Load testing](Modules/Load%20Testing.md)
- [High-level overview of the load testing process](Modules/High-level%20overview%20of%20the%20load%20testing%20process.md)

### II: k6 Foundations

- [Getting started with k6 OSS](Modules/Getting%20started%20with%20k6%20OSS.md)
- [The k6 CLI](Modules/The%20k6%20CLI.md)
- [Understanding k6 results](Modules/Understanding%20k6%20results.md)
- [Adding checks to your script](Modules/Adding%20checks%20to%20your%20script.md)
- [Adding think time using sleep](Modules/Adding%20think%20time%20using%20sleep.md)
- [k6 Load Test Options](Modules/k6%20Load%20Test%20Options.md)
- [Setting test criteria with thresholds](Modules/Setting%20test%20criteria%20with%20thresholds.md)
- [k6 results output options](Modules/k6%20results%20output%20options.md)
- [Recording a k6 script](Modules/Recording%20a%20k6%20script.md)

### III: k6 Intermediate

- [How to debug k6 load testing scripts](Modules/How%20to%20debug%20k6%20load%20testing%20scripts.md)
- [Dynamic correlation in k6](Modules/Dynamic%20correlation%20in%20k6.md)
- [Workload modeling](Modules/Workload%20modeling.md)
- [Adding test data](Modules/Adding%20test%20data.md)
- [Parallel requests in k6](Modules/Parallel%20requests%20in%20k6.md)
- [Organizing code in k6 by transaction - groups and tags](Modules/Organizing%20code%20in%20k6%20by%20transaction%20-%20groups%20and%20tags.md)
- [Setup and Teardown functions](Modules/Setup%20and%20Teardown%20functions.md)
- [Setting load profiles with executors](Modules/Setting%20load%20profiles%20with%20executors.md)
- [Using execution context variables](Modules/Using%20execution%20context%20variables.md)
- [Creating and using custom metrics](Modules/Creating%20and%20using%20custom%20metrics.md)

