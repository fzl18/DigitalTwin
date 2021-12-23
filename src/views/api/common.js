import apiCore from './config/index'

let request = apiCore.fetch

export function getPageUser(data) {
  return request({
    url: '/system/userinfo',
    method: 'POST',
    params: data.params,
    data: data.data,
  })
}
export function changepwd(data) {
  return request({
    url: '/system/mainframe/changepwd',
    method: 'PUT',
    params: data.params,
  })
}
export function getPageUnit(data) {
  return request({
    url: '/system/unitinfo/',
    method: 'POST',
    params: data.params,
    data: data.data,
  })
}
export function getUserInfo(data) {
  return request({
    url: `/platform/userinfo/${data.params.userCode}`,
    method: 'get',
  })
}
export function getUserPowers(data) {
  return request({
    url: `/system/platform/userpowers/${data.params.topUnit}/${data.params.userCode}`,
    method: 'get',
  })
}
export function getAllUnits(data) {
  return request({
    url: `/system/platform/allunits/${data.params.topUnit}`,
    method: 'get',
  })
}
// 下拉
export function getAllSelectUnits(data) {
  return request({
    url: `/system/platform/unitrepo/${data.params.topUnit}`,
    method: 'get',
  })
}
// /framework/system/platform/unitrepo/DxxkJ664
// export function getUnitUsers(data) {
//   return request({
//     url: `/system/platform/validusers/${data.params.topUnit}/${data.params.unitCode}`,
//     method: 'get',
//   })
// }

export function getUnitUsers(data) {
  return request({
    url: `/system/platform/allusers/${data.params.topUnit}`,
    method: 'get',
  })
}
// 获取所有的租户下的用户
export function getAllUnitUsers(data) {
  return request({
    url: `/system/platform/allusers/${data.params.topUnit}`,
    method: 'get',
  })
}
export function getDictionary(data) {
  return request({
    url: `/system/platform/dictionary/BTZBGLXT/${data.params.catalogCode}`,
    method: 'get',
  })
}
export function getMenu(data) {
  return request({
    url: `/system/platform/useroptinfs/${data.params.topUnit}/${data.params.userCode}`,
    method: 'get',
  })
}
const hopRoute = 'http://localhost:8080/'
const logout = process.env.VUE_APP_URL + '/frame/logout' // 'https://homeuat.bit-plat.com/frame/logout'
const login = process.env.VUE_APP_URL + '/frame/logincas'

export function isShowMoneyData(params) {
  return request({
    url: `/system/dimensionAuthInfo/list`,
    params,
    method: 'get',
  })
}

export default {
  getPageUser,
  getPageUnit,
  getUserInfo,
  getUserPowers,
  getDictionary,
  getAllUnits,
  getAllSelectUnits,
  getUnitUsers,
  getAllUnitUsers,
  getMenu,
  hopRoute,
  logout,
  login,
  changepwd,
  isShowMoneyData,
}
