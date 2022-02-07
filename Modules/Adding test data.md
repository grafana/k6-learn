# Adding test data
In this section, you'll learn the best ways to add test data to your load testing script, making it more dynamic and realistic.

## Why add test data?

Test data is information designed to be used by a test script during execution. The information makes the test more realistic by using different values for certain parameters. Repeatedly sending the same values for things like usernames and passwords may cause caching to occur.

A cache represents content that is saved with the goal of increased application performance. Caching can occur on the server side or on the client side. A server-side cache saves commonly requested resources (such as those on the homepage) so that when those resources are requested, the server can return the resources immediately instead of having to fetch them from a downstream server.

A client-side cache might save the same resources so that a user's browser knows it doesn't have to make a request for those resources unless they have been changed. This implementation reduces the number of network requests that need to be sent and is especially important for apps that are predominantly accessed through a mobile device.

Caching can significantly affect load testing results. There are situations where caching should be enabled (such as when attempting to simulate the behavior of return customers), but there are also situations where caching should be disabled (such as when simulating brand-new users). Either way, you should decide on your caching strategy intentionally, and script accordingly.

Adding test data can help to prevent server-side caching. Some common test data types are:
- Usernames and passwords, for logging into an application and performing authenticated actions
- Names, addresses, emails, and other personal information for signing up for accounts or filling out contact forms
- Product names for retrieving product pages
- Keywords for searching a catalog
- PDFs to test uploading

## Array

The simplest way to add test data is by using an array. In [Dynamic correlation in k6](Dynamic%20correlation%20in%20k6.md), you defined an array like this:

```js
let usernameArr = ['admin', 'test_user'];
let passwordArr = ['123', '1234'];
```

After the arrays are defined, you can generate a random number to randomly pick a value from the array:

```js
// Get random username and password from array
let rand = Math.floor(Math.random() * 2);
let username = usernameArr[rand];
let password = passwordArr[rand];
console.log('username: ' + username, ' / password: ' + password);
```

An array is best used for very short lists of text, as in this example, or for debugging a test script.

## CSV Files

CSV files are lists of information that made up of _comma-separated values_ and are saved separately from the script.

Below is an example CSV file named `users.csv` containing usernames and passwords:
```plain
username,password
admin,123
test_user,1234
...
```

In k6, the CSV files can then be added to the script like this:

```js
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

const csvData = papaparse.parse(open('users.csv'), { header: true }).data;

export default function () {
    let rand = Math.floor(Math.random() * csvData.length);
    console.log('username: ', csvData[rand].username, ' / password: ', csvData[rand].password);
}
```

The code imports a library called `papaparse` that lets you interact with CSV files. CSV files are best used when generating new usernames and accounts or when you'd like to be able to open the test data file in a spreadsheet application.

## JSON files

You can also store your test data in JSON files.

Below is a JSON file called `users.json`:

```plain
{
  "users": [
    { "username": "admin", "password": "123" },
    { "username": "test_user", "password": "1234" }
  ]
}
```

You can then use it in your k6 script like this:

```js
const jsonData = JSON.parse(open('./data/users.json')).users;

export default function () {
    let rand = Math.floor(Math.random() * jsonData.length);
    console.log('username: ', jsonData[rand].username, ' / password: ', jsonData[rand].password);
}
```

JSON files are best used when the information to be used for the test is already exported in JSON format, or when the data is more hierarchical than a CSV file can handle.

## Shared Array

A Shared Array combines some elements of the previous three approaches (the simple array, CSV files, and JSON files) while addressing a common issue with test data during test execution: high resource utilization.

In the previous approaches, when a file is used in a test, multiple copies of the file are created, with each one being sent to a load generator. When the file is very large, it can unnecessarily use up resources on the load generator, making test results less accurate.

To prevent this, use a `SharedArray`:

```js
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import { SharedArray } from "k6/data";

const sharedData = new SharedArray("Shared Logins", function() {
    let data = papaparse.parse(open('users.csv'), { header: true }).data;
    return data;
});

export default function () {
    let rand = Math.floor(Math.random() * sharedData.length);
    console.log('username: ', sharedData[rand].username, ' / password: ', sharedData[rand].password);
}
```

Note that the SharedArray must be combined with other approaches; in this case, a CSV file.

Using a SharedArray is the most efficient way to add a list of data within a k6 test.

## Other test data

Test data can also refer to 

[data uploads](https://k6.io/docs/examples/data-uploads/)

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