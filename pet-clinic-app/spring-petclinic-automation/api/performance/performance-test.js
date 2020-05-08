import { sleep } from"k6";
import { group } from "k6";
import http from "k6/http";

export let options = {
  duration: "1m",
  vus: 50,
  tags: {
    "name": "test-wide-tag"
  },
  thresholds: {
    http_req_duration: ["p(95)<500"]
  }
};

export default function() {
  group("get requests",function(){
    group("loadimpact requests",function(){
        http.get("https://test-api.loadimpact.com/public/crocodiles/");
        sleep(3);
    });
    group("example requests",function(){
        http.get("https:/example.com/");
        sleep(3);
    });
  });

}
