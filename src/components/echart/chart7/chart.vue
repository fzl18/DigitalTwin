<template>
  <div>
    <Echart
      :options="options"
      id="centreLeft1Chart"
      :height="$store.state.index.isFullscreen ? '300px' : '270px'"
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
            right: "10%",
            top: "0%",
            bottom: "5%",
            containLabel: true,
          },
          xAxis: {
            type: "value",
            axisLine: {
              show: true,
              lineStyle: {
                type: "dashed",
                color: "#5C4313",
              },
            },
            axisLabel: {
              fontSize: 12,
              color: "#ccc",
            },
            // splitLine: {
            //   show: true,
            //   lineStyle: {
            //     type: "dashed",
            //     color: "#5C4313",
            //   },
            // },

            // data: newData.seriesData,
          },
          yAxis: {
            type: "category",
            data: newData.xAxis,
            axisLine: {
              show: true,
              lineStyle: {
                type: "dashed",
                color: "#5C4313",
              },
            },
            axisLabel: {
              fontSize: 13,
              color: "#ccc",
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
                color: "#5C4313",
              },
            },
          },
          barMaxWidth: 13,
          series: [
            {
              data: newData.seriesData,
              type: "bar",
              showBackground: true,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 1, [
                { offset: 0, color: "#1F180C" },
                { offset: 0.3, color: "#B39857" },
                { offset: 1, color: "#EED986" },
              ]),
              backgroundStyle: {
                color: "rgba(180, 180, 180, 0.2)",
              },
              itemStyle: {
                decal: {
                  symbol: "rect",
                  symbolSize: 3,
                  color: "rgba(0, 0, 0, 1)",
                  dashArrayX: [1, 5],
                  dashArrayY: [0.5],
                },
              },
              label: {
                show: true,
                position: "right",
                color: "#fff",
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

<style lang="scss" scoped></style>
