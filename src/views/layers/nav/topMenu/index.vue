<template>
  <Box animateType="fadedown" :isShow="$store.state.panel.header">
    <div class="topMenu">
      <div class="head">
        <div class="top">
          <div class="logo">
            <!-- <img src="@/assets/img/logo.png" alt="" /> -->
          </div>
          <div>
            <Params class="params" />
          </div>
          <div class="rbox">
            <div class="user">
              <span :title="userinfo.topUnitName" class="unit">{{
                userinfo.topUnitName
              }}</span>
              - {{ userinfo.userName }}
              <span v-if="userinfo.topUnitName" class="logout" @click="logout"
                >退出</span
              >
            </div>
            <div class="btn">
              <span @click="handleOpen('messages')"></span>
              <span @click="handleOpen('setting')"></span>
              <!-- <span @click="handleOpen('lang')">
            <div class="lang">
              <div class="list">
                <div class="item">中文</div>
              </div>
            </div>
          </span> -->
              <span
                :style="small"
                ref="fullScreen"
                @click="handleOpen('fullScreen')"
              ></span>
            </div>
          </div>
        </div>

        <Popup :visible.sync="visible">
          <div class="list" v-if="type == 'messages'">
            <div class="title"><span>消息中心 News</span></div>
            <div class="item" v-for="(item, index) in lists" :key="index">
              {{ item }}
            </div>
          </div>
          <div class="list" v-if="type == 'setting'">
            <div class="title"><span>图表配置 Setting</span></div>
            <div class="setting">
              <div class="left">
                <div class="title">
                  图表拖动排序<span class="restBtn" @click="rest">重置</span
                  ><span class="restBtn" @click="save">保存 </span
                  ><span v-if="saveOK" class="tip">保存成功</span>
                </div>
                <div class="sort">
                  <div class="leftsort">
                    <div>左列</div>
                    <Draggable
                      v-model="$store.state.index.leftChartsItem"
                      group="site"
                      animation="300"
                      dragClass="dragClass"
                      ghostClass="ghostClass"
                      chosenClass="chosenClass"
                    >
                      <transition-group>
                        <template
                          v-for="item in $store.state.index.leftChartsItem"
                        >
                          <div
                            class="item"
                            :key="item"
                            :class="item"
                            v-if="$store.state.index[`${item}On`]"
                          >
                            <span>{{ chartName(item) }}</span>
                          </div>
                        </template>
                      </transition-group>
                    </Draggable>
                  </div>
                  <div class="rightsort">
                    <div>右列</div>
                    <Draggable
                      v-model="$store.state.index.rightChartsItem"
                      group="site"
                      animation="100"
                      dragClass="dragClass"
                      ghostClass="ghostClass"
                      chosenClass="chosenClass"
                    >
                      <transition-group>
                        <template
                          v-for="item in $store.state.index.rightChartsItem"
                        >
                          <div
                            class="item"
                            :key="item"
                            :class="item"
                            v-if="$store.state.index[`${item}On`]"
                          >
                            <span>{{ chartName(item) }}</span>
                          </div>
                        </template>
                      </transition-group>
                    </Draggable>
                  </div>
                </div>
              </div>
              <div class="right">
                <div class="title">图表显示开关</div>
                <div class="ls" v-for="(item, index) in chartList" :key="index">
                  <span>{{ item }}</span>
                  <el-switch
                    v-model="$store.state.index[`chart${index + 1}On`]"
                    active-color="#ad964f"
                    inactive-color="#999"
                  >
                  </el-switch>
                </div>
              </div>
            </div>
          </div>
        </Popup>
      </div>
    </div>
  </Box>
</template>

