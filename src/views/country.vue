<template>
  <Box ref="transition" :isShow="isShow">
    <div class="area" :style="{ transform: `scale(${zoomlevel})` }">
      <div class="map"><China /></div>
    </div>
  </Box>
</template>

<script>
import China from "./svgMap/countries/china.vue";
export default {
  components: {
    China,
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
      return this.$store.state.index.curObjLevel == 1;
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
