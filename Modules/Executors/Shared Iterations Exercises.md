
## Run it yourself!

In order to conduct a test where we simulate 10 users
Applying these options to a script
```js
export const options = {
    scenarios: {
        k6_workshop: {
            executor: 'shared-iterations',
            iterations: 200,
            vus: 10,
            maxDuration: '10s',
        },
    },
};
```
When each iteration of the test takes approximately 500ms, the following pattern can be seen:

![](../images/executors/shared-iterations.png)
