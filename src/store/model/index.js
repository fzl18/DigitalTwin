import config from "../../config";
export default {
  state: {
    modelCache: config.screen.modelCache, // 模型缓存
    loadingComplete: false, // 模型加载进度
    modelList: [],
    curSelectModel: null, // 当前选择的模型
    currentCameraPosition: null, // 当前镜头位置
    currentControlsTarget: null, // 当前镜头lookAt
    currentSecne: "factory", // 当前显示场景
    currentLineHasModelType: [], //当前输送线包含的监测模块
  },
  mutations: {
    // setBarTitle(state, data) {
    //   state.barInfo.title = data;
    // },
  },
  actions: {
    // setBarTitle({ commit }, data) {
    //   commit("setBarTitle", data);
    // },
  },
  getters: {
    // barTitle: (state) => state.barInfo.title,
  },
};
