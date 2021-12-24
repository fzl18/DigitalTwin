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
      <div class="backBtn">返回</div>
    </div>
  </Box>
</template>

<script>
export default {
  name: "backBtn",
  inject: ["global"],
  data() {
    return {};
  },
  mounted() {},
  methods: {
    toggle() {
      const { panel } = this.$store.state;
      panel.leftMenu = !panel.leftMenu;
      panel.rightMenu = !panel.rightMenu;
    },
    handlePosition() {
      console.log(this.global.camera.position);
    },
    handleRotate() {
      this.global.controls.autoRotate = !this.global.controls.autoRotate;
    },
  },
};
</script>

<style lang="scss" scoped>
.bottomMenu {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 5px;
  position: relative;
  z-index: 777;
  .backBtn {
    border: 1px solid #fff;
    padding: 10px;
  }
}
</style>
