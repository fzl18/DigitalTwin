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
        seriesData: {
          task: [],
          taskActual: [],
          taskMissed: [],
        },
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
          task = [],
          taskMissed = [],
          taskActual = [];
        if (newData.data) {
          newData.data.map((item) => {
            xAxis.push(item.taskDay);
            task.push(item.inspectionTask);
            taskMissed.push(item.inspectionTaskMissed);
            taskActual.push(item.inspectionTaskActual);
          });
          this.cdata.xAxis = xAxis;
          this.cdata.seriesData.task = task;
          this.cdata.seriesData.taskActual = taskActual;
          this.cdata.seriesData.taskMissed = taskMissed;
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
