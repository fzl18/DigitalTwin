<template>
  <div class="bar">
    <Echart
      :options="options"
      id="centreLeft1Chart"
      height="100%"
      width="100%"
    ></Echart>
  </div>
</template>

<script>
import Echart from "@/common/echart";
export default {
  data() {
    return {
      options: {},
    };
  },
  components: {
    Echart,
  },
  props: {
    cdata: {
      type: Object,
      default: () => ({}),
    },
  },

  watch: {
    cdata: {
      handler(newData) {
        this.options = {
          grid: {
            left: "0%",
            right: "5%",
            top: "5%",
            bottom: "0%",
            containLabel: true,
          },
          xAxis: {
            type: "category",
            data: this.cdata.xAxis,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
              alignWithLabel: true,
              lineStyle: {
                color: "#bbb",
              },
            },
            axisLabel: {
              interval: 0,
              rotate: 90,
              fontSize: 10,
              color: "#ccc",
              ellipsis: "...",
              width: 60,
              overflow: "truncate",
            },
          },
          yAxis: {
            type: "value",
            axisLabel: {
              fontSize: 10,
              color: "#ccc",
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#555",
              },
            },
          },
          barMaxWidth: 15,
          series: [
            {
              name: "柱顶部",
              type: "pictorialBar",
              symbolSize: [15, 5],
              symbolOffset: [0, 0],
              z: 16,
              itemStyle: {
                color: "#62C4F9",
              },

              symbolPosition: "end",
              data: this.cdata.seriesData,
            },
            {
              name: "柱底部",
              type: "pictorialBar",
              symbolSize: [15, 5],
              symbolOffset: [0, 0],
              z: 16,
              itemStyle: {
                color: "#2B478A",
              },
              data: this.cdata.seriesData,
            },
            {
              data: this.cdata.seriesData,
              type: "bar",
              silent: true,
              showBackground: true,
              backgroundStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 1, color: "transparent" },
                  { offset: 0.3, color: "#251F14" },
                ]),
                borderRadius: [6, 6, 6, 6],
              },
              itemStyle: {
                borderRadius: 4,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 1, color: "rgba(3, 137, 234, 0.01)" },
                  { offset: 0, color: "#0389EA" },
                ]),
              },
            },
          ],
        };
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.bar {
  height: 190px;
  background: url("../../../assets/img/skin/blackgold/chart_bg.png") no-repeat;
  background-size: 100% 82%;
  background-position: 25px 10px;
}
</style>
