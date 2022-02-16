## When should you consider recording?

## Using the k6 browser recorder extension

![k6-browser-recorder-01](../images/k6-browser-recorder-01.png)

![k6-browser-recorder-02](../images/k6-browser-recorder-02.png)

## Saving the recorded script to k6 Cloud

![](../images/k6-browser-recorder-3.png)

![](../images/k6-browser-recorder-4.png)

### Test Builder

![](../images/k6-browser-recorder-5.png)

### Script editor

```js
// Scenario: Scenario_1 (executor: ramping-vus)

import { sleep, group } from 'k6'
import http from 'k6/http'

export const options = {
  ext: {
    loadimpact: {
      distribution: { 'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 100 } },
      apm: [],
    },
  },
  thresholds: {},
  scenarios: {
    Scenario_1: {
      executor: 'ramping-vus',
      gracefulStop: '30s',
      stages: [
        { target: 20, duration: '1m' },
        { target: 20, duration: '3m30s' },
        { target: 0, duration: '1m' },
      ],
      gracefulRampDown: '30s',
      exec: 'scenario_1',
    },
  },
}

export function scenario_1() {
  let response

  group('page_1 - http://ecommerce.k6.io/', function () {
    response = http.get('http://ecommerce.k6.io/', {
      headers: {
        'upgrade-insecure-requests': '1',
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'accept-encoding': 'gzip, deflate',
        'accept-language':
          'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
      },
    })
    sleep(1.2)

    response = http.get(
      'http://ecommerce.test.k6.io/wordpress/wp-includes/css/dist/block-library/style.min.css?ver=5.9',
      {
        headers: {
          accept: 'text/css,*/*;q=0.1',
          'accept-encoding': 'gzip, deflate',
          'accept-language':
            'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
        },
      }
    )

    response = http.get(
      'http://ecommerce.test.k6.io/wordpress/wp-content/plugins/woocommerce/packages/woocommerce-blocks/build/vendors-style.css?ver=4.0.0',
      {
        headers: {
          accept: 'text/css,*/*;q=0.1',
          'accept-encoding': 'gzip, deflate',
          'accept-language':
            'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
        },
      }
    )

    response = http.get(
      'http://ecommerce.test.k6.io/wordpress/wp-content/plugins/woocommerce/packages/woocommerce-blocks/build/style.css?ver=4.0.0',
      {
        headers: {
          accept: 'text/css,*/*;q=0.1',
          'accept-encoding': 'gzip, deflate',
          'accept-language':
            'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
        },
      }
    )

    response = http.get(
      'http://ecommerce.test.k6.io/wordpress/wp-content/themes/storefront/assets/css/base/gutenberg-blocks.css?ver=3.5.0',
      {
        headers: {
          accept: 'text/css,*/*;q=0.1',
          'accept-encoding': 'gzip, deflate',
          'accept-language':
            'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
        },
      }
    )

    response = http.get(
      'http://ecommerce.test.k6.io/wordpress/wp-content/themes/storefront/style.css?ver=3.5.0',
      {
        headers: {
          accept: 'text/css,*/*;q=0.1',
          'accept-encoding': 'gzip, deflate',
          'accept-language':
            'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
        },
      }
    )

    response = http.get(
      'http://ecommerce.test.k6.io/wordpress/wp-content/themes/storefront/assets/css/base/icons.css?ver=3.5.0',
      {
        headers: {
          accept: 'text/css,*/*;q=0.1',
          'accept-encoding': 'gzip, deflate',
          'accept-language':
            'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
        },
      }
    )

    response = http.get(
      'http://ecommerce.test.k6.io/wordpress/wp-content/themes/storefront/assets/css/woocommerce/woocommerce.css?ver=3.5.0',
      {
        headers: {
          accept: 'text/css,*/*;q=0.1',
          'accept-encoding': 'gzip, deflate',
          'accept-language':
            'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
        },
      }
    )

    response = http.get(
      'http://ecommerce.test.k6.io/wordpress/wp-includes/js/jquery/jquery.min.js?ver=3.6.0',
      {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate',
          'accept-language':
            'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
        },
      }
    )

    response = http.get(
      'http://ecommerce.test.k6.io/wordpress/wp-includes/js/jquery/jquery-migrate.min.js?ver=3.3.2',
      {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate',
          'accept-language':
            'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
        },
      }
    )
    sleep(0.7)

    response = http.get(
      'http://ecommerce.test.k6.io/wordpress/wp-content/plugins/woocommerce/assets/js/jquery-blockui/jquery.blockUI.min.js?ver=2.70',
      {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate',
          'accept-language':
            'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
        },
      }
    )

    response = http.get(
      'http://ecommerce.test.k6.io/wordpress/wp-content/plugins/woocommerce/assets/js/frontend/add-to-cart.min.js?ver=5.0.1',
      {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate',
          'accept-language':
            'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
        },
      }
    )

    response = http.get(
      'http://ecommerce.test.k6.io/wordpress/wp-content/plugins/woocommerce/assets/js/js-cookie/js.cookie.min.js?ver=2.1.4',
      {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate',
          'accept-language':
            'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
        },
      }
    )

    response = http.get(
      'http://ecommerce.test.k6.io/wordpress/wp-content/plugins/woocommerce/assets/js/frontend/woocommerce.min.js?ver=5.0.1',
      {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate',
          'accept-language':
            'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
        },
      }
    )

    response = http.get(
      'http://ecommerce.test.k6.io/wordpress/wp-content/plugins/woocommerce/assets/js/frontend/cart-fragments.min.js?ver=5.0.1',
      {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate',
          'accept-language':
            'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
        },
      }
    )

    response = http.get(
      'http://ecommerce.test.k6.io/wordpress/wp-content/themes/storefront/assets/js/navigation.min.js?ver=3.5.0',
      {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate',
          'accept-language':
            'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
        },
      }
    )

    response = http.get(
      'http://ecommerce.test.k6.io/wordpress/wp-content/themes/storefront/assets/js/skip-link-focus-fix.min.js?ver=20130115',
      {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate',
          'accept-language':
            'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
        },
      }
    )

    response = http.get(
      'http://ecommerce.test.k6.io/wordpress/wp-content/themes/storefront/assets/js/vendor/pep.min.js?ver=0.4.3',
      {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate',
          'accept-language':
            'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
        },
      }
    )

    response = http.get(
      'http://ecommerce.test.k6.io/wordpress/wp-content/themes/storefront/assets/js/woocommerce/header-cart.min.js?ver=3.5.0',
      {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate',
          'accept-language':
            'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
        },
      }
    )

    response = http.get(
      'http://ecommerce.test.k6.io/wordpress/wp-content/themes/storefront/assets/js/footer.min.js?ver=3.5.0',
      {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate',
          'accept-language':
            'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
        },
      }
    )

    response = http.get(
      'http://ecommerce.test.k6.io/wordpress/wp-includes/js/wp-emoji-release.min.js?ver=5.9',
      {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate',
          'accept-language':
            'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
        },
      }
    )

    response = http.get(
      'http://ecommerce.test.k6.io/wordpress/wp-content/uploads/2021/02/K6-logo.png',
      {
        headers: {
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate',
          'accept-language':
            'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
        },
      }
    )

    response = http.get(
      'http://ecommerce.test.k6.io/wordpress/wp-content/uploads/2021/02/album-1.jpg',
      {
        headers: {
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate',
          'accept-language':
            'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
        },
      }
    )

    response = http.get(
      'http://ecommerce.test.k6.io/wordpress/wp-content/uploads/2021/02/beanie-2.jpg',
      {
        headers: {
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate',
          'accept-language':
            'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
        },
      }
    )

    response = http.get(
      'http://ecommerce.test.k6.io/wordpress/wp-content/uploads/2021/02/beanie-with-logo-1.jpg',
      {
        headers: {
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate',
          'accept-language':
            'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
        },
      }
    )

    response = http.get(
      'http://ecommerce.test.k6.io/wordpress/wp-content/uploads/2021/02/belt-2.jpg',
      {
        headers: {
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate',
          'accept-language':
            'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
        },
      }
    )

    response = http.get(
      'http://ecommerce.test.k6.io/wordpress/wp-content/uploads/2021/02/cap-2.jpg',
      {
        headers: {
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate',
          'accept-language':
            'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
        },
      }
    )

    response = http.get(
      'http://ecommerce.test.k6.io/wordpress/wp-content/uploads/2021/02/hoodie-2.jpg',
      {
        headers: {
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate',
          'accept-language':
            'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
        },
      }
    )

    response = http.get(
      'http://ecommerce.test.k6.io/wordpress/wp-content/uploads/2021/02/hoodie-with-logo-2.jpg',
      {
        headers: {
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate',
          'accept-language':
            'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
        },
      }
    )

    response = http.get(
      'http://ecommerce.test.k6.io/wordpress/wp-content/uploads/2021/02/hoodie-with-zipper-2.jpg',
      {
        headers: {
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate',
          'accept-language':
            'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
        },
      }
    )

    response = http.get(
      'http://ecommerce.test.k6.io/wordpress/wp-content/uploads/2021/02/logo-1.jpg',
      {
        headers: {
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate',
          'accept-language':
            'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
        },
      }
    )

    response = http.get(
      'http://ecommerce.test.k6.io/wordpress/wp-content/uploads/2021/02/long-sleeve-tee-2.jpg',
      {
        headers: {
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate',
          'accept-language':
            'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
        },
      }
    )

    response = http.get(
      'http://ecommerce.test.k6.io/wordpress/wp-content/uploads/2021/02/polo-2.jpg',
      {
        headers: {
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate',
          'accept-language':
            'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
        },
      }
    )

    response = http.get(
      'http://ecommerce.test.k6.io/wordpress/wp-content/uploads/2021/02/single-1.jpg',
      {
        headers: {
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate',
          'accept-language':
            'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
        },
      }
    )

    response = http.post(
      'http://ecommerce.k6.io/?wc-ajax=get_refreshed_fragments',
      {
        time: '1645005395795',
      },
      {
        headers: {
          accept: '*/*',
          'x-requested-with': 'XMLHttpRequest',
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          origin: 'http://ecommerce.k6.io',
          'accept-encoding': 'gzip, deflate',
          'accept-language':
            'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
        },
      }
    )
    sleep(0.6)

    response = http.get(
      'http://ecommerce.test.k6.io/wordpress/wp-content/uploads/2021/02/K6-logo.png',
      {
        headers: {
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate',
          'accept-language':
            'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
        },
      }
    )

    response = http.get(
      'http://ecommerce.test.k6.io/wordpress/wp-content/uploads/2021/02/K6-logo.png',
      {
        headers: {
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate',
          'accept-language':
            'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
        },
      }
    )
    sleep(6.7)

    response = http.get('http://ecommerce.k6.io/', {
      headers: {
        accept: '*/*',
        'accept-encoding': 'gzip, deflate',
        'accept-language':
          'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
      },
    })

    response = http.get(
      'http://ecommerce.test.k6.io/wordpress/wp-includes/css/dist/block-library/style.min.css?ver=5.9',
      {
        headers: {
          accept: 'text/css,*/*;q=0.1',
          'accept-encoding': 'gzip, deflate',
          'accept-language':
            'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
        },
      }
    )

    response = http.get(
      'http://ecommerce.test.k6.io/wordpress/wp-content/plugins/woocommerce/packages/woocommerce-blocks/build/vendors-style.css?ver=4.0.0',
      {
        headers: {
          accept: 'text/css,*/*;q=0.1',
          'accept-encoding': 'gzip, deflate',
          'accept-language':
            'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
        },
      }
    )

    response = http.get(
      'http://ecommerce.test.k6.io/wordpress/wp-content/plugins/woocommerce/packages/woocommerce-blocks/build/style.css?ver=4.0.0',
      {
        headers: {
          accept: 'text/css,*/*;q=0.1',
          'accept-encoding': 'gzip, deflate',
          'accept-language':
            'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
        },
      }
    )

    response = http.get(
      'http://ecommerce.test.k6.io/wordpress/wp-content/themes/storefront/assets/css/base/gutenberg-blocks.css?ver=3.5.0',
      {
        headers: {
          accept: 'text/css,*/*;q=0.1',
          'accept-encoding': 'gzip, deflate',
          'accept-language':
            'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
        },
      }
    )

    response = http.get(
      'http://ecommerce.test.k6.io/wordpress/wp-content/themes/storefront/style.css?ver=3.5.0',
      {
        headers: {
          accept: 'text/css,*/*;q=0.1',
          'accept-encoding': 'gzip, deflate',
          'accept-language':
            'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
        },
      }
    )

    response = http.get(
      'http://ecommerce.test.k6.io/wordpress/wp-content/themes/storefront/assets/css/base/icons.css?ver=3.5.0',
      {
        headers: {
          accept: 'text/css,*/*;q=0.1',
          'accept-encoding': 'gzip, deflate',
          'accept-language':
            'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
        },
      }
    )

    response = http.get(
      'http://ecommerce.test.k6.io/wordpress/wp-content/themes/storefront/assets/css/woocommerce/woocommerce.css?ver=3.5.0',
      {
        headers: {
          accept: 'text/css,*/*;q=0.1',
          'accept-encoding': 'gzip, deflate',
          'accept-language':
            'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
        },
      }
    )
  })
}
```