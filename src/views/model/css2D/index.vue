<template>
  <div class="css2d">
    <div
      :class="[
        'factory',
        'factoryText',
        $store.state.model.currentSecne == 'factory' ? 'show' : 'hide',
      ]"
      v-for="(item, index) in factoryList"
      :key="item.label + '_' + index"
      :ref="`css2DFactory${index}`"
    >
      <div class="title">
        <div class="text">{{ item.label }}</div>
      </div>
    </div>

    <div
      :class="[
        'label',
        $store.state.layer.css2DShow &&
        $store.state.model.currentSecne == 'line'
          ? 'show'
          : 'hide',
        'line',
      ]"
      v-for="(item, index) in lineList"
      :key="item.target + '_' + index"
      :style="item.style"
      :ref="`css2DLine${index}`"
    >
      <div class="title" @mouseover="curItem = index" @mouseleave="handleLeave">
        <div class="index">{{ item.target }}</div>
        <div class="text">{{ item.params.lineName }}</div>

        <Box
          animateType="toggle"
          :isShow="curItem == index"
          :delay="0.1"
          class="box"
        >
          <div class="body">
            <div>{{ item.params.lineName }}</div>
            <div>
              {{ item.params.lineLength + "米" }}
              {{
                item.params.lineStatus == "ERROR"
                  ? "异常"
                  : item.params.lineStatus == "WARN"
                  ? "警告"
                  : "运行正常"
              }}
            </div>
            <div>运行时间：{{ Math.floor(item.params.lineTime / 60) }} h</div>
            <div>运行距离：{{ Math.floor(item.params.lineMileage) }} km</div>
            <div class="lineDetail" @click="handleLine(item)">详情</div>
            <i class="el-icon-close btn-close" @click="handleLeave"></i>
          </div>
        </Box>
      </div>
    </div>
  </div>
