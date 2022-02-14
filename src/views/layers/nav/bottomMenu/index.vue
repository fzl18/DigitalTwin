<template>
  <Box
    animateType="fadeup"
    :isShow="$store.state.panel.bottomMenu"
    :delay="0.8"
  >
    <div
      class="bottomMenu"
      :style="{
        width: $store.state.screen.width + 'px',
      }"
    >
      <div class="left">left</div>
      <div class="middle">
        <ul>
          <li @click="$store.state.navBar.on2 = !$store.state.navBar.on2">
            显示帧数
          </li>
          <li @click="toggle">
            显示菜单
          </li>
          <li @click="handlePosition">
            camera位置
          </li>
          <li @click="handlePosition">
            切换控制器
          </li>
          <li @click="handleRotate">
            旋转
          </li>
          <li
            @click="
              $store.state.layer.alarm = $store.state.layer.alarm
                ? null
                : 'error'
            "
          >
            报警
          </li>
          <li @click="global.renderer.setSize(800, 600)">
            窗口大小
          </li>
          <li @click="openWin">
            弹窗
          </li>
          <li @click="clearScene">
            清队场景
          </li>
        </ul>
      </div>
      <div class="right">right</div>
    </div>
    <div class="bottomMenuBg"></div>
  </Box>
</template>

<script>
export default {
  name: "bottomMenu",
  // inject: ["global"],
  data() {
    return {
      list: [
        {
          name: "镜头变换",
          action: null,
        },
        {
          name: "物品隐藏",
          action: null,
        },
        {
          name: "更改材质",
          action: null,
        },
        {
          name: "动画启停",
          action: null,
        },
      ],
    };
  },
  mounted() {},
  methods: {
    // toggle() {
    //   const { panel } = this.$store.state;
    //   panel.leftMenu = !panel.leftMenu;
    //   panel.rightMenu = !panel.rightMenu;
    // },
    // handlePosition() {
    //   console.log(this.global.camera.position);
    // },
    // handleRotate() {
    //   this.global.controls.autoRotate = !this.global.controls.autoRotate;
    // },
    // openWin() {
    //   this.$store.state.layer.popupShow = true;
    // },
    // clearScene() {
    //   console.log(this.global.scene);
    //   // this.global.scene.visible = false
    //   this.global.scene.clear();
    //   this.global.renderer.dispose();
    // },
  },
};
</script>

<style lang="scss" scoped>
.bottomMenu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 5px;
  position: relative;
  z-index: 777;
  .left,
  .right {
    width: 300px;
  }
  .middle {
    li {
      display: inline-block;
      padding: 0 5px;
      margin: 0 10px;
      border-left: 15px solid rgb(18, 227, 255);
      cursor: pointer;
    }
  }
}
.bottomMenuBg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
}
</style>
