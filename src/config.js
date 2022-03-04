export default {
  //屏设置
  screen: {
    backgroundColor: "linear-gradient(#6b4815 20%,transparent ,#000)", // 背景颜色
    width: 1920, // 屏宽 用来适应各分辨率下，保持 屏宽高比
    height: 1080, //屏高 用来适应各分辨率下，保持 屏宽高比
    fontSize: 14, //默认字体大小
    maskEnable: true, // 是否开启遮罩
    maskColor: "#000", // 视窗遮罩颜色
    sceneWidth: 1920, // 场景宽
    sceneHeight: 1080, // 场景高
    modelCache: true, // 模型缓存
  },
  //动画效果设置
  animationEffect: {
    animateType: "fadeleft", // 动画类型
    duration: 0.3, // 持续时间 单位:s
    delay: 0, // 延时 单位:s
  },
  //图层设置
  layer: {
    skin: "blue", // 皮肤
    hueRotate: 0, // 色相角度 0 ~ 360
    grayscale: 0, // 灰度
    brightness: 100, // 亮度
    contrast: 100, // 对比度
    saturate: 100, // 饱和度
    opacity: 100, //透明度
    sepia: 0, // 深褐色（老照片效果）
    warnbgColor: "orange",
    errorbgColor: "red",
    headerHeight: 80, // 顶部高度
    leftSideWidth: 340, // 左侧栏
    rightSideWidth: 340, // 右侧栏
  },
  //相机配置项：
  camera: {
    enabled: true, // 允许用户控制视野
    enableDamping: true, // 启用阻尼
    dampingFactor: 0.1, // 动态阻尼系数 就是鼠标拖拽旋转,灵敏度
    enableZoom: true, // 是否可以缩放
    autoRotate: false, // 是否自动旋转
    autoRotateSpeed: 1.0, // 自动旋转速度
    minDistance: 0.9, // 设置相机距离原点的最小距离
    maxDistance: 28, // 设置相机距离原点的最远距离
    enablePan: true, // 是否开启右键拖拽
    maxPolarAngle: Math.PI,
    enableKeys: true, // 启用键盘控制
  },
};
