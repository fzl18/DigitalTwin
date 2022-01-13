import config from "../../config";
export default {
  state: {
    modelCache: config.screen.modelCache, // 模型缓存
    loadingComplete: false, // 模型加载进度
    modelList: [],
    curSelectModel: null, // 当前选择的模型
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
