If you've written a load testing script before, you might be familiar with the term [transaction](Modules/Performance-Testing-Terminology.md#Transaction). A transaction in load testing is a request or group of requests that correspond to a single action by the user.

For example, you might have a transaction called `01_Go_to_homepage` that consists of a user going to your website main page for the first time. That transaction would then include GET requests for the main HTML, in addition to embedded resources like scripts, images, and fonts.

Transactions can be useful in reframing performance as user experience. In the example above, an end user of your application may not necessarily care or even notice that `https://yourdomain.com/script.js` had a response time of 300ms. User comments about a website are usually expressed in terms of pages, so it's worth considering whether your script should be structured similarly. It may also be easier to report the response time of a page rather than individual requests when speaking to stakeholders.

Transactions also organize test code, making it more readable and easier to debug. There are several ways that you can create transactions in k6.

## Groups

With [groups](https://k6.io/docs/using-k6/tags-and-groups/#groups), you can identify multiple requests as belonging to the same transaction. k6 will show the response time of grouped requests separately and as a group. Groups are best used for requests that are triggered by the same action. Here's an example of how you can use groups to structure your script:

```js
import { group } from 'k6';

export default function () {
  group('01_VisitHomepage', function () {
    // ...
  });
  group('02_ClickOnProduct', function () {
    // ...
  });
  group('03_AddProductToCart', function () {
    // ...
  });
  group('04_ViewCart', function () {
    // ...
  });
  group('05_ProceedToCheckout', function () {
    // ...
  });
}

```

When you create a script [using the k6 browser recorder](Recording-a-k6-script.md), you may notice that these groups are automatically created for you whenever k6 detects multiple embedded resources on a page.

When you use groups, k6 still reports and saves metrics for each request individually, but each one also includes its group name. If you [save the output results to a CSV](k6-results-output-options.md#CSV) by using `k6 run test.js -o csv=results.csv`, you'll see that the group of each request is also reported:

```plain
metric_name,timestamp,metric_value,check,error,error_code,expected_response,group,method,name,proto,scenario,service,status,subproto,tls_version,url,extra_tags
vus,1645006049,1.000000,,,,,,,,,,,,,,,
vus_max,1645006049,1.000000,,,,,,,,,,,,,,,
http_reqs,1645006050,1.000000,,,,true,::01_Homepage,GET,http://ecommerce.k6.io/,HTTP/1.1,default,,200,,,http://ecommerce.k6.io/,
http_req_duration,1645006050,1530.111000,,,,true,::01_Homepage,GET,http://ecommerce.k6.io/,HTTP/1.1,default,,200,,,http://ecommerce.k6.io/,
http_req_blocked,1645006050,134.352000,,,,true,::01_Homepage,GET,http://ecommerce.k6.io/,HTTP/1.1,default,,200,,,http://ecommerce.k6.io/,
http_req_connecting,1645006050,132.192000,,,,true,::01_Homepage,GET,http://ecommerce.k6.io/,HTTP/1.1,default,,200,,,http://ecommerce.k6.io/,
http_req_tls_handshaking,1645006050,0.000000,,,,true,::01_Homepage,GET,http://ecommerce.k6.io/,HTTP/1.1,default,,200,,,http://ecommerce.k6.io/,
http_req_sending,1645006050,0.141000,,,,true,::01_Homepage,GET,http://ecommerce.k6.io/,HTTP/1.1,default,,200,,,http://ecommerce.k6.io/,
http_req_waiting,1645006050,1120.729000,,,,true,::01_Homepage,GET,http://ecommerce.k6.io/,HTTP/1.1,default,,200,,,http://ecommerce.k6.io/,
http_req_receiving,1645006050,409.241000,,,,true,::01_Homepage,GET,http://ecommerce.k6.io/,HTTP/1.1,default,,200,,,http://ecommerce.k6.io/,
http_req_failed,1645006050,0.000000,,,,true,::01_Homepage,GET,http://ecommerce.k6.io/,HTTP/1.1,default,,200,,,http://ecommerce.k6.io/,
group_duration,1645006069,20792.450912,,,,,::01_Homepage,,,,default,,,,,,
```

The `::01_Homepage` in the CSV file above refers to the group name of the request, with the `::` denoting that it is a group rather than a request.

The last line also shows that k6 has saved an aggregated `http_req_duration` metric for the group as a whole, called `group_duration`. Every group specified will have its own `group_duration`.

Since groups *add* metrics instead of replacing them, they can be a great way to organize your code into transactions.

## Tags

A [tag](https://k6.io/docs/using-k6/tags-and-groups/#tags) is a way to label elements in k6, and tags can be used in conjunction with groups. Unlike groups, tags won't cause k6 to report metrics per tag.

Here's how to tag a request:

```js
import { sleep, group } from 'k6'
import http from 'k6/http'

export default function () {    
  let response

  group('01_Homepage', function () {
    response = http.get('http://ecommerce.k6.io/', {
      tags: {
        page: 'Homepage',
        type: 'HTML',
      }
    })

	// ... (other requests in the group)

	// ... (other requests in the group)

  })
}

```

The `tags` section, added to the request, defines two different tags:
- a tag named `page`, whose value for this request is `Homepage`, and
- a tag named `type`, whose value for this request is `HTML`

You can change both the name and the value of the tag as you feel is appropriate, and you can use multiple tags.

By default, k6 adds a `name` tag to every request, with the value equal to the URL. You can override this behavior if you'd like to name the request something easier to read.

Here's what tags look like in k6 CSV results:

```plain
metric_name,timestamp,metric_value,check,error,error_code,expected_response,group,method,name,proto,scenario,service,status,subproto,tls_version,url,extra_tags
vus,1645007331,1.000000,,,,,,,,,,,,,,,
vus_max,1645007331,1.000000,,,,,,,,,,,,,,,
http_reqs,1645007331,1.000000,,,,true,::01_Homepage,GET,http://ecommerce.k6.io/,HTTP/1.1,default,,200,,,http://ecommerce.k6.io/,page=Homepage&type=HTML
http_req_duration,1645007331,1405.515000,,,,true,::01_Homepage,GET,http://ecommerce.k6.io/,HTTP/1.1,default,,200,,,http://ecommerce.k6.io/,page=Homepage&type=HTML
http_req_blocked,1645007331,139.488000,,,,true,::01_Homepage,GET,http://ecommerce.k6.io/,HTTP/1.1,default,,200,,,http://ecommerce.k6.io/,page=Homepage&type=HTML
http_req_connecting,1645007331,137.223000,,,,true,::01_Homepage,GET,http://ecommerce.k6.io/,HTTP/1.1,default,,200,,,http://ecommerce.k6.io/,page=Homepage&type=HTML
http_req_tls_handshaking,1645007331,0.000000,,,,true,::01_Homepage,GET,http://ecommerce.k6.io/,HTTP/1.1,default,,200,,,http://ecommerce.k6.io/,type=HTML&page=Homepage
http_req_sending,1645007331,0.137000,,,,true,::01_Homepage,GET,http://ecommerce.k6.io/,HTTP/1.1,default,,200,,,http://ecommerce.k6.io/,type=HTML&page=Homepage
http_req_waiting,1645007331,1171.681000,,,,true,::01_Homepage,GET,http://ecommerce.k6.io/,HTTP/1.1,default,,200,,,http://ecommerce.k6.io/,page=Homepage&type=HTML
http_req_receiving,1645007331,233.697000,,,,true,::01_Homepage,GET,http://ecommerce.k6.io/,HTTP/1.1,default,,200,,,http://ecommerce.k6.io/,page=Homepage&type=HTML
http_req_failed,1645007331,0.000000,,,,true,::01_Homepage,GET,http://ecommerce.k6.io/,HTTP/1.1,default,,200,,,http://ecommerce.k6.io/,page=Homepage&type=HTML
```

The last field of every metric for this request now has `page=Homepage&type=HTML`, which corresponds to the tags that were set.

Since k6 doesn't report an aggregated metric for all requests that are tagged, like it does with requests that are grouped, groups are better for use as transactions. However, tags can be useful in the following circumstances:
- You'd like to add metadata to requests for easier troubleshooting (such as by adding the scenario type or test data used by that request).
- You want to explore patterns that span across multiple pages, such as how much of the response time all images contribute to the total.
- You want to label more than just requests.

With tags, you can label:
- requests
- checks
- thresholds
- custom metrics
- all metrics within a test

For more detailed information about tags, [click here](https://k6.io/docs/using-k6/tags-and-groups/#tags).

## URL grouping

As mentioned earlier, k6 adds a tag `name` to all requests by default and sets the value to the request URL. This is useful when each URL represents a different page. Sometimes, however, you may decide that your test scenario needs to include pages that are similar enough to be analyzed as one. For example, if you're testing an e-commerce site, it might be more useful for you to have all product pages reported as one, rather than as disparate products. 

[URL grouping](https://k6.io/docs/using-k6/http-requests/#url-grouping) is an implementation of tags that is especially useful when you are generating dynamic URLs, like this:

```js
import http from 'k6/http'

export default function () {
    let product = ['album', 'beanie', 'beanie-with-logo'];
    let rand = Math.floor(Math.random() * product.length);
    let productSelected = product[rand];
    let response = http.get('http://ecommerce.test.k6.io/product/' + productSelected, {
        tags: { name: 'ProductPage'},
    });
}
```

In the example above, the script randomly visits one of these three product pages:
- `http://ecommerce.test.k6.io/product/album`
- `http://ecommerce.test.k6.io/product/beanie`,
- `http://ecommerce.test.k6.io/product/beanie-with-logo` 

Without URL grouping, each of these would be tagged with a different name (equal to their URL). _With_ URL grouping, these pages are tagged with the same name, `ProductPage`. Here's a line from the CSV results obtained by running the script:

```plain
http_req_duration,1645010817,1203.076000,,,,true,,GET,ProductPage,HTTP/1.1,default,,301,,,http://ecommerce.test.k6.io/product/beanie,
```

## Improving script readability

Using groups and tags (including URL grouping) is good for organizing the results, but they only add to the complexity of your script. Here are some things you can do to improve script readability:
- Use comments
- Use functions
- Modularize your script

### Comments

Leaving comments for every action in your script has the double advantage of visually distinguishing code and also explaining what action(s) the code corresponds to. Here's an example:

```js
import http from 'k6/http'

export default function () {
	/************
       STEP 1: Visit homepage.
    ************/

	// Code for Step 1.

    /************
       STEP 2: Click on product to go to product page.
    ************/

	// Code for Step 2.

    /************
       STEP 3: Click Add To Cart button on product page.
    ************/

	// Code for Step 3.
}
```

### Functions

Another way to make your script readable is to create a function for every transaction, and then call each one in the default function, like this:

```js
import http from 'k6/http'

export default function () {

    Homepage();
    ProductPage();
    CartPage();
    CheckoutPage();

}

export function Homepage() {
    // ...
}

export function ProductPage() {
    // ...
}

export function CartPage() {
    // ...
}

export function CheckoutPage() {
    // ...
}
```

Using functions in this way gives you the added benefit of being able to define multiple user flows within the same script. For example, you could define one user flow that goes to the homepage only, another that visits the homepage and a few product pages, and a third that goes through all the pages and checks out. You'll learn more about scenarios in [Workload modeling with scenarios](Workload-modeling-with-scenarios.md).

### Modularizing your script further

What if you're using all groups, tags (including URL grouping), comments, functions, and your script is _still_ too long and unwieldy to be readable? [Modular scripting](Modular-scripting.md) might be the answer to your problem.

Modular scripting involves breaking apart your k6 test script into multiple scripts, and then calling each one into a single "runner" script that coordinates it all. You'll learn more about building a modular framework for running k6 tests in [Modular scripting](Modular-scripting.md).

## Test your knowledge

### Question 1

Which technique is the best to use as a load testing transaction?

A: Groups
B: Tags
C: URL grouping

### Question 2

Examine the following code:

```js
import { sleep, group } from 'k6'
import http from 'k6/http'

export default function () {    
  let response

  group('01_Homepage', function () {
    response = http.get('http://ecommerce.k6.io/', {
      tags: {
        page: 'Homepage',
        type: 'HTML',
      }
    })

	// ... (other requests in the group)

	// ... (other requests in the group)

  })
}

```

What is the value of the `name` tag for the HTTP request?

A: `Homepage`
B: `HTML`
C: `http://ecommerce.k6.io/`

### Question 3

Which of the following is an advantage of using functions to organize your k6 test script?

A: Functions aggregate all the metrics within a function and report them under a single name.
B: Functions give you the freedom to create test scenarios that correspond to user journeys for your application.
C: Functions tag all requests with the function name so you can filter by function in the test results.

### Answers

1. A. Grouping requests saves metrics for each reuqest *and* for each group (unlike tags and URL groups).
2. C. Without a specific `name` being specified, k6 defaults to using the URL as the name, so that you can identify the request more easily.
3. B. Functions do not aggregate metrics (groups are better for that) or tag requests within them (you'd need to add tags to do that). Instead, they are better used for organizing user actions or user flows within a script.