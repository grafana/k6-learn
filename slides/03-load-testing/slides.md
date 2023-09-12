<style>
  .container {
    display: flex;
  }

  .col {
    flex: 1;
  }
</style>

## Load Testing

**Performance testing != Load testing**

---

## Common test parameters

_Test parameters_ include the distribution, shape, and pattern of the load.

- **Virtual users (VUs)**  
- **Iterations**
- **Throughput**
- **User flows**
- **Load profile**
- **Duration**

---

## How to simulate load

1. **Protocol-based load testing**
2. **Browser-based load testing**
3. **Hybrid load testing**

---

## Load test types

### Shakeout test

![](../../images/scenarios-shakeout.png) 
<!-- .element class="stretch" -->

---

### Average load test

![](../../images/test-scenario-average.png)
<!-- .element class="stretch" -->

---

### Stress test

![](../../images/test-scenario-stress.png)
<!-- .element class="stretch" -->

---

### Soak or endurance test

![](../../images/test-scenario-soak.png)
<!-- .element class="stretch" -->

---

### Spike test

![](../../images/test-scenario-spike-test.png)
<!-- .element class="stretch" -->

---

### Breakpoint test

![](../../images/test-scenarios-breakpoint.png)
<!-- .element class="stretch" -->

---

## Load testing process

<div class="container">
  <div class="col">

  ### High level overview

  - Planning for load testing
  - Scripting a load test
  - Executing load tests
  - Analysis of load testing results  

  </div>

  <div class="col">

  ![Continuous Testing Snowball](../../images/continuous-testing-snowball.png)

  </div>
</div>

---

## k6 OSS

- Move to: [04-getting-started-with-k6-oss](?p=04-getting-started-with-k6-oss)
