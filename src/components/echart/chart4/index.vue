<template>
  <div>
    <Chart :cdata="cdata" />
  </div>
</template>

<script>
import Chart from "./chart.vue";
export default {
  data() {
    return {
      cdata: {
        xAxis: [],
        seriesData: [],
      },
    };
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
        const xAxis = [],
          seriesData = [];
        if (newData.data) {
          newData.data.map((item) => {
            xAxis.push(item.lineName);
            seriesData.push(item.inspectionLineTask);
          });
          this.cdata.xAxis = xAxis;
          this.cdata.seriesData = seriesData;
        }
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
