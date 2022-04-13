<template>
  <div class="layers" :style="screenStyle">
    <div class="header-layers">
      <!-- <Header /> -->
      <ToptMenu ref="topmenu" />
    </div>
    <div
      class="panel"
      :style="{ paddingTop: $store.state.layer.headerHeight + 'px' }"
    >
      <Panel />
    </div>
    <div class="middle-layers">
      <div class="left">
        <LeftMenu>
          <template v-for="item in $store.state.index.leftChartsItem">
            <div
              :class="item"
              v-if="$store.state.index[`${item}On`]"
              :key="item"
            >
              <div class="tit">
                <div class="name">{{ getChartTitle(item) }}</div>
                <div class="btn">
                  <span
                    @click="handleMonth('+', searchDate.isBefore(today))"
                    v-if="showType(item) !== 1"
                  ></span>
                  <span
                    @click="
                      handleMonth(
                        '-',
                        searchDate.isAfter(today.subtract(6, 'M'))
                      )
                    "
                    v-if="showType(item) !== 1"
                  ></span>
                </div>
              </div>
              <div
                :is="item"
                :data="getChartData(item)"
                v-if="showType(item) === 2 || showType(item) === 1"
              />

              <div class="context" v-if="showType(item) === 3">
                <div :is="item" :data="getChartData(item)" />
                <img src="@/assets/img/hu.png" alt="" />
                <div class="info">
                  <div>已完成工单:{{ chart5Data.workOrderComplete }}</div>
                  <div>待验收工单:{{ chart5Data.workOrderUnaccepted }}</div>
                  <div>超时未完成:{{ chart5Data.workOrderTimeout }}</div>
                </div>
              </div>

              <div class="context" v-if="showType(item) === 4">
                <div :is="item" :data="getChartData(item)" />
                <div class="info">
                  <div>
                    首次成功维修:{{ chart6Data.maintainFirstSuccessCnt }}%
                  </div>
                  <div>维修后复现:{{ chart6Data.maintainRecurrentCnt }}%</div>
                  <div>未完成维修:{{ chart6Data.maintainNotCnt }}</div>
                </div>
              </div>
            </div>
          </template>
        </LeftMenu>
      </div>
      <div class="center" v-if="true">
        <div class="body" :style="bodyStyle">
          <div class="map" v-if="$store.state.index.curObjLevel !== 4">
            <World ref="world" />
            <Country ref="country" />
            <Province ref="province" />
            <Citys ref="citys" />
          </div>
        </div>
        <div class="foot">
          <Box
            animateType="fadeup"
            :isShow="$store.state.panel.bodyFootMenu"
            :delay="0.5"
          >
            <div
              style="width:1165px;background:rgba(0, 0, 0, 0.521);padding-bottom: 10px;"
            >
              <Nav ref="nav" />
              <News ref="news" :data="newsData" style="margin-left:35px" />
            </div>
          </Box>
        </div>
      </div>
      <div class="right">
        <RightMenu>
          <DateTime />
          <template v-for="item in $store.state.index.rightChartsItem">
            <div
              :class="item"
              v-if="$store.state.index[`${item}On`]"
              :key="item"
            >
              <div class="tit">
                <div class="name">{{ getChartTitle(item) }}</div>
                <div class="btn">
                  <span
                    @click="handleMonth('+', searchDate.isBefore(today))"
                    v-show="showType(item) !== 1"
                  ></span>
                  <span
                    @click="
                      handleMonth(
                        '-',
                        searchDate.isAfter(today.subtract(6, 'M'))
                      )
                    "
                    v-show="showType(item) !== 1"
                  ></span>
                </div>
              </div>
              <div
                :is="item"
                :data="getChartData(item)"
                v-if="showType(item) === 2 || showType(item) === 1"
              />

              <div class="context" v-if="showType(item) === 3">
                <div :is="item" :data="getChartData(item)" />
                <img src="@/assets/img/hu.png" alt="" />
                <div class="info">
                  <div>已完成工单:{{ chart5Data.workOrderComplete }}</div>
                  <div>待验收工单:{{ chart5Data.workOrderUnaccepted }}</div>
                  <div>超时未完成:{{ chart5Data.workOrderTimeout }}</div>
                </div>
              </div>

              <div class="context" v-if="showType(item) === 4">
                <div :is="item" :data="getChartData(item)" />
                <div class="info">
                  <div>
                    首次修复率:{{ chart6Data.maintainFirstSuccessCnt }}%
                  </div>
                  <div>维修后复现:{{ chart6Data.maintainRecurrentCnt }}</div>
                  <div>未完成维修:{{ chart6Data.maintainNotCnt }}</div>
                </div>
              </div>
            </div>
          </template>
        </RightMenu>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import Header from "./header";
