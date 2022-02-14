export default {
  state: {
    scale: null,
    zoomlevel: 1, // 缩放等级
    defaultZoomLevel: 1,
    maxZoom: 2.2, // 最大缩放等级
    minZoom: 0.2, // 最小缩放等级
    step: 0.1, // 缩放步长
    loading: true, // 加载状态
    defaultObjLevel: 4, // 默认层级
    curObjLevel: 0, // 当前操作层级
    curCity: "",
    curProvince: "",
    curCountry: "",
    curFactory: "",
    delay: 800, // 延时ms
    autoPlay: false,
    lock: false, // 锁定
    lang: "cn", // 语言
    showFullScreen: false, // 全屏
    nav: [
      { tit: "全球", en: "WORD", level: 0, enable: true },
      { tit: "中国", en: "CHINA", level: 1, enable: true },
      { tit: "省级", en: "PROVINCIAL", level: 2, enable: true },
      { tit: "市级", en: "CITY", level: 3, enable: true },
      { tit: "厂区", en: "PLANT", level: 4, enable: true },
    ],
    paramsData: {},
    // 用户相关
    accessToken: "",
    userinfo: {},
    userPowers: "",
    dictionary: [],
    allUnits: [],
    unitUsers: [],
    allUser: [],
    //图表开关
    chart1On: true,
    chart2On: true,
    chart3On: true,
    chart4On: true,
    chart5On: true,
    chart6On: true,
    chart7On: true,
    //图表排序
    leftChartsItem: ["chart1", "chart2", "chart3", "chart4"],
    rightChartsItem: ["chart5", "chart6", "chart7"],
    isFullscreen: false,
    on1: false,
    on2: false,
  },

  mutations: {
    initPosition(state) {},
    zoom(state, type) {
      if (type == "big") {
        if (state.zoomlevel < state.maxZoom) state.zoomlevel += state.step;
      } else {
        if (state.zoomlevel > state.minZoom) state.zoomlevel -= state.step;
      }
    },
  },
  actions: {},
  modules: {},
};
