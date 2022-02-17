Up until now, you've been running the same script with a single VU and a single iteration. In this section, you'll learn how to scale that out and run a full-sized load test against your application.

Test options are configuration values that affect how your test script is executed, such as the number of VUs or iterations, the duration of your test, and more. They are also sometimes called "test parameters".

k6 comes with some default test options, but there are four different ways to change the test parameters for a script:
1. You can include command-line flags when running a k6 script (such as `k6 run --vus 10 --iterations 30`).
2. You can define [environment variables](https://k6.io/docs/using-k6/environment-variables/) on the command-line that are passed to the script.
3. You can define them within the test script itself.
4. You can include a configuration file.

For now, you'll learn to do the third option: defining test parameters within the script itself. The advantages of this approach are:
- Simplicity: no extra files or commands are required.
- Repeatability: Adding these parameters to the script make it easier for a colleague to run tests you've written.
- Version controllability: Changes to the test parameters can be tracked along with test code.

To use test options within a script, add the following lines to your script. By convention, it's best to add it after the import statements and before the default function, so that the options are easily read upon opening the script:

```js
export let options = {
  vus: 10,
  iterations: 40,
};
```

You can set multiple options within this function, but make sure you end each one with a `,`.

## VUs

```js
vus: 10,
```

In this line, you can change the number of virtual users that k6 will run.

Note that if you only define VUs and no other test options, you may get the following error:

```plain
          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

WARN[0000] the `vus=10` option will be ignored, it only works in conjunction with `iterations`, `duration`, or `stages` 
  execution: local
     script: test.js
     output: -
```

If you set the number of VUs, you will need to additionally specify how long those users should be executed for, using one of the following ways:
- iterations
- durations
- stages

## Iterations

```js
  vus: 10,
  iterations: 40,
```

Setting the number of iterations in test options defines it for *all* users. In the example above, the test will run for a total of 40 iterations, with each of the 10 users executing the script exactly 4 times.

## Duration

```js
  vus: 10,
  duration: '2m'
```

Setting the duration instructs k6 to repeat (iterate) the script for each of the specified number of users until the duration is reached.

Duration can be set using `h` for hours, `m` for minutes, and `s` for seconds, like these examples:
- `duration: '1h30m'`
- `duration: '30s'`
- `duration: '5m30s'`

If you set duration but don't specify a number of VUs, k6 will use the default VU number of 1.

If you set the duration in conjunction with setting the number of iterations, the value that ends earlier is used. For example, given the following options:

```js
  vus: 10,
  duration: '5m',
  iterations: 40,
```

k6 will execute the test for 40 iterations or 5 minutes, *whichever ends earlier*. If it takes 1 minute to finish 40 total iterations, the test will end after 1 minute. If it takes 10 minutes to finish 40 total iterations, the test will end after 5 minutes.

### Stages

Defining iterations and durations both cause k6 to execute your test script using a [simple load profile](Parameters%20of%20a%20load%20test.md#Simple%20load%20profile): VUs are started, sustained for a certain time or number of iterations, and then ended.

![A simple load profile](load_profile-no_ramp-up_or_ramp-down.png)

_Simple load profile_

What if you want to add [a ramp-up](Performance%20Testing%20Terminology.md#Ramp-up) or [ramp-down](Performance%20Testing%20Terminology.md#Ramp-down), so that the profile looks more like this?

![Constant load profile, with ramps](load_profile-constant.png.png)

_Constant load profile, with ramps_

In that case, you may want to use [stages](https://k6.io/docs/using-k6/options/#stages).

```js
export let options = {
  stages: [
    { duration: '30m', target: 100 },
    { duration: '1h', target: 100 },
    { duration: '5m', target: 0 },
  ],
};
```

The stages option lets you define different steps or phases for your load test, each of which can be configured with a number of VUs and duration. The example above consists of three steps (but you can add more if you'd like).

1. The first step is a gradual ramp-up from 0 VUs to 100 VUs.
2. The second step defines the [steady state](Parameters%20of%20a%20load%20test.md#Steady%20state). The load is held constant at 100 VUs for 1 hour.
3. Then, the third step is a gradual ramp-down from 100 VUs back to 0, at which point the test ends.

Stages are the most versatile way to define test parameters for a single scenario. They give you flexibility in shaping the load of your test to match the situation in production that you're trying to simulate.

## The full script so far

If you're using stages, here's what your script should look like so far:

```js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30m', target: 100 },
    { duration: '1h', target: 100 },
    { duration: '5m', target: 0 },
  ],
};

export default function() {
  let url = 'https://httpbin.test.k6.io/post';
  let response = http.post(url, 'Hello world!');
  check(response, {
      'Application says hello': (r) => r.body.includes('Hello world!')
  });

  sleep(Math.random() * 5);
}
```

## Test your knowledge

### Question 1

You've been instructed to create a script that sends the same HTTP request exactly 100 times. Which of the following test options is the best way to accomplish this task?

A: Iterations
B: Stages
C: Duration

Answer: A

### Question 2

Given the test options as specified below, how long will the test be executed?

```js
export let options = {
  vus: 10,
  iterations: 3,
  duration: '1h',
};
```

A: 10 hours
B: As long as it takes to finish 3 iterations or 1h, whichever is shorter
C: 1 hour plus as long as it takes to finish 3 iterations

Answer: B

### Question 3

Which of the following test options will yield a stepped load pattern that adds 100 users within 10 minutes, holds that load steady for 30 minutes, and then continues that pattern until 300 VUs have been running for 30 minutes?

A: 
```js
export let options = {
  stages: [
    { duration: '10m', target: 100 },
    { duration: '30m', target: 100 },
    { duration: '10m', target: 200 },
	{ duration: '30m', target: 200 },
    { duration: '10m', target: 300 },
    { duration: '30m', target: 300 },	  
  ],
};
```

B: 

```js
export let options = {
  stages: [
    { duration: '30m', target: 300 },
};
```

C: 

```js
export let options = {
  vus: 300,
  duration: '30m',
};
```

Answer: A

## Next Up

Scaling up a load test comes with some added complexity, especially when you're trying to figure out whether the test was successful or not. In the next section, you'll learn how to set thresholds to define success for a test run.