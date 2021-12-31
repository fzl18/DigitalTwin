import config from "../../config";
const {
  skin,
  hueRotate,
  grayscale,
  brightness,
  contrast,
  saturate,
  opacity,
  sepia,
  warnbgColor,
  errorbgColor,
  headerHeight,
  sideWidth,
} = config.layer;
export default {
  state: {
    skin,
    hueRotate,
    grayscale,
    brightness,
    contrast,
    saturate,
    opacity,
    sepia,
    warnbgColor,
    errorbgColor,
    headerHeight:
      config.screen.sceneHeight == config.screen.height ? 0 : headerHeight,
    sideWidth,
    alarm: null,
    popupShow: false,
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
