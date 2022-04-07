<template>
  <div class="css3d">
    <div
      :class="[
        'label',
        isShow(item.useType) && $store.state.model.currentSecne == item.type
          ? 'show'
          : 'hide',
        item.type,
      ]"
      v-for="(item, index) in lineList"
      :key="item.title + '_' + index"
      :style="item.style"
      :ref="`css3D${index}`"
      @click="handleClick(item)"
    >
      <div class="title">
        {{ item.title }}
      </div>
      <!-- <div class="body">{{ item.params }}</div> -->
    </div>
    <!-- <div
      :class="[
        'button',
        item.class,
        $store.state.model.currentSecne == item.type ? 'show' : 'hide',
      ]"
      v-for="(item, index) in otherList"
      :key="item.title + '_' + index"
      :ref="`otherCss3D${index}`"
      @click="handleClick(item)"
    >
      <div class="title">
        {{ item.title }}
      </div>
    </div> -->
  </div>
</template>
<script>
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
const scale = 0.003;
export default {
  name: "Css3D",
  inject: ["global"],
  props: {},
  data() {
    return {
      lineList: [
        {
          title: "温度监测",
          type: "lineDetail",
          params: "",
          style: {},
          rotate: [0, 360, 0],
          position: [1.8, 0.07, -0.1],
          useType: "wd",
        },
        {
          title: "数字化输送带",
          type: "lineDetail",
          params: "",
          style: {},
          rotate: [0, 360, 0],
          position: [1.4, 0.1, -0.1],
          useType: "belt",
        },
        {
          title: "纵斯监测",
          type: "lineDetail",
          params: "",
          style: {},
          rotate: [0, 360, 0],
          position: [0.8, 0.1, -0.1],
          useType: "zs",
        },
      ],
      otherList: [
        // {
        //   title: "prev",
        //   type: "lineDetail",
        //   class: "prev",
        //   rotate: [-180, 0, 0],
        //   position: [-1, -0.3, 0.3],
        // },
        // {
        //   title: "next",
        //   type: "lineDetail",
        //   class: "next",
        //   rotate: [-180, 0, 0],
        //   position: [1, -0.3, 0.3],
        // },
      ],
    };
  },
  computed: {
    visible() {
      return this.$store.state.model.currentLineHasModelType;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initCss3D();
    });
  },
  watch: {},
  methods: {
    initCss3D() {
      const css3dContainer = document.createElement("div");
      css3dContainer.className = "css3dContainer";
      const objectCss3dContainer = new CSS3DObject(css3dContainer);
      objectCss3dContainer.position.set(0, 0, 0);
      objectCss3dContainer.scale.set(1 * scale, 1 * scale, 1 * scale);
      this.global.scene.add(objectCss3dContainer);

      this.lineList.forEach((item, index) => {
        let obj = new CSS3DObject(this.$refs["css3D" + index][0]);
        obj.position.set(
          item.position[0] / scale,
          item.position[1] / scale,
          item.position[2] / scale
        );
        if (item.rotate) {
          obj.rotateY((Math.PI / 360) * item.rotate[1]);
        }
        objectCss3dContainer.add(obj);
      });
      this.otherList.forEach((item, index) => {
        let obj = new CSS3DObject(this.$refs["otherCss3D" + index][0]);
        obj.position.set(
          item.position[0] / scale,
          item.position[1] / scale,
          item.position[2] / scale
        );
        if (item.rotate) {
          obj.rotateX((Math.PI / 360) * item.rotate[0]);
          obj.rotateY((Math.PI / 360) * item.rotate[1]);
          obj.rotateZ((Math.PI / 360) * item.rotate[2]);
        }
        objectCss3dContainer.add(obj);
      });
    },
    handleClick(val) {
      if (val.useType) {
        this.$store.state.panel.currentType = null;
        setTimeout(() => {
          this.$store.state.panel.currentType = val.useType;
        }, 300);
      }
    },
    isShow(val) {
      return this.$store.state.model.currentLineHasModelType.includes(val);
    },
  },
};
</script>

<style lang="scss" scoped>
.label {
  color: #fff;
  cursor: pointer;
  position: relative;

  text-align: center;
  // transform: translateX(50%);
  &.show {
    display: block;
  }
  &.hide {
    display: none;
  }

  &.factory {
    border: 1px solid #fff;
    box-shadow: 0 0 10px #e7eb17;
    background: rgba($color: #e7eb17, $alpha: 0.2);
    .title {
      font-size: 50px;
    }
  }
  &.lineDetail {
    filter: hue-rotate(340deg) contrast(1);
    position: relative;
    &::before {
      content: "";
      position: absolute;
      top: 120px;
      left: 20px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #e7eb17;
    }
    &::after {
      content: "";
      position: absolute;
      top: 30px;
      left: 22px;
      width: 1px;
      height: 90px;
      background: #e7eb17;
    }
    .title {
      font-size: 12px;
      padding: 5px;
      position: relative;
      border-top: 4px solid #e7eb17;
      border-radius: 3px;
      box-shadow: 0 0 6px #e7eb17;
      background: rgba($color: #e7eb17, $alpha: 0.2);
      // width: 120px;
    }
  }
}
.button {
  color: #fff;
  cursor: pointer;
  position: relative;
  text-align: center;
  &.show {
    display: block;
  }
  &.hide {
    display: none;
  }
  &.next,
  &.prev {
    font-size: 26px;
    padding: 15px;
    background: #ff9012;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      border: 23px solid transparent;
    }
  }
  &.prev {
    &::after {
      left: -38px;
      border-right: 15px solid #ff9012;
    }
  }
  &.next {
    &::after {
      right: -38px;
      border-left: 15px solid #ff9012;
    }
  }
}
</style>
