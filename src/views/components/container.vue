<template>
  <div id="full-screen-container" :ref="ref">
    <template v-if="ready">
      <slot></slot>
    </template>
  </div>
</template>

<script>
import autoResize from "../mixin/autoResize.js";
export default {
  name: "FullScreenContainer",
  mixins: [autoResize],
  data() {
    return {
      ref: "full-screen-container",
      allWidth: 0,
      scale: 0,
      datavRoot: "",
      ready: false,
    };
  },
  methods: {
    afterAutoResizeMixinInit() {
      const { initConfig, setAppScale } = this;

      initConfig();

      setAppScale();

      this.ready = true;
    },
    initConfig() {
      const { dom } = this;
      const { width, height } = screen;
      this.allWidth = width;

      // dom.style.width = `${width}px`;
      // dom.style.height = `${height}px`;
    },
    offset() {
      let calcHeight;
      if (this.checkFull()) {
        this.$store.state.screen.offset = 0;
      } else {
        calcHeight =
          (this.$store.state.screen.height * this.$store.state.index.scale -
            window.innerHeight) /
          this.$store.state.index.scale;
        if (calcHeight < 0) {
          this.$store.state.screen.offset = 0;
        } else {
          this.$store.state.screen.offset = calcHeight;
        }
      }
    },
    setAppScale() {
      const { allWidth, dom } = this;
      const currentWidth = document.body.clientWidth;
      dom.style.transform = `scale(${currentWidth /
        this.$store.state.screen.width})`; //1920
      this.$store.state.index.scale =
        currentWidth / this.$store.state.screen.width; //1920
    },
    onResize() {
      const { setAppScale, offset } = this;
      setAppScale();
      offset();
      // console.log(this.$store.state.index.isFullscreen);
    },
    checkFull() {
      let isFull =
        document.mozFullScreen ||
        document.fullScreen ||
        document.webkitIsFullScreen ||
        document.webkitRequestFullScreen ||
        document.mozRequestFullScreen ||
        document.msFullscreenEnabled;
      if (isFull === undefined) {
        isFull = false;
      }
      return isFull;
    },
  },
};
</script>

<style lang="scss" scoped>
#full-screen-container {
  position: fixed;
  top: 0px;
  left: 0px;
  overflow: hidden;
  transform-origin: left top;
  z-index: 999;
}
</style>
