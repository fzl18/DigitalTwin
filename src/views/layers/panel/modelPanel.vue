<template>
  <div class="modelPanel" :style="calcStyle">
    <div class="button" v-if="!$store.state.panel.modelPlanVisible">
      <div class="" @click="handleSkip">
        跳过
      </div>
    </div>
    <div class="button" v-if="$store.state.panel.modelPlanVisible">
      <div class="" @click="handleScene">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-Dxuanzhuan"></use>
        </svg>
      </div>
      <!-- <div
        class=""
        @click="handleFactory"
        v-show="currentSecne == 'lineDetail'"
      >
        厂区
      </div> -->
      <!-- <div class="" @click="handleSkip">
        skip
      </div> -->
      <!-- <div class="" @click="handleLabel">
        广告牌
      </div> -->
      <!-- <div class="" @click="handleGlobal">
        当前位置
      </div> -->
      <div
        class=""
        @click="currentSecne == 'factory' ? handleInside() : handleOnside()"
        v-show="currentSecne != 'lineDetail'"
      >
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-dishangdixia"></use>
        </svg>
      </div>

      <div
        class=""
        v-show="currentSecne != 'lineDetail'"
        @click="
          panelHandle(
            ['leftMenu', 'rightMenu', 'bottomMenu', 'bodyFootMenu'],
            isClear
          );
          isClear = !isClear;
        "
      >
        <!-- {{ !isClear ? "清屏" : "恢复" }} -->
        <svg
          class="icon"
          aria-hidden="true"
          style="filter:brightness(2);width:43px;height:43px"
        >
          <use :xlink:href="!isClear ? '#icon-chaizu' : '#icon-hebing'"></use>
        </svg>
      </div>
      <div class="" @click="handleHelp">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-qm"></use>
        </svg>
      </div>
      <div class="" @click="handleBack" v-show="currentSecne == 'lineDetail'">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-ai207"></use>
        </svg>
      </div>
    </div>
    <Popup :visible.sync="visible">
      <div class="help">
        <div class="title"><span>操作说明</span></div>
        <div class="box">
          <div class="item">
            <p>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-mouseL"></use>
              </svg>
            </p>
            <p>
              1.按住鼠标左键并拖动，可以改变镜头360度视角
            </p>
          </div>
          <div class="item">
            <p>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-mouseR"></use>
              </svg>
            </p>
            <p>
              2.按住鼠标右键并拖动，可以移动镜头平面位置
            </p>
          </div>
          <div class="item">
            <p>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shubiao"></use>
              </svg>
            </p>
            <p>
              3.滚动鼠标滚轮，可以移动镜头前后位置
            </p>
          </div>
        </div>
        <div class="box">
          <div class="item">
            <p>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-Dxuanzhuan"></use>
              </svg>
            </p>
            <p>
              4.点击 旋转 / 停止 场景
            </p>
          </div>
          <div class="item">
            <p>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-dishangdixia"></use>
              </svg>
            </p>
            <p>
              5.点击 地面 / 地底 切换
            </p>
          </div>
          <div class="item">
            <p>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-hebing"></use>
              </svg>
            </p>
            <p>
              6.点击 显示 / 隐藏 图表
            </p>
          </div>
        </div>
      </div>
    </Popup>
  </div>
</template>

