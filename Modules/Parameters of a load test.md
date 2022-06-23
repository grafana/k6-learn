A test parameter describes the situation under which traffic is generated during the load test. Below are some common test parameters:

- Transaction distribution
- User flows
- Ramp-up and ramp-down periods
- Steady state
- Duration
- Concurrency
- Throughput
- Load profile

We'll discuss each one in more detail below.

## Transaction distribution

A [transaction](Performance%20Testing%20Terminology.md#Transaction) is a grouping of requests or steps that are triggered by a single user action. For example, a login transaction might consist of the following steps:
- Type in username
- Type in password
- Click LOG IN button.

The same transaction might consist of the following underlying requests:
- HTTP POST to the authentication server with the login credentials
- A redirect to the authenticated user's account page
- HTTP GET for the HTML and embedded resources for the user's account page

In load testing, transactions are used to organize scripts in a user-oriented way, where one transaction corresponds to one user action.

A load test typically consists of multiple transactions, depending on the situation that you want to simulate. During test execution, you can set how often each transaction is executed, usually using the number of transactions per second or percentages. For example, consider a theoretical transaction distribution for an ecommerce site:

- Home page: 100%
	- View Product List: 50%
		- View Product Page: 25%
			- Add to Cart: 15%
				- Checkout: 10%
	- Contact Us Page: 3%
	- (exit) 47%

In this example, all of the users accessing a site go to the home page, but only 10% of them end up purchasing a product. Each line above (except for the 47% that exited the application after viewing the home page) is a transaction.

The transaction distribution for a load test describes:
- which transactions are included in the test
- how often the included transactions are executed

In k6, the best way to represent transactions is by using [groups](https://k6.io/docs/using-k6/tags-and-groups#groups). Groups combine multiple requests together and calculate a combined response time for those requests as well.

## User flows

A user flow is the description of the path through an application that you're trying to test. Here are some examples of user flows you could create based on the list of transactions above:

- Just browsing: Home Page > View Product List > View Product Page > View Product List > View Product Page
- Clicking product link in email: View Product Page > Add to Cart > Checkout
- Returning to checkout: Home Page > View Cart > Checkout

User flows are sequences of transactions that represent actions a user might take as they use your application. In k6, you can [create multiple user flows as part of scenarios and run them in the same script](https://k6.io/docs/using-k6/scenarios/).

## Ramp-up and ramp-down periods

Ramp-up is the amount of time it takes for a load test to go from 0 users to the desired number of users, and is found at the beginning of a test. Ramp-down is the time it takes for a load test to go from the desired number of users back down to 0, and is found at the end of a test. Ramp-up and ramp-down periods simulate real traffic against an application. In many production environments, users do not start accessing a site simultaneously, and instead gradually trickle into the application, and away from it, over some time.

![](load_profile-ramp-up.png.png)
_Load test with ramp-up period highlighted_

In the load test above, the highlighted portions show the ramp-up period, which is 5 minutes. During the first 5 minutes of the test, the script gradually increases the number of virtual users from 0 to 20.

The same test also has a ramp-down period, but it is significantly shorter, at 1 minute. Ramp-up periods and ramp-down periods do not have to be the same length, and it is valid to have one, none, or both.

```ad-tip
Ramp-up and ramp-down periods are best used for applications that do not have a hard start or hard end to production traffic. In some situations, such as when simulating traffic for a sale that begins at a specific time, it may be more realistic to remove ramp-up and/or ramp-down periods.
```

## Steady state

The steady state is any period of time during the load test where the number of virtual users is constant. The steady state does not include ramp-up or ramp-down periods. The unchanging load during a steady state makes it an ideal time period for analyzing how well an application responds to the conditions created by a load test.

![Steady state in a load test](images/load_profile-steady_state.png)
_Steady state during a load test_

## Duration

The duration of a load test is how long it takes to complete, from beginning to end. It includes the ramp-up, ramp-down, and steady state portions of a load test.

## Concurrency

User concurrency is the number of users that are accessing an application at a given point in time. In load tests, this is measured in terms of the total virtual users.

## Throughput

Throughput is a general term for the rate at which something is produced or processed. In the context of load testing, it is often used to refer to the rate at which requests are sent to the application server. A common measure of throughput is requests per second (rps), which is also what k6 measures. The higher the throughput of a test, the more concurrent requests the application server needs to process at any given time.

## Load profile

A load profile describes the shape of the traffic generated over a certain amount of time. The load profile you decide on for your test is determined by the scenario you're trying to recreate.

Load profiles are typically described by plotting the number of virtual users over time.

### Simple load profile

![Simple load profile for a load test](images/load_profile-no_ramp-up_or_ramp-down.png)
_Simple load profile for a load test_

The simplest load profile for a load test involves the script executing a given number of virtual users and iterating on the script over a period of time. 

For example, in the screenshot above, the script started 20 VUs. When the end of the script is executed, each VU goes back to the beginning of the script and executes it again. The test ran in this way for 35 minutes, after which k6 terminated all the users. 

```ad-note
In k6, the `default` function is the part that is repeated throughout the test. You can nest other functions within this function or choose to iterate a different function instead by using [the exec option within a scenario](https://k6.io/docs/using-k6/scenarios/#common-options).
```

### Constant load profile with ramps

Sometimes, the load profile above may be too simple. If you are running thousands of VUs, it may not be realistic to start all of those VUs at the same time. Doing so may cause your application to respond in strange ways. Similarly, a hard stop for all VUs at the end of the test may not be realistic either.

Below is another common load profile that includes a gradual ramp-up period at the beginning, a steady state in the middle, and a ramp-down at the end.

![](load_profile-constant.png.png)
_Constant load profile with ramp-up and ramp-down_

You can also have more complex load profiles than those shown here. For example, you might want to design a stepped load profile where the number of VUs increases every 30 minutes. You can also define a load profile for every [scenario](https://k6.io/docs/using-k6/scenarios/).

## Test your knowledge

### Question 1

What is the purpose of a ramp-up or ramp-down?

A: It makes the increase or decrease in VUs more gradual, improving how realistic the test script is.
B: It gives the operations team time to prepare for the high load generated by the load test.
C: It is a shakeout period that can be used to spot any issues with the load test script or execution.
D: All of the above.

### Question 2

Which of the following is an example of concurrency?

A: 300 requests/second
B: Number of account credentials in test data used during the test
C: 300 VUs
D: A or C

### Question 3

Which test parameter best describes a load test exhibiting a gradually increasing load, and then a sudden spike in VUs in the middle of the test?

A: Concurrency
B: Transaction
C: Load profile