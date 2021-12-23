<template>
  <div style="height:180px">
    <Echart :options="options" id="Chart3" height="100%" width="5rem"></Echart>
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
            right: "1.7%",
            top: "11%",
            bottom: "0%",
            containLabel: true,
          },
          legend: {
            itemWidth: 8,
            itemHeight: 8,
            top: -3,
            textStyle: {
              fontSize: 10,
            },
            data: [
              { name: "应巡", icon: "rect" },
              { name: "实巡", icon: "rect" },
              { name: "漏检", icon: "rect" },
            ],
          },
          color: ["#D9A250", "#6E6E6E", "#0060FF"],
          xAxis: [
            {
              type: "category",
              boundaryGap: false,
              data: newData.xAxis,
              axisLabel: {
                fontSize: 10,
                color: "#ccc",
              },
              axisTick: {
                show: true,
                alignWithLabel: true,
                lineStyle: {
                  color: "#fff",
                },
              },
            },
          ],
          yAxis: {
            type: "value",
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
                color: "#333",
              },
            },
            axisLabel: {
              formatter: "{value}",
              fontSize: 10,
              color: "#ccc",
            },
          },
          series: [
            {
              name: "实巡",
              type: "line",
              smooth: 0.3,
              symbol: "none",
              data: newData.seriesData.taskActual,
              areaStyle: {
                opacity: 0.7,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#8B662D",
                  },
                  {
                    offset: 1,
                    color: "rgba(0,0,0,0)",
                  },
                ]),
              },
              // markLine: {
              //   symbol: "none",
              //   label: { show: false },
              //   lineStyle: {
              //     color: "rgba(234, 33, 33, 1)",
              //   },
              //   data: [
              //     {
              //       name: "实巡",
              //       yAxis: "13",
              //     },
              //   ],
              //   silent: true,
              // },
            },
            {
              name: "漏检",
              type: "line",
              smooth: 0.3,
              symbol: "none",
              data: newData.seriesData.taskMissed,
              areaStyle: {
                opacity: 0.8,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#5D5D5C",
                  },
                  {
                    offset: 1,
                    color: "rgba(0,0,0,0.3)",
                  },
                ]),
              },
            },
            {
              name: "应巡",
              type: "line",
              smooth: 0.3,
              symbol: "none",
              lineStyle: {
                type: [3, 3],
                dashOffset: 2,
                width: 1.5,
              },
              data: newData.seriesData.task,
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
