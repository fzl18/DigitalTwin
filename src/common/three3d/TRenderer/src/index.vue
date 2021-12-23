<template>
  <div>
    <slot></slot>
    <div
      class="model-container"
      :style="{ top: -$store.state.screen.offset / 2 + 'px' }"
    >
      <div
        :class="['mask', $store.state.layer.alarm ? 'animation' : '']"
        v-show="$store.state.screen.maskEnable"
        :style="maskStyle"
      ></div>
      <div ref="container"></div>
    </div>
  </div>
</template>
<script>
import { WebGLRenderer, Clock } from "three";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer";
import TWEEN from "@tweenjs/tween.js";
import config from "@/config";
export default {
  name: "TRenderer",
  props: {
    size: {
      type: Object,
      default: () => {
        return {
          w: 640,
          h: 400,
        };
      },
      validator: function(size) {
        return size.w && size.h ? true : false;
      },
    },
  },
  provide() {
    return {
      global: this.global,
    };
  },
  data() {
    let renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.shadowMap.enabled = true;
    renderer.setSize(this.size.w, this.size.h);
    return {
      renderer,
      global: {
        renderer,
        rendererSize: this.size,
        rendererDom: renderer.domElement,
        scene: null,
        camera: null,
        mixers: new Map(),
        compose: null,
        CSSRender: new CSS2DRenderer(),
        config,
      },
      clock: new Clock(),
    };
  },
  computed: {
    maskStyle() {
      let { alarm, warnbgColor, errorbgColor } = this.$store.state.layer;
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
      };
    },
  },
  methods: {
    render() {
      const {
        scene,
        camera,
        stats,
        compose,
        CSSRender,
        controls,
      } = this.global;
      if (scene && camera) {
        this.renderer.render(scene, camera);
        CSSRender.render(scene, camera);
      }
      stats && stats.update();
      var delta = new Clock().getDelta();

      // console.log(compose);
      compose && compose.render(delta);
      requestAnimationFrame(this.render);
      const mixerUpdateDelta = this.clock.getDelta();
      this.global.mixers.forEach((mixer) => {
        mixer.update(mixerUpdateDelta);
      });
      controls.update();
      TWEEN.update();
    },
  },
  mounted() {
    const { size } = this;
    const { CSSRender } = this.global;
    CSSRender.setSize(size.w, size.h);
    CSSRender.domElement.style.position = "absolute";
    // CSSRender.domElement.style.top = 0;
    this.$refs.container.appendChild(CSSRender.domElement);
    this.$refs.container.appendChild(this.renderer.domElement);
    this.render();
  },
};
</script>
<style lang="scss" scoped>
.model-container {
  position: relative;
  .mask {
    // filter: brightness(2) blur(0px) hue-rotate(130deg) grayscale(1);
    position: absolute;
    opacity: 1;
    width: 100%;
    height: 100%;
    z-index: 999;
    pointer-events: none;
    background-repeat: no-repeat;
    background-size: 160% 140%;
    background-position: center;
    &.animation {
      animation: flash 600ms infinite;
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
