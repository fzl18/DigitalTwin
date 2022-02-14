<template>
  <div id="home">
    <Container class="bg" ref="container" :style="homeStyle">
      <div class="wrape" :style="wrapeStyle">
        <Model ref="viewer" v-if="$store.state.index.curObjLevel == 4">
          <Msymbol :modelList="symbolList" @progress="progress" />
          <Css2D />
          <Css3D />
          <ModelPanel />
          <!-- <Effect /> -->
        </Model>
        <Layers ref="layer" />
      </div>
    </Container>
  </div>
</template>

<script>
import Container from "./components/container";
import Layers from "./layers";
import ModelPanel from "./layers/panel/modelPanel.vue";
import Model from "./model";
import Msymbol from "./model/symbol";
import Css2D from "./model/css2D";
import Css3D from "./model/css3D";
import Effect from "./model/effect";

export default {
  data() {
    return {
      symbolList: [],
    };
  },
  components: {
    Container,
    Layers,
    Model,
    Effect,
    Msymbol,
    Css2D,
    Css3D,
    ModelPanel,
  },
  computed: {
    wrapeStyle() {
      const { width, height } = this.$store.state.screen;
      return {
        width: width + "px",
        height: height + "px",
      };
    },
    homeStyle() {
      const {
        grayscale,
        brightness,
        contrast,
        saturate,
        opacity,
        sepia,
      } = this.$store.state.layer;
      return {
        background: this.$store.state.screen.backgroundColor,
        filter: `grayscale(${grayscale}%) brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) opacity(${opacity}%) sepia(${sepia}%)`,
      };
    },
  },
  watch: {
    "$store.state.model.curSelectModel"(mesh) {
      console.log(mesh);
    },
  },
  mounted() {
    this.getSymbolList();
    this.$store.state.model.loadingComplete = true;
  },
  methods: {
    getSymbolList(id) {
      this.symbolList = [
        {
          name: "processed",
          url: "model/1.gltf",
          draco: false,
          // onprogress: true,
          callback: (group) => {
            // group.position.z = -1;
            // group.position.x = 3;
            group.scale.set(0.001, 0.001, 0.001);
            group.visible = false;
          },
        },
        // {
        //   name: "tturebine",
        //   url: "model/untitled1_small.glb",
        //   draco: true,
        //   onprogress: true,
        //   callback: (group) => {
        //     group.position.set(0, -2, 0);
        //     // group.position.x = 3;
        //   },
        // },
        {
          name: "line",
          url: "model/line.gltf",
          draco: false,
          callback: (group) => {
            // group.position.y = -2;
            group.scale.set(0.005, 0.005, 0.005);
          },
        },
        {
          name: "equipment",
          url: "model/equipment.glb",
          draco: true,
          onprogress: true,
          callback: (group) => {
            group.position.z = 0;
            group.position.set(-6, -9, -6);
            // group.scale.set(0.0001, 0.0001, 0.0001);
          },
        },
      ];
    },
    progress(percent) {
      this.$refs.viewer.percent = percent;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/index.scss";
#home {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .bg {
    // transition: 1s all;
  }
  .wrape {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    .button {
      position: absolute;
      top: 50%;
      right: 350px;
      z-index: 10;
      color: #fff;
    }
  }
}
</style>
