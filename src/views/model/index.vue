<template>
  <div
    class="wrape"
    :style="{
      width: $store.state.screen.width + 'px',
      height: $store.state.screen.height + 'px',
    }"
  >
    <div :class="['loading-container', open ? 'open' : '']">
      <Loading v-if="loadingVisible">
        <div class="tips">
          <div>模型加载中...</div>
          <div>已加载{{ percent.toFixed(2) }}%</div>
        </div>
      </Loading>
      <div v-if="!loadingVisible" class="open" @click="sceneOpen">
        开启
      </div>
    </div>

    <t-renderer :size="size" ref="renderer">
      <t-camera></t-camera>
      <t-scene></t-scene>
      <t-controls></t-controls>
      <t-light></t-light>
      <!-- <t-raycaster></t-raycaster> -->
      <TTurebine @progress="progress"></TTurebine>
      <t-stats v-if="$store.state.navBar.on2"></t-stats>
      <slot></slot>
    </t-renderer>
  </div>
</template>
<script>
import * as THREE from "three";
import screenfull from "screenfull";
import TTurebine from "./TTurebine";
import { panelHandle, cameraViewerTransfrom } from "@/utils/action.js";
THREE.Object3D.DefaultUp = new THREE.Vector3(0, 0, 1);
THREE.Cache.enabled = true;
export default {
  data() {
    return {
      size: {
        w: this.$store.state.screen.sceneWidth, //window.innerWidth,
        h: this.$store.state.screen.sceneHeight, //window.innerHeight,
      },
      percent: 0,
      loadingVisible: true,
      open: false,
    };
  },
  props: {
    turbineMsg: Array,
  },
  components: {
    TTurebine,
  },

  mounted() {},
  methods: {
    progress(percent) {
      this.percent = percent;
      if (percent === 100) {
        this.loadingVisible = false;
      }
    },
    sceneOpen() {
      this.open = true;
      this.screenfull();
      setTimeout(() => {
        const { camera } = this.$refs.renderer.global;
        let tw1 = cameraViewerTransfrom(camera, { x: 0.2, y: -5, z: 1 });
        let tw2 = cameraViewerTransfrom(camera, { x: -0.2, y: -2, z: 0.2 });
        let tw3 = cameraViewerTransfrom(
          camera,
          { x: 3.6, y: -3.4, z: 3.2 },
          () => panelHandle(["leftMenu", "header", "rightMenu", "bottomMenu"])
        );
        tw1.chain(tw2);
        tw2.chain(tw3);
        tw1.start();
      }, 1000);
    },
    screenfull() {
      screenfull.toggle();
    },
  },
};
</script>
<style lang="scss" scoped>
.wrape {
  display: flex;
  align-items: center;
  justify-content: center;

  .loading-container {
    position: fixed;
    z-index: 99999;
    background-color: #000000;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    opacity: 1;
    transition: 1s all;
    &.open {
      opacity: 0;
      pointer-events: none;
    }
    .tips {
      margin-top: 10px;
      div {
        color: #fff;
        font-size: 14px;
        line-height: 20px;
        text-align: center;
      }
    }
    .open {
      font-size: 20px;
      color: #fff;
      padding: 10px 15px;
      border: 1px solid #fff;
      cursor: pointer;
    }
  }
}
</style>
