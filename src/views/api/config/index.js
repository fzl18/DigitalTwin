import fetch from '@/utils/request'

let request = fetch('/framework')
export default {
  fetch: function (data) {
    return request(data)
    // return new Promise((resolve, reject) => {
    //   request(data)
    //     .then((...array) => {
    //       resolve(...array)
    //     })
    //     .catch((...array) => {})
    // })
  },
}
