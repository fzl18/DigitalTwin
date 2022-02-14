<template>
  <Box ref="transition" :isShow="isShow">
    <div class="area" :style="{ transform: `scale(${zoomlevel})` }">
      <div class="map"><Wuxi /></div>
    </div>
  </Box>
</template>

<script>
import Wuxi from "./svgMap/citys/wuxi.vue";
export default {
  components: {
    Wuxi,
  },
  data() {
    return {};
  },
  mounted() {},
  computed: {
    zoomlevel() {
      return this.$store.state.index.zoomlevel;
    },
    isShow() {
      return this.$store.state.index.curObjLevel == 3;
    },
  },
  methods: {
    init() {},
  },
};
</script>

<style lang="scss" scoped>
.area {
  position: absolute;
  width: 100%;
  .map {
    position: relative;
    z-index: 99;
  }
}
</style>
