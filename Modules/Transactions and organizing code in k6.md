If you've written a load testing script before, you might be familiar with the term [transaction](Modules/Performance%20Testing%20Terminology.md#Transaction). A transaction in load testing is a request or group of requests that correspond to a single action by the user.

For example, you might have a transaction called `01_Go_to_homepage` that consists of a user going to your website main page for the first time. That transaction would then include GET requests for the main HTML, in addition to embedded resources like scripts, images, and fonts.

Transactions can be useful in reframing performance as user experience. In the example above, an end user of your application may not necessarily care or even notice that `https://yourdomain.com/script.js` had a response time of 300ms. User comments about a website are usually expressed in terms of pages, so it's worth considering whether your script should be structured similarly. It may also be easier to report the response time of a page rather than individual requests when speaking to stakeholders.

Transactions also organize test code, making it more readable and easier to debug. There are several ways that you can create transactions in k6.

## Groups

With [groups](https://k6.io/docs/using-k6/tags-and-groups/#groups), you can identify multiple requests as belonging to the same transaction. k6 will show the response time of grouped requests separately and as a group. Groups are best used for requests that are triggered by the same action. For example, here's an example of a group of the requests sent when a user goes to https://ecommerce.k6.io:

```js

```

## Tags

## URL grouping

## Functions

## Comments

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