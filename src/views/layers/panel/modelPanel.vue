<template>
  <div class="modelPanel" :style="calcStyle">
    <div class="button">
      <div class="" @click="handleScene">
        转场
      </div>
      <div class="" @click="handleLine">
        输送机
      </div>
      <div class="" @click="handleFactory">
        厂区
      </div>
      <div class="" @click="handleSkip">
        skip
      </div>
      <div class="" @click="handleLabel">
        广告牌
      </div>
      <div class="" @click="handleInside">
        地下
      </div>
      <div class="" @click="handleOnside">
        地上
      </div>
      <div class="" @click="handleGlobal">
        当前位置
      </div>
    </div>
  </div>
</template>

<script>
import config from "../../../config";
import { cameraViewerTransfrom } from "@/utils/action.js";
import * as THREE from "three";
export default {
  name: "modelPanel",
  inject: ["global"],
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
  },
  mounted() {},
  methods: {
    handleScene() {
      this.global.controls.autoRotate = !this.global.controls.autoRotate;
      console.log(this.global);
    },
    handleLine() {
      const { scene, camera, controls } = this.global;
      scene.getObjectByName("processed").visible = false;
      scene.getObjectByName("line").visible = true;
      this.$store.state.panel.leftMenu = false;
      this.$store.state.panel.rightMenu = false;
      let tw = cameraViewerTransfrom(camera, { x: -1, y: 1, z: -2.3 });
      controls.target = new THREE.Vector3(-1.05, -0.2, 0.07);
      tw.start();
    },
    handleSkip() {},
    handleFactory() {
      const { scene } = this.global;
      scene.getObjectByName("processed").visible = true;
      scene.getObjectByName("line").visible = false;
      this.$store.state.panel.leftMenu = true;
      this.$store.state.panel.rightMenu = true;
      this.handleOnside();
    },
    handleLabel() {
      this.$store.state.layer.css2DShow = !this.$store.state.layer.css2DShow;
      this.$store.state.layer.css3DShow = !this.$store.state.layer.css3DShow;
    },
    handleInside() {
      const { camera, controls } = this.global;
      let tw = cameraViewerTransfrom(camera, { x: -10.7, y: -5.7, z: -15.2 });
      controls.target = new THREE.Vector3(-2.4, -9.7, -9);
      tw.start();
    },
    handleOnside() {
      const { camera, controls } = this.global;
      let tw = cameraViewerTransfrom(camera, { x: -0.16, y: 6.93, z: 11.9 });
      controls.target = new THREE.Vector3(0.11, -0.55, 0.57);
      tw.start();
    },
    handleGlobal() {
      console.log(this.global);
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
  z-index: 10;
  pointer-events: none;
  & > div {
    position: absolute;
  }
  .button {
    top: 10px;
    right: 10px;
    color: var(--base-color);
    cursor: pointer;
    pointer-events: auto;
    > div {
      border: 1px solid #fff;
      padding: 5px 10px;
      margin: 5px;
    }
  }
}
</style>
