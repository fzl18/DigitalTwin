<template>
  <div class="panel">
    sdfefsdfefe
  </div>
</template>

<script>
export default {
  name: "Panel",
  computed: {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
:root {
  --base-color: #999;
}
.panel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  & > div {
    position: absolute;
  }
  .level {
    top: 50%;
    left: 50%;
    color: var(--base-color);
  }
}
</style>
