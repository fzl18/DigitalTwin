<template>
  <div class="status">stats</div>
</template>
<script>
import Stats from "stats.js";
export default {
  name: "TStats",
  inject: ["global"],
  mounted() {
    let newPanel = new Stats();
    // this.stats.addPanel(newPanel);
    // this.stats.showPanel(3);
    document.body.appendChild(newPanel.dom);
    this.$set(this.global, "stats", newPanel);
  },
};
</script>
<style lang="scss" scoped>
.status {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
}
</style>
