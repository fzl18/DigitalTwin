<template>
  <Transition ref="transition" :isShow="isShow">
    <div class="area" :style="{ transform: `scale(${zoomlevel})` }">
      <div class="map"><Wuxi /></div>
    </div>
  </Transition>
</template>

<script>
import Transition from "../../components/transition.vue";
import Wuxi from "../../svgMap/citys/wuxi.vue";
export default {
  components: {
    Transition,
    Wuxi,
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
      return this.$store.state.curObjLevel == 3;
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
