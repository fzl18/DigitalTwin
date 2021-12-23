import fetch from '@/utils/request2'

let request = fetch()
export function getRouterList() {
  return request({
    url: '/index/menuList',
    method: 'get',
  })
}

export function getPageResource(params) {
  return request({
    url: '/index/pageResource',
    method: 'get',
    params,
  })
}
