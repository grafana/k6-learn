# Setup and Teardown functions

So far, you've been putting most of the code within the `default` function. All code within the default function is called **VU code**, because it is code that every virtual user executes and repeats until the end of the test.

Unless you specify a number of virtual users and a test duration in [the test options](../II-k6-Foundations/06-k6-Load-Test-Options.md), k6 runs your script once with one iteration and one virtual user. But what happens when you set a test duration of, say, one minute?

```js
import { sleep } from 'k6'

export const options = {
	duration: '1m',
}

export default function () {

	console.log("An iteration was executed");
	sleep(1);

}


```

If you run the test above, you'll notice the following lines in the output:

```plain
INFO[0000] An iteration was executed                     source=console
INFO[0001] An iteration was executed                     source=console
INFO[0002] An iteration was executed                     source=console
INFO[0003] An iteration was executed                     source=console
INFO[0004] An iteration was executed                     source=console
INFO[0005] An iteration was executed                     source=console
INFO[0006] An iteration was executed                     source=console
INFO[0007] An iteration was executed                     source=console
INFO[0008] An iteration was executed                     source=console
...
...
running (1m00.0s), 0/1 VUs, 60 complete and 0 interrupted iterations
```

Each of these lines represents one iteration - a single execution of the VU code.

Since k6 repeatedly executes everything inside the default function, you can plan your scripts accordingly. For example, there's no need to loop code within the default function now that you know that the entire function will be repeated throughout the test.

However, putting ALL code within the default function can also be detrimental to your test.

## Issues with iterating all code

Repeating all the code within the default function can be unnecessarily resource-intensive, especially if your script involves the following:
- Generating or reading from large data files
- Test data preparation, such as creating user accounts that the tests will use
- Initializing imported libraries

Another issue that might arise from putting all the code in the default function has to do with the business process you're trying to test. 

If the focus of your test scenario is an action that requires a login, such as a new user portal page, you may not necessarily care about repeating the login on every iteration. In fact, repeatedly logging in and logging out might cause test user accounts to be locked out by the application's security policies.

You may also want to execute some code only after the entire test. A common use case for this is removing any unnecessary data that the test may have generated. For example, you may want to remove all remaining items in a cart, or delete an account. Insufficient test data management may degrade your test environment over time and lead to misleading load test results.

## Where should you put what code?

In k6, where you put your code changes when and how often that code is executed.

```js
// This is init code. It runs once per VU before VU code, once before setup, and once before teardown.

export function setup() {
    // This is setup code. It runs once at the beginning of the test, regardless of the number of VUs.
}

export default function () {

     // This is VU code. It runs repeatedly until the test is stopped.
}

export function teardown() {
    // This is teardown code. It runs once at the end of the test, regardless of the number of VUs.
}
```

### Init

Code in the global scope is called init code, and it is executed:
- Once when each VU is initialized, before anything in the default function
- Once before the `setup()` function
- Once before the `teardown()` function

You can think of this section as a place to make any preparations you need before you run the first iteration per user.

