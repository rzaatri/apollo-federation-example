import http from 'k6/http';
import { check, sleep } from 'k6';

const allQueryParams = "{\"operationName\":null,\"variables\":{},\"query\":\"{\\n  product(id: \\\"productA\\\") {\\n    id\\n    name\\n    publisher\\n    description\\n    basePrice\\n    userPrice(discountPercent: 0.2)\\n    media {\\n      screenshots\\n      videos\\n    }\\n  }\\n  media {\\n    screenshots\\n    videos\\n  }\\n}\\n\"}";

const onlyMediaQueryParams = "{\"operationName\":null,\"variables\":{},\"query\":\"{\\n  media {\\n    screenshots\\n    videos\\n  }\\n}\\n\"}";

const onlyCatalogQueryParams = "{\"operationName\":null,\"variables\":{},\"query\":\"{\\n  product(id: \\\"productA\\\") {\\n    id\\n    name\\n    publisher\\n    description\\n    basePrice\\n  }\\n}\\n\"}";

// export default function () {
//   let res = http.post('http://localhost:4000/', onlyCatalogQueryParams, { headers: { 'Content-Type': 'application/json' }});
//   // console.log(JSON.stringify(res));
//   // check(res, { 'status was 200': (r) => r.status == 200 });
//   sleep(1);
// }

export let options = {
  scenarios: {
    catalog: {
      executor: 'constant-vus',
      exec: 'catalog',
      vus: 20,
      duration: '15s',
    },
    media: {
      executor: 'constant-vus',
      exec: 'media',
      vus: 20,
      duration: '15s',
    },
  },
  thresholds: {
    // https://community.k6.io/t/multiple-scenarios-metrics-per-each/1314/2
    // Intentionally empty. We'll programatically define our bogus
    // thresholds (to generate the sub-metrics) below. In your real-world
    // load test, you can add any real threshoulds you want here.
  }
};

// Expose Sub Metrics
for (let key in options.scenarios) {
  // Each scenario automaticall tags the metrics it generates with its own name
  let thresholdName = `http_req_duration{scenario:${key}}`;
  // Check to prevent us from overwriting a threshold that already exists
  if (!options.thresholds[thresholdName]) {
      options.thresholds[thresholdName] = [];
  }
  // 'max>=0' is a bogus condition that will always be fulfilled
  options.thresholds[thresholdName].push('max>=0');
}

export function catalog() {
  http.post('http://localhost:4000/', onlyCatalogQueryParams, { 
    headers: { 'Content-Type': 'application/json' },
    tags: { my_custom_tag: 'catalog' }
  });
  sleep(1);
}

export function media() {
  http.post('http://localhost:4000/', onlyMediaQueryParams, { 
    headers: { 'Content-Type': 'application/json' },
    tags: { my_custom_tag: 'media' }
  });
  sleep(1);
}