import ToptMenu from "./nav/topMenu";
import LeftMenu from "./nav/leftMenu";
import BottomMenu from "./nav/bottomMenu";
// import TopMenu from "./nav/topMenu";
import RightMenu from "./nav/rightMenu";
import Panel from "./panel";
import Popup from "../components/popup.vue";
import World from "../world.vue";
import Country from "../country.vue";
import Province from "../province.vue";
import Citys from "../citys.vue";
import Nav from "../components/nav";
import News from "../components/news";
import DateTime from "../components/dateTime.vue";
import chart1 from "../../components/echart/chart1";
import chart2 from "../../components/echart/chart2";
import chart3 from "../../components/echart/chart3";
import chart4 from "../../components/echart/chart4";
import chart5 from "../../components/echart/chart5";
import chart6 from "../../components/echart/chart6";
import chart7 from "../../components/echart/chart7";
import {
  dailycheck, // 今日设备点检情况
  equipmentMaintain, // 本月设备故障维修率
  equipmentWarning, // 本月设备监测预警统计
  inspectioncheck, // 今日设备巡检情况
  inspectionLineTask, // 本月输送线巡检任务统计
  inspectionTask, // 本月巡检任务执行趋势
  workOrder, // 本月工单按时完成率
  query,
} from "../api/charts";
import {
  cardSumary, // 输送线卡片模式日周月汇总
  lineInfo, // 输送线滚动信息
} from "../api/monitorLine";
export default {
  name: "layer",
  // inject: ["global"],
  components: {
    Header,
    ToptMenu,
    LeftMenu,
    RightMenu,
    // TopMenu,
    BottomMenu,
    Panel,
    Popup,
    DateTime,
    Nav,
    News,
    World,
    Province,
    Citys,
    Country,
    chart1,
    chart2,
    chart3,
    chart4,
    chart5,
    chart6,
    chart7,
  },
  data() {
    return {
      symbolList: [],
      map: {
        features: [],
      },
      show: false,
      chart1Data: {},
      chart2Data: {},
      chart3Data: {},
      chart4Data: {},
      chart5Data: {},
      chart6Data: {},
      chart7Data: {},
      newsData: [],
      paramsData: {},
      header: "",
      leftbox: "",
      rightbox: "",
      mapbox: "",
      mapShow: false,
      searchDate: dayjs(),
      today: dayjs(),
    };
  },
  watch: {
    "$store.state.index.curObjLevel"(val) {
      this.getChartsData(true);
    },
    visible(val) {
      if (val) {
        this.getsymbolLIst();
      } else {
        this.symbolList = [];
      }
    },
    "$store.state.model.curSelectModel"(mesh) {
      if (mesh.parent && mesh.parent.properties) {
        console.log(mesh.parent.properties.name);
        if (mesh.parent.properties.name == "无锡市") {
          this.show = false;
          setTimeout(() => {
            this.show = true;
            this.map = wx;
          }, 1000);
        }
      }
    },
  },
  mounted() {
    // this.$store.state.index.curObjLevel = 4;
    // this.map = js;
    // this.show = true;
    this.getChartsData(true);

    query(this.$store.state.userinfo.userCode).then((res) => {
      if (res.data) {
        const { chartListLeft, chartListRight } = res.data;
        const left = chartListLeft.split(",");
        const right = chartListRight.split(",");
        const leftItem = [],
          rightItem = [];
        left.forEach((item) => {
          leftItem.push(item.split("|")[0]);
          this.$store.state.index[`${item.split("|")[0]}On`] =
            item.split("|")[1] * 1 == 1;
        });
        right.forEach((item) => {
          rightItem.push(item.split("|")[0]);
          this.$store.state.index[`${item.split("|")[0]}On`] =
            item.split("|")[1] * 1 == 1;
        });
        this.$store.state.leftChartsItem = leftItem;
        this.$store.state.rightChartsItem = rightItem;
      }
    });
  },
  computed: {
    visible() {
      return this.$store.state.layer.popupShow;
    },
    offset() {
      return this.$store.state.screen.offset;
    },
    screenStyle() {
      const { width, height, fontSize } = this.$store.state.screen;
      const { hueRotate } = this.$store.state.layer;
      return {
        width: width + "px",
        height: height - this.offset + "px",
        fontSize: fontSize + "px",
        filter: `hue-rotate(${hueRotate}deg)`,
      };
    },
    bodyStyle() {
      const { height, sceneHeight } = this.$store.state.screen;
      return {
        height: height == sceneHeight ? "100%" : sceneHeight + "px",
      };
    },
  },
  methods: {
    getsymbolLIst(id) {
      this.symbolList = [
        {
          name: "equipment",
          url: "model/equipment.glb",
          draco: true,
          onprogress: true,
          callback: (group) => {
            console.log(group);
            // group.position.z = 0;
            group.position.set(0, -2.5, 0);
            // group.scale.set(0.0001, 0.0001, 0.0001);
          },
        },
      ];
    },
    progress(percent) {
      this.$refs.modelViewer.percent = percent;
    },

    // ======================= old
    getChartsData(init) {
      let date = this.searchDate.format("YYYY-MM");
      if (init) {
        cardSumary().then((res) => {
          if (res.success) {
            this.$store.state.index.paramsData = res.data;
          }
        });
        lineInfo().then((res) => {
          if (res.success) {
            this.newsData = res.data;
          }
        });
        dailycheck().then((res) => {
          if (res.success) {
            this.chart1Data = res.data;
          }
        });
        inspectioncheck().then((res) => {
          if (res.success) {
            this.chart2Data = res.data;
          }
        });
      }

      equipmentMaintain(date).then((res) => {
        if (res.success) {
          this.chart6Data = res.data || {};
        }
      });
      equipmentWarning(date).then((res) => {
        if (res.success) {
          this.chart7Data = { data: res.data };
        }
      });

      inspectionLineTask(date).then((res) => {
        if (res.success) {
          this.chart4Data = { data: res.data };
        }
      });
      inspectionTask(date).then((res) => {
        if (res.success) {
          this.chart3Data = { data: res.data };
        }
      });
      workOrder(date).then((res) => {
        if (res.success) {
          this.chart5Data = res.data || {};
        }
      });
    },
    getChartData(item) {
      return this[item + "Data"];
    },
    getChartTitle(item) {
      switch (item) {
        case "chart1":
          return "今日设备点检情况";
          break;
        case "chart2":
          return "今日设备巡检情况";
          break;
        case "chart3":
          return `${this.searchDate.format("MM")}月巡检任务执行趋势`;
          break;
        case "chart4":
          return `${this.searchDate.format("MM")}月输送线巡检任务统计`;
          break;
        case "chart5":
          return `${this.searchDate.format("MM")}月工单按时完成率`;
          break;
        case "chart6":
          return `${this.searchDate.format("MM")}月设备故障维修率`;
          break;
        case "chart7":
          return `${this.searchDate.format("MM")}月设备监测预警统计`;
          break;

        default:
          break;
      }
    },
    showType(item) {
      switch (item) {
        case "chart1":
          return 1;
          break;
        case "chart2":
          return 1;
          break;
        case "chart3":
          return 2;
          break;
        case "chart4":
          return 2;
          break;
        case "chart5":
          return 3;
          break;
        case "chart6":
          return 4;
          break;
        case "chart7":
          return 2;
          break;

        default:
          break;
      }
    },
    handleMonth(symbol, pass) {
      if (pass) {
        if (symbol === "-") {
          this.searchDate = this.searchDate.subtract(1, "M");
        } else {
          this.searchDate = this.searchDate.add(1, "M");
        }
        this.getChartsData();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.layers {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  z-index: 9999;
  pointer-events: none;
  .header-layers {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    pointer-events: auto;
    z-index: 999;
  }
  .panel {
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .middle-layers {
    pointer-events: none;
    display: flex;
    height: 100%;
    overflow: hidden;
    width: 100%;
    // justify-content: space-between;
    .center {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      .body {
        width: 100%;
        .map {
          pointer-events: auto;
          position: relative;
        }
      }
      .foot {
        // background: rgba(0, 0, 0, 0.521);
        // margin-bottom: 10px;
        pointer-events: auto;
      }
    }
    .left,
    .right {
      display: flex;
      flex-direction: column;
      // justify-content: center;
      height: 100%;
      margin-top: 10px;
      // position: relative;
      // &::before {
      //   content: "";
      //   position: absolute;
      //   width: 100px;
      //   height: 100%;
      //   background: linear-gradient(
      //     to right,
      //     #000 1%,
      //     transparent 90%,
      //     transparent
      //   );
      //   display: block;
      //   right: -50px;
      //   top: 0;
      // }
    }
    // .right {
    //   &::before {
    //     background: linear-gradient(
    //       to left,
    //       #000 1%,
    //       transparent 90%,
    //       transparent
    //     );
    //     left: -50px;
    //   }
    // }
    .chart1,
    .chart2,
    .chart3,
    .chart4,
    .chart5,
    .chart6,
    .chart7 {
      min-height: 150px !important;
      margin-bottom: 18px;
      width: 100%;
      .tit {
        background: url("../../assets/img/skin/blackgold/title_bg.png")
          no-repeat;
        background-size: 100% 60%;
        margin-bottom: 15px;
        font-size: 16px /* 13/80 */;
        position: relative;
        padding-left: 25px;
        height: 20px;
        font-weight: 600;
        color: #ddd;
        display: flex;
        // &::before {
        //   content: "";
        //   width: 0.15rem;
        //   height: 0.15rem;
        //   background: #ab9065;
        //   position: absolute;
        //   top: 20%;
        //   left: 0;
        // }
        &.icon {
          background: none;
          // padding-left: 0.4rem;
          // &::before {
          //   content: "";
          //   width: 0.3rem;
          //   height: 0.3rem;
          //   background: url("../assets/img/icon.png") no-repeat;
          //   background-size: 90%;
          //   position: absolute;
          //   top: -10%;
          //   left: 0;
          // }
        }
        .btn {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          top: -1px;
          span {
            cursor: pointer;
            display: inline-block;
            position: absolute;
            left: 6px;
            top: 0px;
            &:hover {
              &::after {
                border-bottom-color: #ffb835;
              }
            }
            &::after {
              content: "";
              border: 6px solid transparent;
              border-bottom: 6px solid rgba(255, 255, 255, 0.7);
              position: absolute;
              top: -4px;
              left: 0;
            }
            &:nth-child(2) {
              top: 10px;
              left: 6px;
              &::after {
                content: "";
                border: 6px solid transparent;
                border-top: 6px solid rgba(255, 255, 255, 0.7);
                position: absolute;
                top: 2px;
                left: 0;
              }
              &:hover {
                &::after {
                  border-top-color: #ffb835;
                }
              }
            }
          }
        }
      }
      .context {
        display: flex;
        align-items: center;
        .info {
          transform: scale(1);
          div {
            background: url("../../assets/img/s-box.png") no-repeat;
            background-size: 100% 100%;
            padding: 10px 15px;
            margin: 10px 0;
          }
        }
      }
    }
    .chart1,
    .chart2,
    .chart5,
    .chart6 {
      background: url("../../assets/img/skin/blackgold/title2_bg.png") no-repeat;
      background-size: 100% 100%;

      .tit {
        padding: 5px 0 0 10px;
        background: none;
      }
      // position: relative;
      // right: 0.5rem;
    }
    .chart5 {
      .tit {
        padding-top: 10px;
      }
      .context {
        height: 190px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        position: relative;
        img {
          position: absolute;
          bottom: 15px;
          left: 20px;
          width: 140px;
        }
      }
    }
    .chart6 {
      .tit {
        padding-top: 8px;
      }
      .context {
        height: 170px;
      }
    }
    .chart5,
    .chart6 {
      .info {
        position: relative;
        top: -10px;
      }
    }
  }
  .bottom-layers {
    width: 100%;
    pointer-events: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
