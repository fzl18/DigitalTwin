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
