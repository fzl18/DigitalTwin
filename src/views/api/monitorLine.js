import apiCore from "./api/cockpit-api";
let request = apiCore.fetch;
export function cardSumary() {
  return request({
    url: `/monitor/cardSumary`, // 输送线卡片模式日周月汇总
    method: "get",
  });
}

export function coordinate() {
  return request({
    url: `/monitor/coordinate`, // 输送线坐标信息
    method: "get",
  });
}

export function getLineVisual(id) {
  return request({
    url: `/monitor/getLineVisual?lineId=${id}`, // 输送机详细信息
    method: "get",
  });
}

export function lineInfo() {
  return request({
    url: `/monitor/lineInfo`, // 输送线滚动信息
    method: "get",
  });
}

export function moduleStatus() {
  return request({
    url: `/monitor/moduleStatus`, // 查询模块信息
    method: "get",
  });
}

export function getVideoUrl(id) {
  return request({
    url: `/monitor/getVideoUrl?deviceCode=${id}`, // 查询视频信息
    method: "get",
  });
}

export function getLiveStream(deviceCode) {
  return request({
    url: `/monitor/getLiveStream?deviceCode=${deviceCode}`, // 直播开启流
    method: "get",
  });
}
