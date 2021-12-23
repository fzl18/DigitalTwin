import fetch from "@/utils/request";

let request = fetch("/");
export default {
  fetch: function(data) {
    return request(data);
  },
};
