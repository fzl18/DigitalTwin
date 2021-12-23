import config from "../../config";
const {
  width,
  height,
  fontSize,
  maskEnable,
  maskColor,
  maskOpacity,
  backgroundColor,
  sceneWidth,
  sceneHeight,
} = config.screen;
export default {
  state: {
    width,
    height,
    fontSize,
    maskEnable,
    maskColor,
    maskOpacity,
    backgroundColor,
    offset: 0,
    sceneWidth,
    sceneHeight,
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
