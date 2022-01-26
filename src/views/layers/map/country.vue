<template>
  <Transition ref="transition" :isShow="isShow">
    <div class="area" :style="{ transform: `scale(${zoomlevel})` }">
      <div class="map"><China /></div>
    </div>
  </Transition>
</template>

<script>
import Transition from "../../components/transition.vue";
import China from "../../svgMap/countries/china.vue";
export default {
  components: {
    Transition,
    China,
  },
  data() {
    return {};
  },
  mounted() {},
  computed: {
    zoomlevel() {
      return this.$store.state.zoomlevel;
    },
    isShow() {
      return this.$store.state.curObjLevel == 1;
    },
  },
  methods: {
    init() {},
  },
};
</script>

<style lang="scss" scoped>
.area {
  transition: transform 0.5s;
  transform-origin: center;
  position: relative;
  .map {
    position: relative;
    z-index: 99;
  }
}
</style>
