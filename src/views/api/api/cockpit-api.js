import fetch from "@/utils/request";

let request = fetch("/cockpit-api/");
export default {
  fetch: function(data) {
    return request(data);
  },
};
