# Using execution context variables

In the previous sections, you learned how to make your k6 scripts [more realistic](03-Workload-modeling.md) by using executors and scenarios to better simulate traffic from real users of your application. Bringing your scripts closer to production traffic makes your test results more accurate.

However, you may quickly find that ramping your scripts up across multiple virtual users, scenarios, and instances may also lead to increased difficulty in understanding your results. When the script reports an error, for example, how do you trace it down to the VU that encountered it?

An execution context variable stores information about how the test is running. It functions a bit like an environment variable, but one that is predetermined by k6 and is specific to the current execution state. In k6, these variables are included in the `k6/execution` module.

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

To learn more about the `k6/execution` module, [click here](https://k6.io/docs/javascript-api/k6-execution/).

## Generating unique data

Imagine that you want to write a k6 script that will log into a web application. However, the application has security measures that don't allow multiple simultaneous logins for the same account. This feature causes HTTP 403 Forbidden errors when the second k6 VU logs in while the first VU is still logged in. One or both VUs could be signed out.

What can you do to prevent this? You could ensure assign a unique login to each VU, so that only that VU will ever attempt to log in to that user account. To create a unique login, you could take advantage of an identifier that you can guarantee will be unique per VU across the entire test: `vu.idInTest`, an execution context variable.

First, create a CSV file of usernames and passwords in this format:

```plain
username,password
user01,123
user02,234
user03,345
user04,456
user05,567
user06,678
user07,789
user08,890
user09,901
user10,012
```

Save the file as `/data/users-unique.csv`. Make sure that all of these are valid credentials for your application under test.

Second, write a k6 script that uses `users-unique.csv`. The example script below contains a log statement rather than an actual login, to make it easier to understand what's happening.

```js
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import { SharedArray } from 'k6/data';
import { vu } from 'k6/execution';
import { sleep } from 'k6';

const users = new SharedArray("Logins", function() {
    let data = papaparse.parse(open('./data/users-unique.csv'), { header: true }).data;
    return data;
});

export const options = {
    scenarios: {
        login: {
            executor: 'per-vu-iterations',
            vus: users.length,
            iterations: 1,
        },
    },
};

export default function () {
    console.log('VU: ' + vu.idInTest + ' / username: ', users[vu.idInTest - 1].username, ' / password: ', users[vu.idInTest - 1].password);
    sleep(1);
}
```

Let's go over what the script is doing step by step.

There are three objects being imported by the script:
- `papaparse` allows the use of a [CSV file as test data](04-Adding-test-data.md#CSV-Files)
- `SharedArray` distributes lines of the CSV file only as needed by each VU to [conserve resources](04-Adding-test-data.md#Shared-Array)
- `vu` gives you access to the unique identifier for each VU
- `sleep` lets you use delays in the script

These lines set up the shared array to use a CSV file - the `users-unique.csv` file that you created earlier:

```js
const users = new SharedArray("Logins", function() {
    let data = papaparse.parse(open('./data/users-unique.csv'), { header: true }).data;
    return data;
});
```

> :warning: **Set header to true**. Note that the `header: true` option is necessary in this case, because the first line in the CSV file you created defines the names of the columns in the data file (`username,password`).

The next few lines define [options and parameters](../II-k6-Foundations/06-k6-Load-Test-Options.md) for the test:

```js
export const options = {
    scenarios: {
        login: {
            executor: 'per-vu-iterations',
            vus: users.length,
            iterations: 1,
        },
    },
};
```

The number of VUs is set to `users.length` to ensure that there will be one VU per line in the CSV file. This setting automatically disregards the header line. Since there are 11 lines in the CSV and the first is a header, you can expect 10 VUs to be executed once each.

Now comes the bulk of the test:

```js
export default function () {
    console.log('VU: ' + vu.idInTest + ' / username: ', users[vu.idInTest - 1].username, ' / password: ', users[vu.idInTest - 1].password);
    sleep(1);
}
```

This function consists of a log statement and a sleep. The log statement is the stand-in for a login function; instead of logging in with a user, the script instructs k6 to print the current VU's `idInTest`, which is a globally unique identifier. k6 then prints the username and password selected for that VU.

> :point_up: **Why `idInTest - 1`?**
> You may have noticed that while `vu.idInTest` is used when printing the the identifier, `vu.idInTest - 1` is used to select the username and password from the CSV file.
> This difference is due to the fact that arrays start with 0 while `idInTest` starts with 1. In this example, the array elements corresponding to the rows in the CSV are `0,1,2,3,4,5,6,7,8,9` while the `idInTest`s for each VU are `1,2,3,4,5,6,7,8,9,10`.

Finally, save the script as `script.js` and run it: `k6 run script.js`.

```plain
INFO[0000] VU: 10 / username:  user10  / password:  012  source=console
INFO[0000] VU: 5 / username:  user05  / password:  567   source=console
INFO[0000] VU: 6 / username:  user06  / password:  678   source=console
INFO[0000] VU: 9 / username:  user09  / password:  901   source=console
INFO[0000] VU: 4 / username:  user04  / password:  456   source=console
INFO[0000] VU: 1 / username:  user01  / password:  123   source=console
INFO[0000] VU: 8 / username:  user08  / password:  890   source=console
INFO[0000] VU: 2 / username:  user02  / password:  234   source=console
INFO[0000] VU: 3 / username:  user03  / password:  345   source=console
INFO[0000] VU: 7 / username:  user07  / password:  789   source=console
```

Based on the script output above, you can verify that:
- 10 VUs are executed once each, as per the number of non-header lines in the CSV file
- Each VU uses only the username and password assigned to it
- The `idInTest` for each VU is globally unique.

Data collision can be a big problem when you ramp up your k6 test to extend over multiple VUs, scenarios, and instances. Using execution context variables as demonstrated here helps prevent errors due to scripting that may impede your test from reaching the desired level of load.

## Other use cases for execution context variables

You can also use execution context variables to do the following things:
- [Add conditional logic for scenarios](https://k6.io/docs/javascript-api/k6-execution/#script-naming)
- [Define when to abort a test](https://k6.io/docs/javascript-api/k6-execution/#test-abort)
- [Improved logging on errors](https://k6.io/docs/javascript-api/k6-execution/#timing-operations)
- [Adding tags to VUs and retrieving them](https://k6.io/docs/javascript-api/k6-execution/#tags)


## Test your knowledge

### Question 1

In which situation might it be helpful to use an execution context variable?

A: You have a large data file, but want to ensure that no duplicate data is selected across VUs.

B: You want to run a k6 script but set the number of VUs from the command line.

C: You want to specify the executor that a scenario uses.

### Question 2

A test script defines 10 VUs, each of which does 2 iterations. How many unique values of `vu.idInTest` would you expect to exist for this test?

A: 20.

B: 10.

C: It depends on how many instances the test is executed on.

### Question 3

Which of the following execution context objects would you use to retrieve information about the currently running executor?

A: `scenario`

B: `vu`

C: `test`

### Answers

1. A. You can prevent data collision by using a unique identifier like `vu.idInTest`. B is incorrect because you set the number of VUs from the command line using [CLI flags](../II-k6-Foundations/02-The-k6-CLI.md), and C is incorrect because the way to select an executor is [from the script](08-Setting-load-profiles-with-executors.md).
2. B. `vu.idInTest` is assigned per VU, not per iteration.
3. A. `scenario` holds information about the executor that is being used.