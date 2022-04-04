# Setting Load Profiles with Executors

One of the more complicated aspects of testing is modeling your desired load profile. These profiles define the volume and velocity of requests coming into the system being tested. k6 provides a set of [executors](https://k6.io/docs/using-k6/scenarios/executors/) to shape the execution patterns for your tests.

> :point_up: An important point to keep in mind is that each executor controls the number of VUs and/or the number--or even rate--of iterations per testing cycle.

### Shared Iterations
_Shared Iterations_ is the most basic of the executors. As can be inferred from the name, the primary focus will be the number of _iterations_ for your test; this is the number of times your test function will be run.

| Option        | Description                                                   | Default |
|---------------|---------------------------------------------------------------|---------|
| `iterations`  | How many times should your test execute?                      | `1`     |
| `maxDuration` | Forcibly stop your test if not finished within this timeframe | `"10m"` |
| `vus`         | Number of virtual users to run concurrently                   | `1`     |

As noted above, the primary objective is to perform your test `iterations` number of times, over a time period not to exceed `maxDuration`. At any time during the test scenario, there should be `vus` iteration(s) happening unless the total desired iterations has been reached. In this scenario, it is possible for some VUs to perform more work than others.

[Experiment with _Shared Iterations_ for yourself!](Executors/Shared%20Iterations%20Exercises.md)

### Per VU Iterations
_Per VU Iterations_ is a slight evolution on the _Shared Iterations_ executor. With this executor, we're still focused on the number of _iterations_, however, this time we want **each _virtual user_** to execute the **same amount** of iterations.

| Option        | Description                                                   | Default |
|---------------|---------------------------------------------------------------|---------|
| `iterations`  | For each VU, how many times should your test execute?         | `1`     |
| `maxDuration` | Forcibly stop your test if not finished within this timeframe | `"10m"` |
| `vus`         | Number of virtual users to run concurrently                   | `1`     |

In this case, we're looking for each of the `vus` VU(s) to perform your test `iterations` number of times over a time period not to exceed `maxDuration`. This is means that test iterations are _fairly_ distributed; no single VU performs more than another.

[Experiment with _Per VU Iterations_ for yourself!](Executors/Per%20VU%20Iterations%20Exercises.md)

### Constant VUs
_Constant VUs_ focuses on continually performing your test over a specified amount of time. This allows each virtual user to perform as many requests as it can within the allowed timeframe.

| Option          | Description                                | Default      |
|-----------------|--------------------------------------------|--------------|
| **`duration`** | Overall scenario duration                   | - (required) |
| `vus`          | Number of virtual users to run concurrently | `1`          |

As noted above, the primary objective is for each of the `vus` VU(s) to perform as many test iterations as possible for the required `duration` time-period, e.g. `"30s"`, `"1h"`, etc.

[Experiment with _Constant VUs_ for yourself!](Executors/Constant%20VUs%20Exercises.md)

### Ramping VUs
_Ramping VUs_ is an evolution of the _Constant VUs_ executor which introduces **_stages_**. This allows k6 to transition the number of desired VUs from one stage to another. Each stage defines its own timeframe for which all VUs will continually perform your test.

| Option             | Description                                                                             | Default      |
|--------------------|-----------------------------------------------------------------------------------------|--------------|
| **`stages`**       | Consists of a time `duration` and `target` for the number of desired VUs                | - (required) |
| `gracefulRampDown` | Grace period for a test iteration to finish before shutting down a VU when ramping down | `"30s"`      |
| `startVUs`         | Number of virtual users at the beginning of test                                        | `1`          |

A time-based scenario, the total duration is equal to the sum of `duration` timeframe(s) from each `stage`. The first stage will begin with `startVUs` VU(s) and ramp up (or down) linearly over the configured `duration` to the `target` number of VUs specified within the stage. The next stage, if configured, will then ramp up or down from that point to the desired `target` VU(s) over the specified `duration` timeframe. This pattern continues for each remaining stage. As with _Constant VUs_, each running VU will continually perform test iterations until the scenario ends.

[Experiment with _Ramping VUs_ for yourself!](Executors/Ramping%20VUs%20Exercises.md)

### Constant Arrival Rate
With the _Constant Arrival Rate_, we now start to focus on the rate at which your test iterations are performed over a prescribed period of time. k6 will dynamically adjust the number of VUs to achieve the desired rate.

| Option                | Description                                                     | Default      |
|-----------------------|-----------------------------------------------------------------|--------------|
| **`duration`**        | Overall scenario duration                                       | - (required) |
| **`preAllocatedVUs`** | Number of virtual users at the beginning of test                | - (required) |
| **`rate`**            | Desired iterations per `timeUnit` to be achieved and maintained | - (required) |
| `maxVUs`              | Maximum number of virtual users allowed to be utilized          | - (no limit) |
| `timeUnit`            | Duration to which the desired `rate` applies                    | `"1s"`       |

Our primary focus will be to achieve and maintain an _iteration rate_ of `rate` per `timeUnit` over the desired `duration`. The number of VUs to achieve the desired rate will be managed by k6, and will be anywhere from `preAllocatedVUs` to `maxVUs`. Note that there is time and resource overhead associated with VU creation, so defining a reasonable `preAllocatedVUs` will allow for more testing time at the desired rate. 

[Experiment with _Constant Arrival Rate_ for yourself!](Executors/Constant%20Arrival%20Rate%20Exercises.md)

### Ramping Arrival Rate
_Ramping Arrival Rate_ is an evolution of the _Constant Arrival Rate_ executor which introduces **_stages_**. This is probably the best candidate for modeling real-world testing scenarios, allowing k6 to transition the desired _iteration rate_ from one stage to another. Each stage defines its own timeframe for which to achieve the desired rate.

| Option                | Description                                                                          | Default      |
|-----------------------|--------------------------------------------------------------------------------------|--------------|
| **`preAllocatedVUs`** | Number of virtual users at the beginning of test                                     | - (required) |
| **`stages`**          | Consists of a time `duration` and `target` for the desired iterations per `timeUnit` | - (required) |
| `maxVUs`              | Maximum number of virtual users allowed to be utilized                               | - (no limit) |
| `startRate`           | Desired iterations per `timeUnit` to be achieved and maintained                      | `0`          |
| `timeUnit`            | Duration to which the desired `rate` applies                                         | `"1s"`       |

Similar to the _Constant Arrival Rate_, the main focus is achieving a target _iteration rate_. The primary difference being the desired rate is achieved within each defined `stage`. The overall duration will be equal to the sum of `duration` timeframe(s) from each `stage`. The first stage will begin with an _iteration rate_ of `startRate` per `timeUnit` performed by `preAllocatedVUs` virtual user(s). The _iteration rate_ will ramp up (or down) linearly over the configured `duration` to the `target` rate specified for the stage. The next stage, if configured, will then ramp up or down from that point to the desired `target` rate over the specified `duration` timeframe. This pattern continues for each remaining stage. _Spikes_, _valleys_, and _plateaus_ can be simulated with these stages.

[Experiment with _Ramping Arrival Rate_ for yourself!](Executors/Ramping%20Arrival%20Rate%20Exercises.md)

### Externally Controlled
_Externally Controlled_ is a completely different executor in that it does not alter the number of virtual users beyond starting the test and setting limits on VUs and duration. This is expected to be provided by external processes using either the k6 REST API or the k6 CLI.

| Option         | Description                                            | Default      |
|----------------|--------------------------------------------------------|--------------|
| **`duration`** | Overall scenario duration                              | - (required) |
| `maxVUs`       | Maximum number of virtual users allowed to be utilized | - (no limit) |
| `vus`          | Number of virtual users to run concurrently            | `0`          |

The primary objective for this executor is to define the `duration` timeframe of the test. If nothing else is provided, k6 will essentially be in a state of waiting for commands. If none are given, k6 will simply exit once the duration has been reached. If `vus` are specified with a non-zero value, the executor will run similar to the _Constant VUs_ until acted upon by an external actor. The `maxVUs` setting will put in place a limit to be enforced when receiving external requests to scale up.

[Experiment with _Externally Controlled_ for yourself!](Executors/Externally%20Controlled%20Exercises.md)

## Test your knowledge
See how well you understand the executors with the following quiz. Check your answers with the [answer key](#Answer%20Key) toward the bottom of the page.

### Question 1

A: `blah`

B: `blah`

C: `blah`

> :rocket: Want more? Check out the [k6 Office Hours](https://www.youtube.com/playlist?list=PLJdv3RhAQXNE1TFXn2pp9h_Ul1q_kJrEZ) session where we talked in depth about *Executors in k6*!
> <iframe width="560" height="315" src="https://www.youtube.com/embed/3AJLSH0Ifm4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

#### Answer Key
TODO Here will be the answers!!!
