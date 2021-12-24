<template>
  <div class="panel">
    <div class="dateTime"><DateTime /></div>
    <div class="level"><DateTime /></div>
  </div>
</template>

<script>
import DateTime from "../../components/dateTime.vue";
export default {
  name: "Panel",
  components: { DateTime },
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
  .dateTime {
    right: 0;
    top: 20%;
  }
  .level {
    top: 50%;
    left: 50%;
    color: var(--base-color);
  }
}
</style>
