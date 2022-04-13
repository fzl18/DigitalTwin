<template>
  <div class="panel">
    <div
      class="lineDetail"
      v-show="$store.state.model.currentSecne == 'lineDetail'"
    >
      <div class="table">
        <table border="0" cellpadding="0" cellspacing="0">
          <thead>
            <tr>
              <th colspan="2">
                {{ openLineInfo.coveryLineName }} 输送线信息
                <span
                  :class="['dot', openLineInfo.lineStatus == 0 ? '' : 'err']"
                ></span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>公司：{{ openLineInfo.companyName }}</td>
              <td>作业区：{{ openLineInfo.devWorkName }}</td>
            </tr>
            <tr>
              <td>厂区：{{ openLineInfo.unitName }}</td>
              <td>负责人：{{ openLineInfo.lineAdmin }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Box
        animateType="faderight"
        :isShow="$store.state.panel.currentType != null"
        :delay="0.2"
      >
        <div v-drag class="popbox base">
          <div class="body">
            <div v-if="openLineInfo.moduleList.length">
              <div class="tit">
                {{ openLineInfo.moduleList[curModule].moduleName }}
              </div>
              <div
                class="view"
                v-show="openLineInfo.moduleList[curModule].moduleType !== 'zs'"
              >
                <img
                  src="@/assets/img/pic2.jpg"
                  alt=""
                  v-show="openLineInfo.moduleList[curModule].moduleType == 'wd'"
                />
                <img
                  src="@/assets/img/pic1.jpg"
                  alt=""
                  v-show="
                    openLineInfo.moduleList[curModule].moduleType == 'belt'
                  "
                />
              </div>
              <div class="view" v-show="curType == 'zs'">
                <div class="videolist">
                  <div>
                    <video id="video" v-show="video1" controls autoplay></video>
                    <img
                      v-show="!video1"
                      src="@/assets/img/skin/blackgold/novideo.png"
                    />
                  </div>
                  <div>
                    <video
                      id="video2"
                      v-show="video2"
                      controls
                      autoplay
                    ></video>
                    <img
                      v-show="!video2"
                      src="@/assets/img/skin/blackgold/novideo.png"
                    />
                  </div>
                </div>
              </div>
              <div class="status">
                运行状态：{{
                  statusText(openLineInfo.moduleList[curModule].moduleStatus)
                }}
              </div>
              <div
                class="info"
                v-show="openLineInfo.moduleList[curModule].moduleType == 'zs'"
              >
                <div class="item">RFID编码：{{ moduleInfo.code }}</div>
                <div class="item">
                  撕裂点与RFID相对位置：
                  {{ moduleInfo.location }}{{ moduleInfo.itemUnit }}
                </div>
                <div class="item">
                  RFID位于输送线点位：
                  {{ moduleInfo.position }}
                </div>
                <div class="item">
                  撕裂点位于输送线点位：{{ moduleInfo.location
                  }}{{ moduleInfo.itemUnit }}
                </div>
              </div>
              <div
                class="info"
                v-show="openLineInfo.moduleList[curModule].moduleType == 'wd'"
              >
                <div
                  class="cw"
                  v-show="
                    openLineInfo.moduleList[curModule].deviceRegedInfoDtos[0]
                      .deviceModel == '温度数据采集器'
                  "
                >
                  <div v-for="(item, index) in temperatureList" :key="index">
                    <div class="val">{{ item.value }} <span>℃</span></div>
                    <!-- <div class="name">{{ index + 1 }}、{{ item.name }}</div> -->
                    <div class="name">{{ index + 1 }}、{{ keys[index] }}</div>
                    <div class="name">采集时间：{{ item.ts }}</div>
                  </div>
                </div>
                <div
                  class="item"
                  style="background: #49453e;padding:0.1rem;margin-top:0.2rem"
                >
                  温度报警历史记录：
                </div>
                <div
                  v-for="(item, index) in openLineInfo.moduleList[curModule]
                    .alarmHistoryThree"
                  :key="index"
                >
                  --{{ item.alarmTime }} {{ item.alarmDesc }} 温度{{
                    item.alarmValue
                  }}℃
                </div>
              </div>
              <div
                class="info"
                v-show="openLineInfo.moduleList[curModule].moduleType == 'belt'"
              >
                <div class="item">生产厂家：{{ moduleInfo.manufacturer }}</div>
                <div class="item">输送物料：{{ moduleInfo.materials }}</div>
                <div class="item">读卡器位置：</div>
                <div class="item">当前RFID： {{ moduleInfo.rfid }}</div>
                <div class="item">RFID位置：{{ moduleInfo.position }}</div>
                <div class="item">运行速度：{{ moduleInfo.speed }}</div>
                <div class="item">输送带故障历史记录：</div>
                <div
                  v-for="(item, index) in openLineInfo.moduleList[curModule]
                    .alarmHistoryThree"
                  :key="index"
                >
                  --{{ item.alarmTime }} {{ item.alarmDesc }}
                </div>
              </div>
            </div>
          </div>
          <div class="close" @click="handleClose">
            <i class="el-icon-close bindata-btn-close"></i>
          </div>
        </div>
      </Box>
    </div>
  </div>
</template>

<script>
import {
  getLineVisual,
  getVideoUrl,
  getLiveStream,
} from "../../api/monitorLine";
import { formatTime } from "../../../utils";
// import flvjs from "flv.js";
export default {
  name: "Panel",
  data() {
    return {
      openLineInfo: {
        moduleList: [],
      },
      curModule: 0,
      curType: "",
      videoList: [],
      keys: [],
      linesList: [],
      lineIndex: null,
      video1: null,
      video2: null,
    };
  },
  computed: {
    moduleInfo() {
      let moduleInfo = {};
      this.openLineInfo.moduleList[this.curModule].params.map((item) => {
        if (item.itemType) {
          moduleInfo[item.itemType] = item.itemValue;
          if (item.itemUnit) {
            moduleInfo.itemUnit = item.itemUnit;
          }
        } else {
          moduleInfo.code = item.epcNo;
          moduleInfo.speed = item.speed;
          moduleInfo.position = item.position;
        }
      });
      return moduleInfo;
    },
  },
  mounted() {},
  watch: {
    "$store.state.panel.currentLineId"(val) {
      this.getLineInfo(val);
    },
    "$store.state.panel.currentType"(val) {
      if (val) {
        this.openLineInfo.moduleList.map((item, index) => {
          if (item.moduleType == val) {
            this.curModule = index;
            this.handleClick(item, index);
          }
        });
      }
    },
  },
  methods: {
    handleClose() {
      this.$store.state.panel.currentType = null;
    },
    getLineInfo(id) {
      this.$store.state.model.loadingComplete = false;
      getLineVisual(id).then((res) => {
        if (res.success) {
          this.$store.state.model.loadingComplete = true;
          this.openLineInfo = res.data || {};
          this.videoList = [];
          this.temperatureList = [];
          this.$store.state.model.currentLineHasModelType = [];
          if (this.openLineInfo.lineStatus !== 0) {
            this.$parent.$parent.$children[1].global.mixers.get(
              "line"
            ).timeScale = 0;
          }
          this.openLineInfo.moduleList.forEach((data, index) => {
            this.$store.state.model.currentLineHasModelType.push(
              data.moduleType
            );
            this.$root.$children[0].$children[0].$refs.css3d.lineList.map(
              (item) => {
                if (data.moduleType == item.useType) {
                  item.params = data;
                }
              }
            );
            if (index == 0) {
              this.curType = data.moduleType;
            }
            // if (data.moduleType == "zs") {
            data.deviceInfo.forEach((v) => {
              if (v.videoUrl) {
                this.videoList.push(v.videoUrl);
              }
            });
            data.deviceRegedInfoDtos.forEach((val) => {
              if (
                val.iotParams &&
                data.moduleType == "wd" &&
                val.deviceModel == "温度数据采集器"
              ) {
                let keys = Object.keys(val.iotParams);
                this.keys = keys;
                if (keys.length) {
                  keys.map((v) => {
                    this.temperatureList.push({
                      value: val.iotParams[v][0].value,
                      ts: formatTime(val.iotParams[v][0].ts),
                      name: val.moduleName,
                    });
                  });
                  // console.log(this.temperatureList);
                }
              }
              // if (val.videoUrl) {
              //   this.videoList.push(val.videoUrl);
              // }
            });
            // }
          });
          this.loading = false;
        } else {
          this.$store.state.model.loadingComplete = true;
          window.alert(`Code:${res.errorCode}:${res.errorMsg}`);
          this.$store.state.panel.currentLineId = null;
          this.$root.$children[0].$children[0].$refs.modelPanel.handleBack();
        }
      });
    },
    handleClick(val, index) {
      // if (index == this.curModule) {
      //   return;
      // }
      this.curType = val.moduleType;
      this.curModule = index;
      if (val.moduleType == "zs") {
        if (val.deviceRegedInfoDtos.length) {
          val.deviceRegedInfoDtos.forEach((item, index) => {
            if (item.deviceModel == "可见光成像仪") {
              this.video1 = item.liveParams ? item.deviceCode : null;
            }
            if (item.deviceModel == "红外热成像仪") {
              this.video2 = item.liveParams ? item.deviceCode : null;
            }
          });
          if (this.video1) {
            this.videoPlay(this.video1);
          }
          if (this.video2) {
            this.videoPlay(this.video2, 1);
          }
        }
      }
    },
    statusText(status) {
      if (status == 0) {
        return "正常";
      }
      if (status == 1) {
        return "警告";
      }
      if (status == 2) {
        return "异常";
      }
    },
    // videoPlay(id, position) {
    //   if (flvjs.isSupported()) {
    //     getLiveStream(id).then((res) => {
    //       if (!res.data) {
    //         return;
    //       }
    //       if (!position) {
    //         let videoElement = document.getElementById("video");
    //         let flvPlayer = flvjs.createPlayer(
    //           {
    //             type: "flv",
    //             // isLive: true,
    //             url: `/live/${id}.flv`,
    //           }
    //           // {
    //           //   // enableWorker: true,
    //           //   enableStashBuffer: false,
    //           //   isLive: true,
    //           //   // lazyLoad: false,
    //           // }
    //         );

    //         flvPlayer.attachMediaElement(videoElement);
    //         flvPlayer.load();
    //         flvPlayer.play();
    //       }
    //       if (position) {
    //         let video2Element = document.getElementById("video2");
    //         let flvPlayer2 = flvjs.createPlayer(
    //           {
    //             type: "flv",
    //             // isLive: true,
    //             url: `/live/${id}.flv`,
    //             // hasAudio: false, // 关闭声音
    //             // cors: true, // 开启跨域访问
    //             // duration: 0,
    //             // currentTime: 0,
    //           }
    //           // {
    //           //   autoCleanupSourceBuffer: true, //对SourceBuffer进行自动清理
    //           //   autoCleanupMaxBackwardDuration: 12, //    当向后缓冲区持续时间超过此值（以秒为单位）时，请对SourceBuffer进行自动清理
    //           //   autoCleanupMinBackwardDuration: 8, //指示进行自动清除时为反向缓冲区保留的持续时间（以秒为单位）。
    //           //   enableStashBuffer: false, //关闭IO隐藏缓冲区
    //           //   isLive: true,
    //           //   lazyLoad: false,
    //           // }
    //         );
    //         flvPlayer2.attachMediaElement(video2Element);
    //         flvPlayer2.load();
    //         flvPlayer2.play();
    //       }
    //     });
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped>
:root {
  --base-color: #fff;
}
.panel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .lineDetail {
    color: var(--base-color);
    .table {
      font-size: 15px;
      position: absolute;
      bottom: 20px;
      right: 15%;
      border: 1px solid rgb(90, 62, 0);
      border-right: none;
      border-bottom: none;
      table {
        background: rgba(82, 53, 33, 0.445);
        th {
          background: rgba(141, 96, 64, 0.322);
        }
        td,
        th {
          border-bottom: 1px solid rgb(90, 62, 0);
          border-right: 1px solid rgb(90, 62, 0);
          padding: 15px;
          width: 230px;
          color: rgb(211, 172, 65);
        }
        span.dot {
          display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin-left: 10px;
          background: rgb(7, 196, 0);
          &.err {
            background: rgb(196, 72, 0);
          }
        }
      }
    }
    .popbox {
      background: url("../../../assets/img/skin/blackgold/popbox.png") no-repeat;
      background-size: 100% 100%;
      padding: 40px 30px;
      position: absolute;
      top: 200px;
      left: 6%;
      height: 700px;
      width: 400px;
      // border: 1px solid rgb(11, 184, 184);
      // background: rgba(11, 184, 184, 0.486);
      font-size: 15px;
      pointer-events: auto;
      .close {
        position: absolute;
        right: 0;
        top: 0;
        font-size: 24px;
        cursor: pointer;
      }
      .body {
        overflow-x: hidden;
        overflow-y: auto;
        height: 100%;
        &::-webkit-scrollbar {
          width: 3px;
        }
        &:hover {
          &::-webkit-scrollbar {
            width: 3px;
            background-color: rgba(39, 33, 5, 0.3);
            border-radius: 20px;
          }
          &::-webkit-scrollbar-thumb {
            background-color: rgba(194, 168, 55, 0.1);
            border-radius: 20px;
          }
        }
      }

      &.base {
        position: relative;
        &::before {
          content: "";
          position: absolute;
          height: 30px;
          width: 100%;
          top: 0;
          left: 0;
          cursor: move;
        }
        .tit {
          background: url("../../../assets/img/textbg.png") center 50% no-repeat;
          background-size: 100%;
          width: 100%;
          text-align: center;
          font-size: 16px;
          height: 32px;
          line-height: 32px;
        }
        video {
          margin-bottom: 0.05rem;
        }
        .view {
          img {
            width: 100%;
            display: block;
            margin-bottom: 0.05rem;
            // border: 1px solid #fce6c8;
          }
          .videolist {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            div {
              background: #000;
              min-height: 200px;
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
              &:nth-child(1) {
                margin-bottom: 10px;
              }
              video {
                width: 100%;
              }
              img {
                width: 200px;
              }
            }
          }
        }
        .status {
          height: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: url("../../../assets/img/titbg.png") center center
            no-repeat;
          background-size: 100%;
          margin-bottom: 0.1rem;
          // width: 80%;
        }
        .info {
          width: 100%;
          min-height: 1.5rem;
          div {
            padding: 6px;
            margin: 6px 0;
            // transform: scale(0.9);
            &.item:nth-child(odd) {
              background: #49453e;
            }
          }
          .cw {
            display: grid;
            grid-row-gap: 1px;
            grid-column-gap: 1px;
            grid-template-columns: repeat(2, 1fr);
            background: #75560f;
            border: 1px solid #75560f;
            padding: 0;
            > div {
              background: #3d3631;
              padding: 0.05rem 0.01rem;
            }
            .val {
              font-size: 20px;
              font-style: italic;
              font-weight: bold;
              max-width: 120px;
              span {
                font-size: 12px;
              }
            }
            .name {
              color: #8d704a;
            }
          }
        }
      }
    }
  }
}
</style>
