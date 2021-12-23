<template>
  <div class="layers" :style="screenStyle">
    <div class="header-layers"><Header /></div>
    <div class="panel">
      <Panel />
    </div>
    <div class="middle-layers">
      <div class="left" :style="{ top: -offset / 2 + 'px' }">
        <LeftMenu />
      </div>
      <div class="right" :style="{ top: -offset / 2 + 'px' }">
        <RightMenu />
      </div>
    </div>
    <div class="bottom-layers" :style="{ bottom: offset + 'px' }">
      <BottomMenu />
    </div>
  </div>
</template>

<script>
import Header from "./header";
import LeftMenu from "./nav/leftMenu";
import BottomMenu from "./nav/bottomMenu";
// import TopMenu from "./nav/topMenu";
import RightMenu from "./nav/rightMenu";
import Panel from "./panel";
export default {
  name: "layer",
  components: {
    Header,
    LeftMenu,
    RightMenu,
    // TopMenu,
    BottomMenu,
    Panel,
  },
  data() {
    return {};
  },
  mounted() {},
  computed: {
    offset() {
      return this.$store.state.screen.offset;
    },
    screenStyle() {
      const { width, height, fontSize } = this.$store.state.screen;
      const { hueRotate } = this.$store.state.layer;
      return {
        width: width + "px",
        height: height + "px",
        fontSize: fontSize + "px",
        filter: `hue-rotate(${hueRotate}deg)`,
      };
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.layers {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  color: #fff;
  z-index: 999;
  pointer-events: none;
  .header-layers {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: auto;
    z-index: 999;
  }
  .middle-layers {
    pointer-events: auto;
    .left,
    .right {
      position: absolute;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
    }
    .left {
      left: 0;
    }
    .right {
      right: 0;
    }
  }
  .bottom-layers {
    position: absolute;
    left: 0;
    width: 100%;
    pointer-events: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