Here are some things that you may want to put in init code:
- Declaration of variables that you may want to reuse between iterations of a single VU or across VUs (such as a [Shared Array](04-Adding-test-data.md#Shared-Array))
- A [k6 Load Test Options](../II-k6-Foundations/06-k6-Load-Test-Options.md) object where you can set the parameters of the test

Not all k6 features are available for use in the init section; for example, you cannot make HTTP requests within init code.

### Setup

```js
export function setup() {
    // This is setup code. It runs once at the beginning of the test, regardless of the number of VUs.
}
```

The setup function is a helper function where you can put code that needs to be executed only once across all VUs, before any VU code. It is executed right after the init code.

Here are some things that you may want to do during setup:
- Checking that the test environment is in an expected state
- Generating test data that multiple VUs will use (this data can then be passed onto other functions)
- Setting expected HTTP response codes for the rest of the test via [`setResponseCallback()`](https://k6.io/docs/javascript-api/k6-http/setresponsecallback-callback/)

Anything returned in the setup function will be saved and can be passed on to the default and teardown functions like this:

The full k6 API is available during setup, including making HTTP requests.

### Teardown

```js
export function teardown() {
    // This is teardown code. It runs once at the end of the test, regardless of the number of VUs.
}
```

The teardown function is similar to the setup function in that it runs only once per test (not per VU), but it runs at the _end_ of the test. Any teardown code will be the last to be executed by k6 before test results are generated.

If the `setup()` function ends abnormally, the `teardown()` function isn't called. Consider adding logic to the setup for proper cleanup if necessary. 

Here are some things you might want to do during teardown:
- Logging out any active users
- Deleting test data generated during test execution
- Putting the test environment back to the state it was in before the test

The full k6 API is available during teardown, including making HTTP requests.

```js
export function setup() {
  return { v: 1 };
}

export default function (data) {
  console.log(JSON.stringify(data));
}

export function teardown(data) {
  if (data.v != 1) {
    throw new Error('incorrect data: ' + JSON.stringify(data));
  }
}
```

Check the [test lifecycle documentation](https://k6.io/docs/using-k6/test-lifecycle/) for more details.

## Setup and teardown while debugging

You may want to skip setup and teardown in some situations, such as when you're debugging your script or running a small shakeout test that doesn't require data generation.

You can skip these functions using the CLI like this:

```shell
k6 run test.js --no-setup --no-teardown
```

### Setup/teardown per VU

The setup and teardown helper functions run once per TEST, not per VU. What if you want to run certain code at the beginning or at the end of every VU?

#### Before each VU

You can declare a variable in the init code that you can use to run code only on the first iteration of a VU like this:

```js
// This is init code. It runs once per VU before VU code, once before setup, and once before teardown.

let isFirstIteration = true;

export function setup() {
    // This is setup code. It runs once at the beginning of the test, regardless of the number of VUs.
}

export default function () {
    if (isFirstIteration) {
        // This code runs only once per VU, after the setup code but before the rest of the VU code.
		isFirstIteration = false;
    }

     // This is VU code. It runs repeatedly until the test is stopped.
}
```

You can use this approach to log in with a user account only once, and then iterate through actions after authentication.

#### After each VU

If you know exactly how many iterations you want your test to run, you can apply the same approach involving the variable in init code to run code per VU, just before going to the teardown function. You could also include VU code that is conditional on the relative time that the test has been running.

However, you might not always know how many iterations your test will run or how long it will run for. For those situations, the best option is to use the teardown function instead.

Below is an example of how this might work in a situation where you'd like to choose a random user account, log in once per VU, and then log out all user accounts:

```js
import { sleep } from 'k6'
// This is init code. It runs once per VU before VU code, once before setup, and once before teardown.

let counter = 0;
let usernames = ['user1', 'user2', 'user3', 'user4', 'user5', 'user6', 'user7', 'user8', 'user9', 'user10'];
let passwords = ['password1', 'password2', 'password3', 'password4', 'password5', 'password6', 'password7', 'password8', 'password9', 'password10'];
let rand = Math.floor(Math.random() * usernames.length);
let username = usernames[rand];
let password = passwords[rand];
console.log(`VU#${__VU} - username: ${username}, password: ${password}`);

export function setup() {
    // This is setup code. It runs once at the beginning of the test, regardless of the number of VUs.
}

export default function () {
    if (counter === 0) {
        // This code runs only once per VU, after the setup code but before the rest of the VU code.
        console.log(`This is the first iteration of VU#${__VU} using username ${username} and password ${password}`);
    }
    counter++;

     // This is VU code. It runs repeatedly until the test is stopped.
     console.log(`This is iteration #${counter} of VU#${__VU} using username ${username} and password ${password}`);

     sleep(1);
}

export function teardown() {
    // This is teardown code. It runs once at the end of the test, regardless of the number of VUs.

    for (let i = 0; i < usernames.length; i++) {
        console.log(`Check if logged in, and if so, log out username ${usernames[i]} and password ${passwords[i]}`);
    }
}
```

## Test your knowledge

### Question 1

Which function is typically executed the most number of times in a full load test?

A: The default function

B: The setup function

C: The teardown function

### Question 2

A k6 test runs 100 VUs for 30 minutes. Assuming the test script contains a setup function, how many times would you expect the setup function to have been executed?

A: 100

B: 1

C: 30

### Question 3

A test script has setup, default, and teardown functions and runs with 1 VU for 1 iteration. How many times would you expect the init code to be executed?

A: 1

B: 3

C: 5

### Answers

1. A. The setup and teardown functions are deliberately executed only once per test (at the beginning and at the end, respectively). Meanwhile, the default function is what is repeatedly executed.
2. B. The setup function is only executed once, at the beginning of the test.
3. B. Init code (code in the global scope) is executed once per VU, once before setup, and once before teardown.