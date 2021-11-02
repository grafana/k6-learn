At its core, k6 is a tool mainly built for protocol-level testing of APIs. For users to be able to do this testing, it exposes a batteries-included HTTP client, which is instrumented by default to generate the metrics most commonly sought after while load testing.

- [HTTP Requests - Hello, world!](HTTP%20Requests%20-%20Hello,%20world!.md) (approx. 5 min reading time)
- [HTTP Requests - Metrics](HTTP%20Requests%20-%20Metrics.md)
- [HTTP Requests - Batching Requests](HTTP%20Requests%20-%20Batching%20Requests.md)
- [HTTP Requests - Additional Protocols](HTTP%20Requests%20-%20Additional%20Protocols)
#todo

### Additional protocols

There are multiple other ways to test with k6, relying more or less on the HTTP protocol. However, these additional use cases are, with the exception of websockets and gRPC, not included in the default k6 binary but has to be added to a bespoke binary created with the xk6 tool.

Some additional clients available as xk6 extension are:

- [Kafka]()
- [SQL]()
- [Prometheus Remote Write]