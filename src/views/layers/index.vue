<template>
  <div class="layers" :style="screenStyle">
    <div class="header-layers"><Header /></div>
    <div class="panel">
      <Panel />
    </div>
    <div class="middle-layers">
      <div class="left">
        <LeftMenu />
      </div>
      <div class="center" v-if="true">
        <div class="body" :style="bodyStyle">
          body
        </div>
        <div class="foot">foot</div>
      </div>
      <div class="right">
        <RightMenu />
      </div>
    </div>
    <div class="bottom-layers">
      <BottomMenu />
    </div>
    <Popup :visible="visible">
      <Model
        :size="{ w: 700, h: 700 }"
        :isMask="false"
        v-if="symbolList.length"
        ref="modelViewer"
      >
        <Msymbol :modelList="symbolList" @progress="progress" />
      </Model>
    </Popup>
  </div>
</template>

<script>
import Header from "./header";
import LeftMenu from "./nav/leftMenu";
import BottomMenu from "./nav/bottomMenu";
// import TopMenu from "./nav/topMenu";
import RightMenu from "./nav/rightMenu";
import Panel from "./panel";
import Popup from "../components/popup.vue";
import Model from "../model";
import Msymbol from "../model/symbol";
export default {
  name: "layer",
  components: {
    Header,
    LeftMenu,
    RightMenu,
    // TopMenu,
    BottomMenu,
    Panel,
    Popup,
    Model,
    Msymbol,
  },
  data() {
    return {
      symbolList: [],
    };
  },
  watch: {
    visible(val) {
      if (val) {
        this.getsymbolLIst();
      } else {
        this.symbolList = [];
      }
    },
  },
  mounted() {},
  computed: {
    visible() {
      return this.$store.state.layer.popupShow;
    },
    offset() {
      return this.$store.state.screen.offset;
    },
    screenStyle() {
      const { width, height, fontSize } = this.$store.state.screen;
      const { hueRotate } = this.$store.state.layer;
      return {
        width: width + "px",
        height: height - this.offset + "px",
        fontSize: fontSize + "px",
        filter: `hue-rotate(${hueRotate}deg)`,
      };
    },
    bodyStyle() {
      const { height, sceneHeight } = this.$store.state.screen;
      return {
        height: height == sceneHeight ? "100%" : sceneHeight + "px",
      };
    },
  },
  methods: {
    getsymbolLIst(id) {
      this.symbolList = [
        {
          name: "equipment",
          url: "model/equipment.glb",
          draco: true,
          onprogress: true,
          callback: (group) => {
            // group.position.z = 0;
            group.position.x = 0;
          },
        },
      ];
    },
    progress(percent) {
      this.$refs.modelViewer.percent = percent;
    },
  },
};
</script>

<style lang="scss" scoped>
.layers {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  z-index: 9999;
  pointer-events: none;
  .header-layers {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    pointer-events: auto;
    z-index: 999;
  }
  .middle-layers {
    pointer-events: none;
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: space-between;
    .center {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      .body {
      }
      .foot {
      }
    }
    .left,
    .right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
    }
    .left {
    }
    .right {
    }
  }
  .bottom-layers {
    width: 100%;
    pointer-events: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
