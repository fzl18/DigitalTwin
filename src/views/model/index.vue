<template>
  <t-renderer :size="size" ref="renderer">
    <div
      class="loading-container"
      :style="loadStyle"
      v-if="!$store.state.model.loadingComplete"
    >
      <Loading>
        <div class="tips">
          <div>模型加载中...</div>
          <div>已加载{{ percent.toFixed(2) }}%</div>
        </div>
      </Loading>
    </div>
    <div
      :class="['mask', $store.state.layer.alarm ? 'animation' : '']"
      v-show="$store.state.screen.maskEnable && isMask"
      :style="maskStyle"
    ></div>
    <t-camera></t-camera>
    <t-scene></t-scene>
    <t-controls></t-controls>
    <t-light></t-light>
    <!-- <t-raycaster></t-raycaster> -->
    <t-stats v-if="$store.state.navBar.on2"></t-stats>
    <slot></slot>
  </t-renderer>
</template>
<script>
import * as THREE from "three";
import screenfull from "screenfull";
import {
  panelHandle,
  cameraViewerTransfrom,
  twAnimation,
} from "@/utils/action.js";
import config from "@/config";
// THREE.Object3D.DefaultUp = new THREE.Vector3(0, 1, 0);
export default {
  data() {
    return {
      percent: 0,
    };
  },
  props: {
    size: {
      type: Object,
      default: () => {
        return {
          w: config.screen.sceneWidth,
          h: config.screen.sceneHeight,
        };
      },
    },
    isMask: {
      type: Boolean,
      default: true,
    },
    autoRotate: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    loadStyle() {
      return {
        width: this.size.w + "px",
        height: this.size.h + "px",
        // marginTop: this.$store.state.layer.headerHeight + "px",
      };
    },
    maskStyle() {
      let {
        alarm,
        warnbgColor,
        errorbgColor,
        headerHeight,
      } = this.$store.state.layer;
      let color;
      switch (alarm) {
        case "warn":
          color = warnbgColor;
          break;
        case "error":
          color = errorbgColor;
          break;
        default:
          color = this.$store.state.screen.maskColor;
          break;
      }
      return {
        backgroundImage: `radial-gradient(transparent 40%,${color})`,
        width: this.size.w + "px",
        height: this.size.h + "px",
        // top: headerHeight + "px",
      };
    },
  },
  mounted() {
    THREE.Cache.enabled = this.$store.state.model.modelCache;
    this.sceneOpen();
  },
  methods: {
    sceneOpen() {
      this.open = true;
      // this.screenfull();
      setTimeout(() => {
        panelHandle(["leftMenu", "header", "rightMenu", "bottomMenu"]);
      }, 3800);
      setTimeout(() => {
        const { camera, controls, scene } = this.$refs.renderer.global;
        let tw1 = cameraViewerTransfrom(camera, { x: 0.2, y: 1, z: 1 });
        let tw2 = cameraViewerTransfrom(camera, { x: -0.2, y: 1, z: 2 });
        let tw3 = cameraViewerTransfrom(
          camera,
          { x: 3.6, y: 1, z: 3.2 },
          () => {
            setTimeout(() => (controls.autoRotate = this.autoRotate), 2000);
          }
        );
        console.log(scene);
        let floor = scene.getObjectByName("processed").getObjectByName("地面")
          .position;
        let tw4 = twAnimation(
          floor,
          { x: 0, y: 10000, z: 0 },
          5500,
          (data) => {
            floor.set(data.x, data.y, data.z);
          },
          () => {
            this.$store.state.layer.css2DShow = true;
            this.$store.state.layer.css3DShow = true;
          },
          false
        );
        tw1.chain(tw2);
        tw2.chain(tw3);
        tw3.chain(tw4);
        tw1.start();
      }, 6200);
    },
    screenfull() {
      screenfull.toggle();
    },
    clearScene() {
      //todo
      console.log("clearScene");
    },
  },
};
</script>
<style lang="scss" scoped>
.mask {
  // filter: brightness(2) blur(0px) hue-rotate(130deg) grayscale(1);
  position: absolute;
  opacity: 1;
  z-index: 999;
  pointer-events: none;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  &.animation {
    animation: flash 600ms infinite;
  }
}
.loading-container {
  position: fixed;
  z-index: 99999;
  background-color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  opacity: 1;
  // transition: 1s all;
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
}

@keyframes flash {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
}
</style>
