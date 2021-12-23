import apiCore from "./api/cockpit-api";
let request = apiCore.fetch;
export function dailycheck() {
  return request({
    url: `/chart/dailycheck`, // 今日设备点检情况
    method: "get",
  });
}

export function equipmentMaintain() {
  return request({
    url: `/chart/equipmentMaintain`, // 本月设备故障维修率
    method: "get",
  });
}
export function equipmentWarning() {
  return request({
    url: `/chart/equipmentWarning`, // 本月设备监测预警统计
    method: "get",
  });
}
export function inspectioncheck() {
  return request({
    url: `/chart/inspectioncheck`, // 今日设备巡检情况
    method: "get",
  });
}
export function inspectionLineTask() {
  return request({
    url: `/chart/inspectionLineTask`, // 本月输送线巡检任务统计
    method: "get",
  });
}
export function inspectionTask() {
  return request({
    url: `/chart/inspectionTask`, // 本月巡检任务执行趋势
    method: "get",
  });
}
export function workOrder() {
  return request({
    url: `/chart/workOrder`, // 本月工单按时完成率
    method: "get",
  });
}

export function query(userCode) {
  return request({
    url: `/config/query?userCode=${userCode}`, // 查询图表配置
    method: "get",
  });
}

export function addOrUpdate(data) {
  return request({
    url: `/config/addOrUpdate`, //新增图表配置
    method: "post",
    data,
  });
}
export function weather() {
  return request({
    url: `/config/weather`, //天气
    method: "get",
  });
}
