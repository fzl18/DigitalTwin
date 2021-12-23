<template>
  <div>
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
      handler(newData) {
        // newData.maintainFaultRate = 30;
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
