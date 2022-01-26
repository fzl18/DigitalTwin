<template>
  <div class="pie">
    <!-- <Highcharts :options="options" :styles="styles"></Highcharts> -->
    <Echart
      :options="options"
      id="pieChart"
      height="140px"
      width="100%"
    ></Echart>
  </div>
</template>

<script>
import Echart from "@/common/echart";
import "echarts-gl";
// import Highcharts from "@/common/highchart";
export default {
  data() {
    return {
      // styles: {
      //   height: "120px",
      //   width: "300px",
      // },
      options: {},
    };
  },
  components: {
    // Highcharts,
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
        let data = JSON.parse(JSON.stringify(newData));
        this.options = this.pie3dSet(data.val);
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    pie3dSet(data) {
      let dataSort = data.sort((a, b) => b.value - a.value);
      let res;
      res = getPie3D(data);
      //引导线
      res.series.push({
        type: "pie",
        itemStyle: {
          color: "rgba(55,55,55,0)",
        },
        clockwise: false,
        startAngle: 15,
        radius: [0, "60%"],
        label: {
          color: "#fff",
          formatter(value) {
            return `{b| ${value.name} ${value.value}%}`;
          },
          rich: {
            //值
            b: {
              color: "#fff",
              fontSize: 13,
              align: "center",
              padding: [20, 0, 10, 0],
            },
          },
        },
        labelLine: {
          showAbove: true,
          minTurnAngle: 90,
          maxSurfaceAngle: 30,
          length: 10,
          length2: 10,
          lineStyle: {
            color: "rgba(255,255,255,1)",
            cap: "round",
          },
        },
        //设置引导线和文字位置
        labelLayout: {},
        data: [
          { value: dataSort[0].value, name: dataSort[0].name },
          { value: dataSort[1].value, name: dataSort[1].name },
          { value: dataSort[2].value, name: dataSort[2].name },
        ],
        zlevel: 0,
      });

      return res;

      // 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
      function getParametricEquation(
        startRatio,
        endRatio,
        isSelected,
        isHovered,
        k
      ) {
        // 计算
        let midRatio = (startRatio + endRatio) / 2;
        let startRadian = startRatio * Math.PI * 2;
        let endRadian = endRatio * Math.PI * 2;
        let midRadian = midRatio * Math.PI * 2;

        // 如果只有一个扇形，则不实现选中效果。
        if (startRatio === 0 && endRatio === 1) {
          isSelected = false;
        }

        // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
        // k = typeof k !== "undefined" ? k : 1 / 3;

        // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
        let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
        let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;

        // 计算高亮效果的放大比例（未高亮，则比例为 1）
        let hoverRate = isHovered ? 1.05 : 1;

        // 返回曲面参数方程
        return {
          u: {
            min: -Math.PI,
            max: Math.PI * 3,
            step: Math.PI / 32,
          },

          v: {
            min: 0,
            max: Math.PI * 2,
            step: Math.PI / 20,
          },

          x: function(u, v) {
            if (u < startRadian) {
              return (
                offsetX +
                Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
              );
            }
            if (u > endRadian) {
              return (
                offsetX +
                Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
              );
            }
            return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
          },

          y: function(u, v) {
            if (u < startRadian) {
              return (
                offsetY +
                Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
              );
            }
            if (u > endRadian) {
              return (
                offsetY +
                Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
              );
            }
            return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
          },

          z: function(u, v) {
            if (u < -Math.PI * 0.5) {
              return Math.sin(u);
            }
            if (u > Math.PI * 2.5) {
              return Math.sin(u);
            }
            return Math.sin(v) > 0 ? 1 : -1;
          },
        };
      }

      // 生成模拟 3D 饼图的配置项
      function getPie3D(pieData) {
        let series = [];
        let sumValue = 0;
        let startValue = 0;
        let endValue = 0;
        let k = 1;
        // 为每一个饼图数据，生成一个 series-surface 配置
        for (let i = 0; i < pieData.length; i++) {
          sumValue += pieData[i].value;

          let seriesItem = {
            name:
              typeof pieData[i].name === "undefined"
                ? `series${i}`
                : pieData[i].name,
            type: "surface",
            parametric: true,
            wireframe: {
              show: false,
            },
            pieData: pieData[i],
            pieStatus: {
              selected: false,
              hovered: false,
              k: k,
            },
            center: ["10%", "50%"],
          };

          if (typeof pieData[i].itemStyle != "undefined") {
            let itemStyle = {};

            typeof pieData[i].itemStyle.color != "undefined"
              ? (itemStyle.color = pieData[i].itemStyle.color)
              : null;
            typeof pieData[i].itemStyle.opacity != "undefined"
              ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
              : null;

            seriesItem.itemStyle = itemStyle;
          }
          series.push(seriesItem);
        }

        // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
        // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
        for (let i = 0; i < series.length; i++) {
          endValue = startValue + series[i].pieData.value;
          series[i].pieData.startRatio = startValue / sumValue;
          series[i].pieData.endRatio = endValue / sumValue;
          series[i].parametricEquation = getParametricEquation(
            series[i].pieData.startRatio,
            series[i].pieData.endRatio,
            true,
            false,
            1
          );
          startValue = endValue;
        }

        // 准备待返回的配置项，把准备好的 legendData、series 传入。
        let option = {
          animation: false,
          tooltip: {
            show: false,
            formatter: (params) => {
              if (params.seriesName !== "mouseoutSeries") {
                return `${
                  params.seriesName
                }<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${
                  params.color
                };"></span>${option.series[params.seriesIndex].pieData.value}%`;
              }
            },
          },
          xAxis3D: {
            min: -1.3,
            max: 1.3,
          },
          yAxis3D: {
            min: -1.3,
            max: 1.3,
          },
          zAxis3D: {
            min: -1.3,
            max: 1.3,
          },
          grid3D: {
            show: false,
            boxHeight: 15,
            boxWidth: 130,
            boxDepth: 150,
            left: "0",
            top: "0",
            viewControl: {
              alpha: 20,
              beta: 0,
              projection: "orthographic",
              rotateSensitivity: 0,
              zoomSensitivity: 0,
              panSensitivity: 0,
              // autoRotate: true,
              damping: 1,
              distance: 200, //视距
            },
          },
          series: series,
        };
        return option;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.pie {
  background: url("../../../assets/img/skin/blackgold/pie_bg.png") no-repeat;
  background-position: center 45px;
  background-size: 120% 60%;
}
#pieChart {
  position: relative;
  top: -15px;
  pointer-events: none;
}
</style>
