<template>
  <div class="panel">
    <div class="dateTime"><DateTime /></div>
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
.panel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .dateTime {
    position: absolute;
    right: 0;
    top: 20%;
  }
}
</style>
