<template>
  <div>
    <Echart
      :options="options"
      id="centreLeft1Chart"
      height="1.15rem"
      width="2.5rem"
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
          series: [
            {
              type: "gauge",
              startAngle: 180,
              endAngle: 0,
              radius: "130%",
              center: ["50%", "100%"],
              axisLabel: {
                show: false,
              },
              axisTick: {
                show: false,
                length: "3%",
                distance: -15,
              },
              splitLine: {
                show: false,
              },
              axisLine: {
                show: true,
                lineStyle: {
                  width: 80,
                  color: [
                    [
                      1,
                      new this.$echarts.graphic.RadialGradient(0.5, 1, 1, [
                        { offset: 0, color: "#666" },
                        { offset: 0.75, color: "#222" },
                        { offset: 0.75, color: "transparent" },
                      ]),
                    ],
                  ],
                },
              },
              pointer: {
                show: false,
                length: "40%",
                width: 2,
                offsetCenter: [0, -40],
              },
              progress: {
                show: false,
                overlap: true,
                width: 20,
                // roundCap: true
                itemStyle: {
                  color: "rgba(211, 72, 72, 1)",
                },
              },
              data: [
                {
                  value: newData.maintainFaultRate,
                  itemStyle: {
                    // color: "rgba(255, 255, 255, 1)",
                  },
                  detail: {
                    show: false,
                    color: "#fff",
                    offsetCenter: ["0", "-40%"],
                  },
                },
              ],
            },
            {
              type: "gauge",
              startAngle: 180,
              endAngle: 0,
              radius: "200%",
              center: ["50%", "100%"],
              axisLabel: {
                show: false,
              },
              axisTick: {
                show: false,
                length: "3%",
                distance: -15,
              },
              splitLine: {
                show: false,
              },
              axisLine: {
                show: false,
                lineStyle: {
                  width: 20,
                  // color: [
                  //   [
                  //     1,
                  //     new this.$echarts.graphic.LinearGradient(0, 0, 1, 1, [
                  //       { offset: 0, color: "#564008" },
                  //       { offset: 1, color: "#000" },
                  //     ]),
                  //   ],
                  // ],
                },
              },
              progress: {
                show: true,
                overlap: true,
                width: 25,
                // roundCap: true
                itemStyle: {
                  color: new this.$echarts.graphic.LinearGradient(1, 0, 0, 1, [
                    { offset: 1, color: "#054FCA" },
                    { offset: 0, color: "#000" },
                  ]),
                },
              },
              pointer: {
                show: false,
                length: "40%",
                width: 2,
                showAbove: true,
                offsetCenter: [0, -45],
              },
              detail: {
                formatter: ["{value}", "{p|%}"].join(""),
                fontSize: 24,
                rich: {
                  p: {
                    fontSize: 14,
                    color: "#fff",
                  },
                },
              },
              data: [
                {
                  value: newData.maintainFaultRate,
                  width: 30,
                  itemStyle: {
                    // color: "rgba(255, 255, 255, 1)",
                  },
                  detail: {
                    show: true,
                    color: "#fff",
                    offsetCenter: ["0", "-15%"],
                    formatter:
                      newData.maintainFaultRate === null ? "--" : "{value}%",
                  },
                },
              ],
            },
            this.dashedLine(200, 9, 5),
            this.dashedLine(180, 8),
            this.dashedLine(160, 7),
            this.dashedLine(140, 6, 4),
            {
              type: "gauge",
              startAngle: 180,
              endAngle: 0,
              radius: "200%",
              center: ["50%", "100%"],
              z: 10,
              axisLabel: {
                show: false,
              },
              axisTick: {
                show: false,
                length: "3%",
                distance: -15,
              },
              splitLine: {
                show: false,
              },
              axisLine: {
                show: false,
                lineStyle: {
                  width: 20,
                  // color: [
                  //   [
                  //     1,
                  //     new this.$echarts.graphic.LinearGradient(0, 0, 1, 1, [
                  //       { offset: 0, color: "#564008" },
                  //       { offset: 1, color: "#000" },
                  //     ]),
                  //   ],
                  // ],
                },
              },
              progress: {
                show: false,
                overlap: true,
                width: 25,
                // roundCap: true
                itemStyle: {
                  color: new this.$echarts.graphic.LinearGradient(1, 0, 0, 1, [
                    { offset: 1, color: "#054FCA" },
                    { offset: 0, color: "#000" },
                  ]),
                },
              },
              pointer: {
                show: true,
                length: "40%",
                width: 2,
                showAbove: true,
                offsetCenter: [0, -40],
              },
              detail: {
                formatter: ["{value}", "{p|%}"].join(""),
                fontSize: 24,
                rich: {
                  p: {
                    fontSize: 14,
                    color: "#fff",
                  },
                },
              },
              data: [
                {
                  value: newData.maintainFaultRate,
                  width: 30,
                  itemStyle: {
                    // color: "rgba(255, 255, 255, 1)",
                  },
                  detail: {
                    show: false,
                    color: "#fff",
                    offsetCenter: ["0", "-15%"],
                  },
                },
              ],
            },
            {
              type: "gauge",
              startAngle: 180,
              endAngle: 0,
              radius: "200%",
              center: ["50%", "100%"],
              axisLabel: {
                show: false,
              },
              axisTick: {
                show: false,
                length: "3%",
                distance: -15,
              },
              splitLine: {
                show: false,
              },
              axisLine: {
                show: false,
                lineStyle: {
                  width: 25,
                  // color: [
                  //   [
                  //     1,
                  //     new this.$echarts.graphic.LinearGradient(0, 0, 1, 1, [
                  //       { offset: 0, color: "#fff" },
                  //       { offset: 1, color: "transparent" },
                  //     ]),
                  //   ],
                  // ],
                },
              },
              progress: {
                show: true,
                overlap: false,
                width: 25,
                // roundCap: true
                itemStyle: {
                  color: new this.$echarts.graphic.LinearGradient(1, 1, 0, 0, [
                    { offset: 1, color: "#564008" },
                    { offset: 0.6, color: "#564008" },
                    { offset: 0, color: "#000" },
                  ]),
                },
              },
              pointer: {
                show: false,
                length: "40%",
                width: 2,
                offsetCenter: [0, -45],
              },
              detail: {
                formatter: ["{value}", "{p|%}"].join(""),
                fontSize: 24,
                rich: {
                  p: {
                    fontSize: 14,
                    color: "#fff",
                  },
                },
              },
              data: [
                {
                  value: 100, //newData.maintainFaultRate,
                  width: 30,
                  itemStyle: {
                    // color: "rgba(255, 255, 255, 1)",
                  },
                  detail: {
                    show: false,
                    color: "#fff",
                    offsetCenter: ["0", "-15%"],
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
  methods: {
    dashedLine(r, i, w = 5) {
      return {
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        radius: `${r}%`,
        center: ["50%", "100%"],
        z: i,
        axisLabel: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        progress: {
          show: true,
          width: 0,
          itemStyle: {
            // color: "#fff",
            borderType: "dashed",
            borderDashOffset: w,
            borderColor: "rgba(255,255,255,0.3)",
            borderWidth: 1,
          },
        },
        pointer: {
          show: false,
        },
        detail: {},
        data: [
          {
            value: 100,
            detail: {
              show: false,
            },
          },
        ],
      };
    },
  },
};
</script>

<style lang="scss" scoped></style>
