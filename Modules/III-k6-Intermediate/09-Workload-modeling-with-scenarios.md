# Workload modeling with scenarios

In [Workload modeling](03-Workload-modeling.md), we mentioned that one of the challenges is that user flows can be complex. A single test may need to cover multiple end-to-end flows simultaneously. For example, in a storefront application, we may have several members browsing products while many others (hopefully!) are adding items to their cart. To help organize these various flows, the k6 team has created [scenarios](https://k6.io/docs/using-k6/scenarios/).

With _scenarios_, script authors may create distinct flows having different execution patterns and environment settings. Scenarios can be executed in parallel or staggered using time offsets with the `startTime` option.

By breaking down each of your flows into a different scenario, your overarching script can be more streamlined with logic that is easier to follow. From our storefront example, one scenario would be users populating a shopping cart and placing orders. Another scenario would represent other customers who may be searching for the availability of certain products. Each workflow could be complex; keeping them separate makes script maintenance easier.

## Defining scenarios

Each _scenario_ includes the same [elements of a workload model](03-Workload-modeling.md#Elements-of-a-workload-model) in addition to the `executor`, `startTime`, and optionally `env` variables and `tags` exclusive to the _scenario_.

Save the following script as `playground.js`.

```javascript
import { sleep } from 'k6';

export const options = {
    scenarios: {
        // Scenario 1: Users browsing through our product catalog
        users_browsing_products: {
            executor: 'shared-iterations', // name of the executor to use
            env: { WORKFLOW: 'browsing' }, // environment variable for the workflow

            // executor-specific configuration
            vus: 3,
            iterations: 10,
            maxDuration: '10s',
        },
        // Scenario 2: Users adding items to their cart and checking out
        users_buying_products: {
            executor: 'per-vu-iterations', // name of the executor to use
            exec: 'usersBuyingProducts', // js function for the purchasing workflow
            env: { WORKFLOW: 'buying' }, // environment variable for the workflow
            startTime: '2s', // delay start of purchasing workflow
            
            // executor-specific configuration
            vus: 3,
            iterations: 1,
            maxDuration: '10s',
        },
    },
};

export default function () {
  // Model your workflow for searching through products
  console.log(`[VU: ${__VU}, iteration: ${__ITER}, workflow: ${__ENV.WORKFLOW}] Just looking!!!`);
  sleep(1);
}

export function usersBuyingProducts() {
  // Model your workflow for adding items to cart and checking out
  console.log(`[VU: ${__VU}, iteration: ${__ITER}, workflow: ${__ENV.WORKFLOW}] CHA-CHING!!!`);
  sleep(1);
}
```

Running the script as `k6 run playground.js` will produce results similar to the following:

```plain
$ k6 run playground.js

          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: playground.js
     output: -

  scenarios: (100.00%) 2 scenarios, 6 max VUs, 42s max duration (incl. graceful stop):
           * users_browsing_products: 10 iterations shared among 3 VUs (maxDuration: 10s, gracefulStop: 30s)
           * users_buying_products: 1 iterations for each of 3 VUs (maxDuration: 10s, exec: usersBuyingProducts, startTime: 2s, gracefulStop: 30s)

INFO[0000] [VU: 4, iteration: 0, workflow: browsing] Just looking!!!  source=console
INFO[0000] [VU: 1, iteration: 0, workflow: browsing] Just looking!!!  source=console
...
INFO[0002] [VU: 1, iteration: 2, workflow: browsing] Just looking!!!  source=console
INFO[0002] [VU: 5, iteration: 0, workflow: buying] CHA-CHING!!!  source=console
INFO[0003] [VU: 4, iteration: 3, workflow: browsing] Just looking!!!  source=console

running (04.0s), 0/6 VUs, 13 complete and 0 interrupted iterations
users_browsing_products ✓ [======================================] 3 VUs  04.0s/10s  10/10 shared iters
users_buying_products   ✓ [======================================] 3 VUs  01.0s/10s  3/3 iters, 1 per VU
```

Viewing the results, you should notice that users are browsing products, then after an initial delay, we have another user making purchases.

## Configuration options

Our example used a minimal number of configuration options for the _scenarios_, but the available options include the following:

> Remember that additional options may be required depending upon the `executor` specified. See [setting load profiles with executors](08-Setting-load-profiles-with-executors/Setting-load-profiles-with-executors.md) for more about _executors_.

| Option         | Description                                                                                       | Default      |
|----------------|---------------------------------------------------------------------------------------------------|--------------|
| **`executor`** | Specific [executor](https://k6.io/docs/using-k6/scenarios/#executors) to "shape" traffic patterns | - (required) |
| `env`          | Environment variables specific to the scenario                                                    | `{}`         | 
| `exec`         | Name of the exported JS function to execute for the scenario                                      | `"default"`  | 
| `gracefulStop` | Time period to allow an iteration to complete before being forcefully terminated                  | `"30s"`      |
| `startTime`    | Time offset within the test to begin the scenario                                                 | `"0s"`       |
| `tags`         | Tags specific to the scenario                                                                     | `{}`         | 

Looking more closely at our example, we created two scenarios: `users_browsing_products` and `users_buying_products`.

The idea for the `users_browsing_products` scenario is to create some _background activity_ for our test. We use the `shared-iterations` executor to simulate three users browsing the product catalog. We're limiting this activity to 10 iterations and ensure our script lasts no longer than 10 seconds. The `env` option sets the `WORKFLOW` environment variable to `browsing`, which can be used within our JavaScript to provide some execution context. Because we are _not_ specifying the `exec` option, our scenario will execute whichever JavaScript function is the `default`.

`users_buying_products` is our second scenario to simulate three different users making a purchase. This scenario uses the `per-vu-iterations` to control the activity. The scenario specifies `exec: 'usersBuyingProducts'` to call our purchasing logic for each scenario iteration. As with the previous scenario, we inject the `WORKFLOW` environment variable to provide the script with some context for the scenario. This time, however, we specify `startTime: '2s'` to define a delay for the scenario to begin; this gives the `users_browsing_products` a "head start" to create our background activity before we start having users making purchases.

## Test your knowledge

### Question 1
_True_ or _False_, you can think of scenarios as layers of activity within a more extensive test? 

### Question 2
_True_ or _False_, you must specify the `exec` option for each scenario?

### Question 3
_True_ or _False_, the `exec` option determines traffic _shape_ for a scenario?

### Answers
1. True. Each scenario acts independently yet can be affected by other scenarios. From our example, we defined user browsing activity in the _background_, then having users making purchases in the _foreground_.
2. False. While explicitly configuring the `exec` option would be advisable, it is _not_ required. Multiple scenarios configured without the `exec` option result in each executing the same `default` function, which may be confusing.
3. False. The `executor` ultimately defines the pattern of the load profile for your scenario. The `exec` denotes which JavaScript function executes for each iteration of your scenario.
