So you're ready to create your first k6 load testing script! Before you do that, let's talk about your options.

<iframe width="560" height="315" src="https://www.youtube.com/embed/ncxCIuo5tUU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
_Video overview of what k6 is and the differences between k6 OSS and k6 Cloud_

## k6 Open Source Software (OSS) vs k6 Cloud

There are two ways for you to start creating your test script from scratch: k6 OSS and k6 Cloud. k6 OSS is a free, open-source tool for generating load. k6 Cloud is a Software as a Service (SaaS) platform that uses the same tool, k6 OSS, but also adds features such as on-demand cloud infrastructure, real-time dashboards, and integrations. You can view a more detailed comparison of k6 OSS and k6 Cloud [on this page](https://k6.io/oss-vs-cloud/).

k6 OSS is better for you in these situations:
- You want to try out k6 and learn how to use it.
- You want to generate load locally, or within a private network.
- You don't need distributed execution, or you're willing to set up the [k6 operator](https://github.com/grafana/k6-operator) to run distributed tests.
- You don't mind scripting in JavaScript.

k6 Cloud is better for you in these situations:
- You want the most friction-free experience in running a load test (no coding required).
- You need distributed execution, either due to number of users or requirements for loadge generated from various geographical regions.
- You want real-time dashboards showing load testing results as the test is running.
- You want to share k6 results with your team.

In this workshop, you'll learn how to use both k6 OSS and k6 Cloud. You will get started with your first k6 script on k6 OSS, but you'll also learn how to incorporate k6 Cloud later on.

<iframe width="560" height="315" src="https://www.youtube.com/embed/zcYeboT5FYE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

