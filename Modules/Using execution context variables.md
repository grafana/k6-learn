# Using execution context variables

In the previous sections, you learned how to make your k6 scripts [more realistic](Making%20scripts%20realistic.md) by using executors and scenarios to better simulate traffic from real users of your application. Bringing your scripts closer to production traffic makes your test results more accurate.

However, you may quickly find that ramping your scripts up across multiple virtual users, scenarios, and instances may also lead to increased difficulty in understanding your results. When the script reports an error, for example, how do you trace it down to the VU that encountered it?

An execution context variable stores information about how the test is running. It functions a bit like an [environment variable](Modules/Environment%20variables), but one that is predetermined by k6 and is specific to the current execution state. In k6, these variables are included in the `k6/execution` module.

## Types of execution context variables

The `k6/execution` module contains many properties that you can call in your tests. They can be categorized according to which of the following they provide information about:
- Instance
- Scenario
- Test
- VU

Each of the four types above is an object in the `k6/execution` module.

The **instance** object stores information about each load generator, or the machine that the k6 process is running on.

The **scenario** object holds information about the load profile, such as which scenario and executor is being executed.

The **test** object allows you to abort the test execution with an optional error message.

The **VU** object assigns a unique number to every iteration and every VU in the load generator.

To learn more about the `k6/execution` module, [click here.](https://k6.io/docs/javascript-api/k6-execution/).

## Use cases for execution context variables

You can use execution context variables to do the following things:
- [Use unique data](https://k6.io/docs/examples/data-parameterization/#retrieving-unique-data)
- [Add conditional logic for scenarios](https://k6.io/docs/javascript-api/k6-execution/#script-naming)
- [Define when to abort a test](https://k6.io/docs/javascript-api/k6-execution/#test-abort)
- [Improved logging on errors](https://k6.io/docs/javascript-api/k6-execution/#timing-operations)
- [Adding tags to VUs and retrieving them](https://k6.io/docs/javascript-api/k6-execution/#tags)




## Test your knowledge

### Question 1



A: 

B: 

C: 

### Question 2



A: 

B: 

C: 

### Question 3



A: 

B: 

C: 

### Answers

