<template>
  <div id="home" :style="homeStyle">
    <Container class="bg" ref="container">
      <div class="wrape" :style="wrapeStyle">
        <Model ref="viewer">
          <Msymbol :modelList="symbolList" @progress="progress" />
          <!-- <TTurebine /> -->
          <Css2D />
          <Css3D />
          <Effect />
          <Layers />
        </Model>
      </div>
    </Container>
  </div>
</template>

<script>
import Container from "./components/container";
import Layers from "./layers";
import Model from "./model";
import Msymbol from "./model/symbol";
import Css2D from "./model/css2D";
import Css3D from "./model/css3D";
import TTurebine from "./model/TTurebine";
import Effect from "./model/effect";
import {
  dailycheck, // 今日设备点检情况
  equipmentMaintain, // 本月设备故障维修率
  equipmentWarning, // 本月设备监测预警统计
  inspectioncheck, // 今日设备巡检情况
  inspectionLineTask, // 本月输送线巡检任务统计
  inspectionTask, // 本月巡检任务执行趋势
  workOrder, // 本月工单按时完成率
  query,
} from "./api/charts";
import {
  cardSumary, // 输送线卡片模式日周月汇总
  lineInfo, // 输送线滚动信息
} from "./api/monitorLine";

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
    TTurebine,
    Css2D,
    Css3D,
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
      console.log(mesh.name);
    },
  },
  mounted() {
    this.getSymbolList();
  },
  methods: {
    getSymbolList(id) {
      this.symbolList = [
        {
          name: "out",
          url: "model/out_small.glb",
          draco: true,
          // onprogress: true,
          callback: (group) => {
            // group.position.z = -1;
            // group.position.x = 3;
          },
        },
        {
          name: "tturebine",
          url: "model/untitled1_small.glb",
          draco: true,
          onprogress: true,
          callback: (group) => {
            group.position.y = -2;
            // group.position.x = 3;
          },
        },
        {
          name: "plane",
          url: "model/plane.glb",
          draco: true,
          callback: (group) => {
            group.position.y = -2;
          },
        },
        {
          name: "equipment",
          url: "model/equipment.glb",
          draco: true,
          onprogress: true,
          callback: (group) => {
            console.log(group);
            // group.position.z = 0;
            group.position.set(0, 0, 0);
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
  .wrape {
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }
}
</style>
