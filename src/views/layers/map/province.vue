<template>
  <Transition ref="transition" :isShow="isShow">
    <div class="area" :style="{ transform: `scale(${zoomlevel})` }">
      <div class="map"><Jiangsu /></div>
    </div>
  </Transition>
</template>

<script>
import Transition from "../../components/transition.vue";
import Jiangsu from "../../svgMap/provinces/jiangsu.vue";
export default {
  components: {
    Transition,
    Jiangsu,
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
      return this.$store.state.curObjLevel == 2;
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
