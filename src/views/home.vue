<template>
  <div id="home">
    <Container class="bg" ref="container" :style="homeStyle">
      <div class="wrape" :style="wrapeStyle">
        <VideoPlayer v-if="$store.state.index.curObjLevel == 4" />
        <Layers ref="layer" />
      </div>
    </Container>
  </div>
</template>

<script>
import Container from "./components/container";
import Layers from "./layers";
import VideoPlayer from "@/common/videoPlayer";
import { coordinate } from "./api/monitorLine";
import { panelHandle } from "@/utils/action.js";
export default {
  data() {
    return {
      symbolList: [],
    };
  },
  components: {
    Container,
    Layers,
    VideoPlayer,
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
        // background: this.$store.state.screen.backgroundColor,
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
    // this.getSymbolList();
    this.showMenu();
  },
  methods: {
    getSymbolList(id) {
      this.symbolList = [
        {
          name: "processed",
          url: "model/21.gltf",
          draco: true,
          onprogress: true,
          callback: (group) => {
            // group.position.z = -1;
            // group.position.x = 3;
            group.scale.set(0.001, 0.001, 0.001);
            group.visible = true;
            coordinate().then((res) => {
              if (res.success) {
                let list = this.$refs.css2d.lineList;
                list.map((item) => {
                  let order = item.target && item.target.split("#").pop();
                  res.data.forEach((val, index) => {
                    if (val.lineOrder && order == val.lineOrder) {
                      // val.order
                      item.params = val;
                      item.visible = true;
                    } else if (order == index) {
                      item.params = val;
                      item.visible = true;
                    }
                  });
                });
              }
            });
          },
        },
        {
          name: "line",
          url: "model/20.gltf",
          draco: false,
          callback: (group) => {
            // group.position.y = -2;
            group.scale.set(0.001, 0.001, 0.001);
            group.visible = false;
          },
        },
        // {
        //   name: "9",
        //   url: "model/9.gltf",
        //   draco: false,
        //   onprogress: true,
        //   callback: (group) => {
        //     group.position.set(0, 0, 0.5);
        //     group.scale.set(0.001, 0.001, 0.001);
        //   },
        // },
      ];
    },
    progress(percent) {
      this.$refs.viewer.percent = percent;
    },
    showMenu() {
      setTimeout(() => {
        panelHandle([
          "leftMenu",
          "header",
          "rightMenu",
          "bottomMenu",
          "bodyFootMenu",
        ]);
      }, 500);
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
