<template>
  <Box ref="transition" :isShow="isShow">
    <div class="area" :style="{ transform: `scale(${zoomlevel})` }">
      <div class="map"><Jiangsu /></div>
    </div>
  </Box>
</template>

<script>
import Jiangsu from "./svgMap/provinces/jiangsu.vue";
export default {
  components: {
    Jiangsu,
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
      return this.$store.state.index.curObjLevel == 2;
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
