<template>
  <div>
    <Echart
      :options="options"
      id="centreLeft1Chart"
      height="2.2rem"
      width="2.7rem"
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
          color: ["#eed0a7"],
          backgroundColor: new this.$echarts.graphic.RadialGradient(
            0.5,
            0.5,
            0.8,
            [
              { offset: 0, color: "transparent" },
              { offset: 0.2, color: "#000" },
              { offset: 0.34, color: "transparent" },
              { offset: 0.35, color: "#342814" },
              { offset: 0.46, color: "#282520" },
              { offset: 0.6, color: "#4B3A1D" },
              { offset: 0.64, color: "transparent" },
              { offset: 1, color: "transparent" },
            ]
          ),
          series: [
            {
              type: "gauge",
              startAngle: -130,
              endAngle: -410,
              radius: "100%",
              center: ["50%", "50%"],
              axisLine: {
                show: true,
                lineStyle: {
                  width: 2.5,
                  color: [
                    [
                      1,
                      new this.$echarts.graphic.LinearGradient(0, 1, 1, 1, [
                        { offset: 0, color: "#F0C85C" },
                        // { offset: 0.4, color: "#feaf1b" },
                        { offset: 1, color: "#0175f8" },
                      ]),
                    ],
                  ],
                  // shadowColor: [
                  //   [
                  //     1,
                  //     new this.$echarts.graphic.LinearGradient(0, 0, 1, 1, [
                  //       { offset: 0, color: "#fe1f1b" },
                  //       { offset: 0.4, color: "#feaf1b" },
                  //       { offset: 1, color: "#0175f8" },
                  //     ]),
                  //   ],
                  // ],
                  shadowBlur: 5,
                  shadowOffsetY: 10,
                },
              },
              splitLine: {
                show: false,
              },
              axisTick: {
                show: true,
                distance: 0,
                length: 4,
                lineStyle: {
                  color: "#999",
                },
              },
              axisLabel: {
                show: true,
                distance: -8,
                color: "#fff",
                fontSize: 10,
              },
              anchor: {
                show: true,
                size: 45,
                itemStyle: {
                  color: "transparent",
                  // borderColor: "#b8a372",
                  borderWidth: 0,
                  // shadowColor: "#b8a372",
                  shadowBlur: 13,
                },
              },
              pointer: {
                show: true,
                length: "50%",
                width: 2,
                offsetCenter: [0, -30],
              },
              detail: {
                formatter: ["{value}", "{p|%}"].join(""),
                fontSize: 26,
                rich: {
                  p: {
                    fontSize: 14,
                    color: "#fff",
                  },
                },
              },
              data: [
                {
                  value: newData.workOrderCompleteRate,
                  detail: {
                    show: true,
                    color: "#fff",
                    offsetCenter: ["0", "0%"],
                    formatter:
                      newData.workOrderCompleteRate === null
                        ? "--"
                        : "{value}%",
                  },
                },
              ],
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