<script>
import config from "../../../config";
import "@/assets/font/iconfont.js";
import {
  cameraViewerTransfrom,
  panelHandle,
  stopTwAnimation,
} from "@/utils/action.js";
import Popup from "@/views/components/popup";
import * as THREE from "three";
export default {
  name: "modelPanel",
  inject: ["global"],
  components: { Popup },
  data() {
    return {
      isClear: false,
      visible: false,
    };
  },
  computed: {
    calcStyle() {
      let { leftSideWidth, rightSideWidth } = this.$store.state.layer;
      let css = {
        width: `calc(100% - ${leftSideWidth}px - ${rightSideWidth}px)`,
        left: `${leftSideWidth}px`,
        top: `${config.layer.headerHeight}px`,
      };
      return css;
    },
    currentSecne() {
      return this.$store.state.model.currentSecne;
    },
  },
  mounted() {},
  methods: {
    panelHandle,
    handleScene() {
      this.global.controls.autoRotate = !this.global.controls.autoRotate;
    },
    handleLine() {
      const { scene, camera, controls } = this.global;
      scene.getObjectByName("processed").visible = false;
      scene.getObjectByName("line").visible = true;
      this.$store.state.panel.leftMenu = false;
      this.$store.state.panel.rightMenu = false;
      this.$store.state.panel.bodyFootMenu = false;
      this.$store.state.model.currentSecne = "lineDetail";
      let tw = cameraViewerTransfrom(camera, { x: -1, y: 1, z: -2.3 });
      controls.target = new THREE.Vector3(-1.05, -0.2, 0.07);
      controls.autoRotate = true;
      this.isClear = true;
      tw.start();
    },
    handleSkip() {
      stopTwAnimation();
      this.$store.state.panel.modelPlanVisible = true;
      this.handleOnside();
      this.$store.state.layer.css2DShow = true;
      this.$store.state.layer.css3DShow = true;
    },
    handleFactory() {
      const { scene } = this.global;
      scene.getObjectByName("processed").visible = true;
      scene.getObjectByName("line").visible = false;
      this.$store.state.panel.leftMenu = true;
      this.$store.state.panel.rightMenu = true;
      this.$store.state.panel.bodyFootMenu = true;
      this.$store.state.model.currentSecne = "factory";
      this.handleOnside();
    },
    handleLabel() {
      this.$store.state.layer.css2DShow = !this.$store.state.layer.css2DShow;
      this.$store.state.layer.css3DShow = !this.$store.state.layer.css3DShow;
    },
    handleInside() {
      const { camera, controls } = this.global;
      let tw = cameraViewerTransfrom(camera, {
        x: -9.778667880537848,
        y: -2.6601371808088876,
        z: 7.135560761137669,
      });
      controls.target = new THREE.Vector3(
        -0.3223811037974757,
        -8.060033401199544,
        2.8842667443417174
      );
      controls.autoRotate = false;
      this.$store.state.model.currentSecne = "line";
      tw.start();
    },
    handleOnside() {
      const { camera, controls } = this.global;
      let tw = cameraViewerTransfrom(camera, {
        x: -9.712295300060564,
        y: 10.485287014824836,
        z: -13.596775494380106,
      });
      controls.target = new THREE.Vector3(0.11, -0.55, 0.57);
      controls.autoRotate = true;
      this.$store.state.model.currentSecne = "factory";
      tw.start();
    },
    handleGlobal() {
      console.log(this.global);
    },
    handleHelp() {
      this.visible = true;
    },
    handleBack() {
      const { scene, camera, controls, gridHelper } = this.global;
      scene.getObjectByName("processed").visible = true;
      scene.getObjectByName("line").visible = false;
      this.$store.state.panel.leftMenu = true;
      this.$store.state.panel.rightMenu = true;
      this.$store.state.panel.bodyFootMenu = true;
      this.$store.state.model.currentSecne = "line";
      this.$store.state.panel.currentType = null;
      controls.autoRotate = false;
      gridHelper.visible = false;
      let tw = cameraViewerTransfrom(
        camera,
        this.$store.state.model.currentCameraPosition
      );
      controls.target = this.$store.state.model.currentControlsTarget;
      tw.start();
    },
  },
};
</script>

<style lang="scss" scoped>
:root {
  --base-color: #999;
}
.modelPanel {
  position: absolute;
  height: 100%;
  z-index: 999;
  pointer-events: none;
  & > div {
    position: absolute;
  }
  .button {
    transform: scale(0.8);
    top: 0px;
    right: 0px;
    color: var(--base-color);
    cursor: pointer;
    pointer-events: auto;
    > div {
      border: 3px solid #b18c1c;
      border-radius: 50%;
      height: 70px;
      width: 70px;
      line-height: 70px;
      text-align: center;
      font-size: 16px;
      margin: 10px;
      box-shadow: 0 0 15px #ad964f inset;
      background: rgba(255, 222, 130, 0.103);
      opacity: 0.7;
      .icon {
        width: 50px;
        height: 50px;
        vertical-align: -15px;
        fill: currentColor;
        overflow: hidden;
        pointer-events: none;
      }

      &:hover {
        opacity: 1;
      }
      &.disable {
        filter: grayscale(1);
      }
    }
  }
}
.help {
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

  .box {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 20px;
    .item {
      font-size: 16px;
      line-height: 26px;
      margin: 15px;
      width: 180px;
      p {
        text-align: center;
        margin: 15px 0;
      }
      .icon {
        width: 100px;
        height: 100px;
        vertical-align: -15px;
        fill: currentColor;
        overflow: hidden;
        pointer-events: none;
        filter: brightness(5);
      }
    }
  }
}
</style>