<script>
import Params from "@/views/components/params";
import Popup from "@/views/components/popup";
import { lineInfo } from "@/views/api/monitorLine";
import { addOrUpdate } from "@/views/api/charts";
import screenfull from "screenfull";
import Draggable from "vuedraggable";
import api from "@/views/api/common";
export default {
  name: "topMenu",
  data() {
    return {
      userinfo: this.$store.state.userinfo,
      visible: false,
      lists: [],
      type: "",
      saveOK: false,
      chartList: [
        "今日设备点检情况",
        "今日设备巡检情况",
        "本月巡检任务执行趋势(MTD)",
        "本月输送线巡检任务统计",
        "本月工单按时完成率",
        "本月设备故障维修率",
        "本月设备监测预警统计",
      ],
    };
  },
  components: {
    Params,
    Popup,
    Draggable,
  },
  computed: {
    small() {
      let style = {};
      if (this.$store.state.index.isFullscreen) {
        style = {
          "background-position-x": "-400px",
        };
      }
      return style;
    },
  },
  mounted() {},
  methods: {
    screenfull() {
      screenfull.toggle();
      this.$store.state.index.isFullscreen = !screenfull.isFullscreen;
    },
    logout() {
      let href = window.location.href;
      const url = `${api.logout}?redirectUrl=${href}`;
      window.location.href = url;
    },
    handleOpen(type) {
      switch (type) {
        case "setting":
          this.type = type;
          this.visible = true;
          break;
        case "messages":
          this.type = type;
          this.getNews();
          this.visible = true;
          break;
        case "lang":
          break;
        case "fullScreen":
          screenfull.toggle();
          this.$store.state.index.isFullscreen = !screenfull.isFullscreen;
          break;
        default:
          break;
      }
    },
    getNews() {
      lineInfo().then((res) => {
        if (res.success) {
          this.lists = res.data;
        }
      });
    },

    rest() {
      this.$store.state.index.leftChartsItem = [
        "chart1",
        "chart2",
        "chart3",
        "chart4",
      ];
      this.$store.state.index.rightChartsItem = ["chart5", "chart6", "chart7"];
    },
    save() {
      const { leftChartsItem, rightChartsItem } = this.$store.state.index;
      const chartListLeft = [],
        chartListRight = [];
      leftChartsItem.map((item) => {
        let isShow = this.$store.state.index[`${item}On`] ? 1 : 0;
        item = item + `|${isShow}`;
        chartListLeft.push(item);
      });
      rightChartsItem.map((item) => {
        let isShow = this.$store.state.index[`${item}On`] ? 1 : 0;
        item = item + `|${isShow}`;
        chartListRight.push(item);
      });
      addOrUpdate({
        chartListLeft: chartListLeft.join(),
        chartListRight: chartListRight.join(),
      }).then((res) => {
        if (res.success) {
          this.saveOK = true;
          setTimeout(() => {
            this.saveOK = false;
          }, 1000);
        }
      });
    },
    chartName(type) {
      switch (type) {
        case "Chart1":
          return "今日设备点检情况";
          break;
        case "Chart2":
          return "今日设备巡检情况";
          break;
        case "Chart3":
          return "本月巡检任务执行趋势(MTD)";
          break;
        case "Chart4":
          return "本月输送线巡检任务统计";
          break;
        case "Chart5":
          return "本月工单按时完成率";
          break;
        case "Chart6":
          return "本月设备故障维修率";
          break;
        case "Chart7":
          return "本月设备监测预警统计";
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.topMenu {
  width: 100%;
  .ghostClass {
    background-color: blue !important;
  }
  .chosenClass {
    background-color: #ffe283 !important;
    opacity: 1 !important;
  }
  .dragClass {
    background-color: rgb(179, 47, 255) !important;
    opacity: 1 !important;
    box-shadow: none !important;
    outline: none !important;
    background-image: none !important;
  }
  .head {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 9999;
  }
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 80px;
    padding: 5px;
    background: rgba(46, 24, 1, 1)
      url("../../../../assets/img/skin/blackgold/head_bg.png") no-repeat;
    background-size: 100% 105%;
    &::after {
      content: "";
      position: absolute;
      bottom: 0px;
      left: 0;
      width: 100%;
      height: 3px;
      opacity: 0.8;
      background: linear-gradient(
        to right,
        transparent,
        rgba(255, 212, 22, 0.8) 10%,
        transparent 12%
      );
      animation: lineShine 7s cubic-bezier(1, 1, 1, 1) infinite;
    }
    .logo {
      transform: scale(0.9);
      position: relative;
      top: 0.2rem;
      left: 0.3rem;
      width: 25%;
      // filter:
    }
    .rbox {
      // width: 1rem;
      display: flex;
      align-items: center;
      // margin-bottom: 0.1rem;
      .user {
        position: relative;
        margin-right: 20px;
        color: #bbb;
        font-size: 16px;
        &:hover {
          filter: brightness(2) hue-rotate(-10deg);
        }
        &::before {
          content: "";
          width: 20px;
          height: 20px;
          background: url("../../../../assets/img/skin/blackgold/setting_btn.png")
            no-repeat;
          background-size: cover;
          background-position-x: -300px;
          position: absolute;
          top: -3px;
          left: -28px;
        }
        span.unit {
          max-width: 120px;
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .logout {
          margin-left: 15px;
          cursor: pointer;
          &:hover {
            color: #ffe283;
          }
        }
      }
      .btn {
        margin: 10px;
        span {
          cursor: pointer;
          display: inline-block;
          background: url("../../../../assets/img/skin/blackgold/setting_btn.png")
            no-repeat;
          background-size: cover;
          width: 23px;
          height: 20px;
          margin: 0 20px;
          &:hover {
            filter: brightness(2) hue-rotate(-10deg);
          }
          &:nth-child(2) {
            background-position-x: -100px;
          }
          &:nth-child(1) {
            background-position-x: 0px;
          }
          &:nth-child(3) {
            background-position-x: -200px;
            &:hover {
              .lang {
                display: block;
              }
            }
          }
          &:nth-child(4) {
            // background-position-x: -3.6rem;
          }
        }
      }
      .lang {
        padding: 10px;
        display: none;
        position: absolute;
        top: 32px;
        right: 25px;
        .list {
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          background: rgba(0, 0, 0, 0.7);
          border: 1px solid #ad964f;
          border-radius: 4px;
          padding: 2px 10px;
          position: relative;
          &::before,
          &::after {
            content: "";
            width: 0;
            height: 0;
            position: absolute;
            border: 6px solid transparent;
            top: -0.2rem;
            right: 35%;
          }
          &::after {
            border-bottom-color: #333;
            border-bottom-width: 4px;
            top: -0.16rem;
          }
          &::before {
            border-bottom-color: #ad964f;
          }
          .item {
            margin: 0.1rem;
            color: rgba(255, 255, 255, 0.5);
            &:hover {
              color: rgba(255, 255, 255, 1);
            }
          }
        }
      }
    }
  }
  .list {
    padding: 0.2rem;
    padding-top: 0;
    .title {
      text-align: center;
      overflow: hidden;
      margin-bottom: 0.6rem;
      span {
        color: #ffebc6;
        background: #ad964f;
        font-size: 16px;
        padding: 0.2rem 0.4rem;
        display: inline-block;
        &.tip {
          background: none;
          padding: 0;
          margin-left: 0.2rem;
          font-size: 12px !important;
        }
      }
    }
    .item {
      margin: 0.4rem;
      font-size: 13px;
    }
    span.restBtn {
      text-align: center;
      padding: 0.08rem 0.2rem;
      background: rgba(0, 0, 0, 0.5);
      border: 1px solid #ad964f;
      color: #ffebc6;
      font-size: 13px;
      cursor: pointer;
      margin-left: 0.5rem;
    }
    .setting {
      display: flex;
      padding: 0.2rem;
      .title {
        font-size: 15px;
      }
      .left {
        width: 75%;
        max-height: 500px;
        overflow-y: auto;
        &::-webkit-scrollbar {
          width: 6px;
          background-color: #f5f5f5;
          border-radius: 20px;
        }
        &::-webkit-scrollbar-thumb {
          background-color: #ad964f;
          border-radius: 20px;
        }
        .sort {
          display: flex;
          justify-content: space-evenly;
          text-align: center;
          .leftsort,
          .rightsort {
            min-height: 2rem;
          }
          .item {
            cursor: move;
            padding: 0;
            margin: 0.2rem;
            border: 1px solid #ad964f;
            width: 160px;
            height: 100px;
            background-size: 100% 100% !important;
            span {
              display: block;
              background: rgba(0, 0, 0, 1);
              color: rgba(255, 255, 255, 1);
              font-size: 12px;
            }
            &.chart1 {
              background: #000
                url("../../../../assets/img/skin/blackgold/chart1.jpg")
                no-repeat;
            }
            &.chart2 {
              background: #000
                url("../../../../assets/img/skin/blackgold/chart2.jpg")
                no-repeat;
            }
            &.chart3 {
              background: #000
                url("../../../../assets/img/skin/blackgold/chart3.jpg")
                no-repeat;
            }
            &.chart4 {
              background: #000
                url("../../../../assets/img/skin/blackgold/chart4.jpg")
                no-repeat;
            }
            &.chart5 {
              background: #000
                url("../../../../assets/img/skin/blackgold/chart5.jpg")
                no-repeat;
            }
            &.chart6 {
              background: #000
                url("../../../../assets/img/skin/blackgold/chart6.jpg")
                no-repeat;
            }
            &.chart7 {
              background: #000
                url("../../../../assets/img/skin/blackgold/chart7.jpg")
                no-repeat;
            }
          }
        }
      }
      .right {
        border-left: 1px solid #ad964f;
        padding-left: 0.2rem;
        width: 25%;

        .ls {
          margin: 0.25rem 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
        }
      }
    }
  }
}
.list {
  padding: 0.2rem;
  padding-top: 0;
  .title {
    text-align: center;
    overflow: hidden;
    margin-bottom: 0.6rem;
    span {
      color: #ffebc6;
      background: #ad964f;
      font-size: 16px;
      padding: 0.2rem 0.4rem;
      display: inline-block;
      &.tip {
        background: none;
        padding: 0;
        margin-left: 0.2rem;
        font-size: 12px !important;
      }
    }
  }
  .item {
    margin: 0.4rem;
    font-size: 13px;
  }
  span.restBtn {
    text-align: center;
    padding: 0.08rem 0.2rem;
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid #ad964f;
    color: #ffebc6;
    font-size: 13px;
    cursor: pointer;
    margin-left: 0.5rem;
  }
  .setting {
    display: flex;
    padding: 0.2rem;
    .title {
      font-size: 15px;
    }
    .left {
      width: 75%;
      max-height: 500px;
      overflow-y: auto;
      &::-webkit-scrollbar {
        width: 6px;
        background-color: #f5f5f5;
        border-radius: 20px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #ad964f;
        border-radius: 20px;
      }
      .sort {
        display: flex;
        justify-content: space-evenly;
        text-align: center;
        .leftsort,
        .rightsort {
          min-height: 2rem;
        }
        .item {
          cursor: move;
          padding: 0;
          margin: 0.2rem;
          border: 1px solid #ad964f;
          width: 160px;
          height: 100px;
          background-size: 100% 100% !important;
          span {
            display: block;
            background: rgba(0, 0, 0, 1);
            color: rgba(255, 255, 255, 1);
            font-size: 12px;
          }
          &.chart1 {
            background: #000
              url("../../../../assets/img/skin/blackgold/chart1.jpg") no-repeat;
          }
          &.chart2 {
            background: #000
              url("../../../../assets/img/skin/blackgold/chart2.jpg") no-repeat;
          }
          &.chart3 {
            background: #000
              url("../../../../assets/img/skin/blackgold/chart3.jpg") no-repeat;
          }
          &.chart4 {
            background: #000
              url("../../../../assets/img/skin/blackgold/chart4.jpg") no-repeat;
          }
          &.chart5 {
            background: #000
              url("../../../../assets/img/skin/blackgold/chart5.jpg") no-repeat;
          }
          &.chart6 {
            background: #000
              url("../../../../assets/img/skin/blackgold/chart6.jpg") no-repeat;
          }
          &.chart7 {
            background: #000
              url("../../../../assets/img/skin/blackgold/chart7.jpg") no-repeat;
          }
        }
      }
    }
    .right {
      border-left: 1px solid #ad964f;
      padding-left: 0.2rem;
      width: 25%;

      .ls {
        margin: 0.25rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 13px;
      }
    }
  }
}
@keyframes lineShine {
  0% {
    transform: translate3d(-10%, 0, 0);
  }
  100% {
    transform: translate3d(100%, 0, 0);
  }
}
</style>
