There are multiple other ways to test with k6, relying more or less on the HTTP protocol. However, these additional use cases are, with the exception of websockets and gRPC, not included in the default k6 binary but has to be added to a bespoke binary created with the xk6 tool.

Some additional clients available as xk6 extension are:

- [Kafka]()
- [SQL]()
- [Prometheus Remote Write]