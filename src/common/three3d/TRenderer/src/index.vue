<template>
  <div class="renderer" :style="rendererStyle">
    <slot></slot>
    <div
      class="model-container"
      :style="{ top: -$store.state.screen.offset / 2 + 'px' }"
    >
      <div ref="container"></div>
    </div>
  </div>
</template>
<script>
import { WebGLRenderer, Clock } from "three";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer";
import TWEEN from "@tweenjs/tween.js";
import config from "@/config";
import Loading from "../../../../views/components/loading.vue";
export default {
  name: "TRenderer",
  components: {
    Loading,
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
    rendererStyle() {
      return {
        width: this.size.w + "px",
        height: this.size.h + "px",
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
.renderer {
  .model-container {
    position: relative;
  }
}
</style>
