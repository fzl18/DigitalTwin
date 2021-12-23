import apiCore from './api/index'
let request = apiCore.fetch
export function getLogin() {
  return request({
    url: `/frame/currentuser`,
    method: 'get',
  })
}
export default {
  getLogin,
}