</template>
<script>
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer";
import { cameraViewerTransfrom, panelHandle } from "@/utils/action.js";
import * as THREE from "three";
export default {
  name: "Css2D",
  inject: ["global"],
  props: {},
  data() {
    return {
      lineList: [
        {
          target: "#1",
          params: {},
          style: {},
          position: [-5, -6.5, 4.6],
        },
        {
          target: "#2",
          params: {},
          style: {},
          position: [-5, -7, 2.5],
        },
        {
          target: "#3",
          params: {},
          style: {},
          position: [-1.8, -7, 4.3],
        },
        {
          target: "#4",
          params: {},
          style: {},
          position: [-1, -7, 3],
        },
        {
          target: "#5",
          params: {},
          style: {},
          position: [4, -6.6, 0],
        },
        {
          target: "#6",
          params: {},
          style: {},
          position: [3, -7, 5.38],
        },
        {
          target: "#7",
          params: {},
          style: {},
          position: [2.2, -7, 4.7],
        },
        {
          target: "#8",
          params: {},
          style: {},
          position: [1, -7, 4],
        },
      ],
      factoryList: [
        {
          label: "办公区",
          position: [-2.6, 1.5, 0.8],
        },
        {
          label: "主煤仓",
          position: [3, 0.5, 0.7],
        },
        {
          label: "2号煤仓",
          position: [-2.6, 1, 2.6],
        },
        {
          label: "厂内生活区",
          position: [0, 1, 6],
        },
        {
          label: "输送线",
          position: [0, 1, -2.8],
        },
        {
          label: "厂内生产区",
          position: [1, 1, 3],
        },
      ],
      curItem: null,
    };
  },
  computed: {
    isShow() {
      console.log(
        this.lineList,
        this.$store.state.model.currentSecne == "line"
      );
      return this.$store.state.model.currentSecne == "line" ? "show" : "hide";
    },
  },
  mounted() {
    this.initCss2D();
  },
  watch: {},
  methods: {
    initCss2D() {
      const css2dContainer = document.createElement("div");
      const objectCss2dContainer = new CSS2DObject(css2dContainer);
      objectCss2dContainer.position.set(0, 0, 0);
      this.global.scene.add(objectCss2dContainer);
      this.lineList.forEach((item, index) => {
        let obj = new CSS2DObject(this.$refs["css2DLine" + index][0]);
        obj.position.set(item.position[0], item.position[1], item.position[2]);
        objectCss2dContainer.add(obj);
      });
      this.factoryList.forEach((item, index) => {
        let obj = new CSS2DObject(this.$refs["css2DFactory" + index][0]);
        obj.position.set(item.position[0], item.position[1], item.position[2]);
        objectCss2dContainer.add(obj);
      });
    },
    handleLine(item) {
      this.$store.state.panel.currentLineId = item.params.lineId;
      const { scene, camera, controls, gridHelper } = this.global;
      scene.getObjectByName("processed").visible = false;
      scene.getObjectByName("line").visible = true;
      // this.$store.state.panel.leftMenu = false;
      // this.$store.state.panel.rightMenu = false;
      // this.$store.state.panel.bodyFootMenu = false;
      this.$store.state.model.currentSecne = "lineDetail";
      this.$store.state.model.currentCameraPosition = camera.position.clone();
      this.$store.state.model.currentControlsTarget = controls.target.clone();
      gridHelper.visible = true;
      gridHelper.position.set(-0.05, -0.42, -0.5);
      gridHelper.scale.set(2, 2, 2);
      let tw = cameraViewerTransfrom(camera, {
        x: -2.7050315285124524,
        y: 0.44767830782712337,
        z: 1.9513428456067066,
      });
      controls.target = new THREE.Vector3(
        -1.2344807147947514,
        0.020625421366042087,
        -0.21994850666260773
      );
      panelHandle(
        ["leftMenu", "rightMenu", "bottomMenu", "bodyFootMenu"],
        false
      );
      tw.start();
      setTimeout(() => {
        controls.autoRotate = true;
      }, 6000);
    },
    handleLeave() {
      this.curItem = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.label,
.factory {
  color: #fff;
  font-size: 14px;
  position: relative;
  filter: hue-rotate(180deg);
  &.show {
    display: block;
  }
  &.hide {
    display: none;
  }
  &.line,
  &.factoryText {
    position: relative;
    &::before {
      // content: "";
      // display: block;
      // position: absolute;
      // left: 5px;
      // top: 0px;
      // height: 120px;
      // width: 1px;
      // background: #daba0a;
    }
    &::after {
      position: absolute;
      content: "";
      display: block;
      left: 45%;
      bottom: -20px;
      height: 0;
      width: 0;
      border: 10px solid transparent;
      border-top: 10px solid #daba0a;
    }
    .title {
      border: 1px solid #daba0a;
      box-shadow: 0 0 10px #daba0a;
      background: rgba($color: #584b01, $alpha: 0.8);
      border-radius: 6px;
      width: 150px;
      text-align: center;
      cursor: pointer;
      position: relative;
      .index {
        background: rgba($color: #c7aa04, $alpha: 1);
        color: #705c01;
        border-radius: 6px 6px 0 0;
        z-index: 99;
        position: relative;
      }
      .text {
        padding: 6px 8px;
        font-size: 15px;
      }
      .box {
        z-index: 98;
      }
    }
    .body {
      position: absolute;
      left: -35%;
      bottom: 28px;
      border: 2px solid #daba0a;
      border-radius: 6px;
      padding: 10px;
      width: 260px;
      height: 180px;
      background: #4d4101f3;
      font-size: 16px;
      text-align: left;
      > div {
        margin: 15px 0;
        &.lineDetail {
          position: absolute;
          right: 0;
          top: 35px;
          width: 26px;
          padding: 20px 6px;
          background: #796700f6;
          cursor: pointer;
          line-height: 18px;
          border-radius: 8px 0 0 8px;
        }
      }
      .btn-close {
        position: absolute;
        right: 3px;
        top: 3px;
        cursor: pointer;
      }
      &.show {
        display: block;
      }
      &.hide {
        display: none;
      }
    }
  }
}
.factory {
  filter: hue-rotate(150deg); // 地面广告牌
  &.factoryText {
    .title {
      cursor: auto;
      width: 100px;
      border-radius: 0;
    }
  }
}
</style>
