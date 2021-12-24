<template>
  <Box animateType="fadedown" :isShow="$store.state.panel.header">
    <div class="headerBg"></div>
    <div
      class="header"
      :style="{
        width: $store.state.screen.width + 'px',
      }"
    >
      <div class="left">left</div>
      <div class="middle">
        <div class="title">管理驾驶指挥舱</div>
        <div>Management Cockpit</div>
      </div>
      <div class="right"><TopMenu /></div>
    </div>
  </Box>
</template>
<script>
import TopMenu from "../nav/topMenu";
export default {
  name: "HeaderLogo",
  data() {
    return {};
  },
  components: {
    TopMenu,
  },
};
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  padding: 10px 5px;
  position: relative;
  z-index: 777;
  .left,
  .right {
    width: 300px;
  }
  .middle {
    .title {
      font-size: 30px;
      line-height: 30px;
      font-weight: bold;
      background-image: linear-gradient(
        180deg,
        #fff,
        rgb(255, 233, 161),
        rgb(248, 207, 71),
        rgb(255, 233, 161),
        #fff
      );
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
    }
  }
}
.headerBg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
}
</style>
