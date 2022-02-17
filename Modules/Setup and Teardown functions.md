# Setup and Teardown functions

So far, you've been putting most of the code within the `default` function. All code within the default function is called **VU code**, because it is code that every virtual user executes and repeats until the end of the test.

Unless you specify a number of virtual users and a test duration in [the test options](k6%20Load%20Test%20Options.md), k6 runs your script once with one iteration and one virtual user. But what happens when you set a test duration of, say, one minute?

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

## Test your knowledge

### Question 1



A: 
B: 
C: 

Answer: 

### Question 2



A: 
B: 
C: 

Answer: 

### Question 3



A: 
B: 
C: 

Answer: 