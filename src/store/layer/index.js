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
  leftSideWidth,
  rightSideWidth,
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
    leftSideWidth,
    rightSideWidth,
    alarm: null,
    popupShow: false,
    css2DShow: false,
    css3DShow: false,
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
