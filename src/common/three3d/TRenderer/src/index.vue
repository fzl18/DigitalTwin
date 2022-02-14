<template>
  <div class="renderer" :style="rendererStyle">
    <slot></slot>
    <div
      class="model-container"
      ref="container"
      @mousemove="handleMouseMove"
      @click="handleClick"
    >
      <!-- <div ref="container" class=""></div> -->
    </div>
  </div>
</template>
<script>
import { WebGLRenderer, Clock } from "three";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
import TWEEN from "@tweenjs/tween.js";
import config from "@/config";
import Loading from "../../../../views/components/loading.vue";
import { modelClick } from "@/utils/action";

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
    // renderer.shadowMap.enabled = true;
    renderer.setSize(this.size.w, this.size.h);
    return {
      renderer,
      global: {
        renderer,
        // css2d: {},
        // css3d: {},
        rendererSize: this.size,
        rendererDom: renderer.domElement,
        scene: null,
        camera: null,
        mixers: new Map(),
        compose: null,
        CSSRender: new CSS2DRenderer(),
        CSS3DRender: new CSS3DRenderer(),
        config,
      },
      clock: new Clock(),
    };
  },
  computed: {
    container() {
      return {
        // top:-this.$store.state.screen.offset / 2 + 'px'
        // top: this.$store.state.layer.headerHeight + "px",
      };
    },
    rendererStyle() {
      return {
        width: this.size.w + "px",
        height: this.size.h + "px",
        marginTop: this.$store.state.layer.headerHeight + "px",
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
        CSS3DRender,
        controls,
      } = this.global;
      if (scene && camera) {
        this.renderer.render(scene, camera);
        CSSRender.render(scene, camera);
        CSS3DRender.render(scene, camera);
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

    handleMouseMove(event) {
      // const selectObj = modelClick(
      //   event,
      //   this.global.scene,
      //   this.global,
      //   this.renderer.domElement
      // );
    },

    handleClick(event) {
      return;
      const selectObj = modelClick(
        event,
        this.global.scene,
        this.global,
        this.renderer.domElement
      );
      if (selectObj) {
        this.$store.state.model.curSelectModel = selectObj;
      }
    },
  },
  mounted() {
    const { size, renderer } = this;
    const { CSSRender, CSS3DRender, scene, camera } = this.global;
    CSSRender.setSize(size.w, size.h);
    CSSRender.domElement.style.position = "absolute";
    CSS3DRender.setSize(size.w, size.h);
    CSS3DRender.domElement.style.position = "absolute";
    CSS3DRender.domElement.style.pointerEvents = "none";
    // CSS3DRender.domElement.style.top = 0;
    this.$refs.container.appendChild(CSSRender.domElement);
    this.$refs.container.appendChild(CSS3DRender.domElement);
    this.$refs.container.appendChild(this.renderer.domElement);
    this.render();
  },
};
</script>
<style lang="scss" scoped>
.renderer {
  transition: none;
  .model-container {
    position: relative;
    display: flex;
    justify-content: center;
    height: 100%;
  }
}
</style>
