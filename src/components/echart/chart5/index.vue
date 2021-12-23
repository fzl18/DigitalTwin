<template>
  <div class="over">
    <Chart :cdata="data" />
  </div>
</template>

<script>
import Chart from "./chart.vue";
export default {
  data() {
    return {};
  },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    Chart,
  },
  watch: {
    data: {
      handler(newData) {},
      immediate: true,
      deep: true,
    },
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.over {
  overflow: hidden;
  height: 2.2rem;
}
</style>
