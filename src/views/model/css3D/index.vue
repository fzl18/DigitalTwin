<template>
  <div class="css3d">
    <div
      :class="['label', item.type]"
      v-for="(item, index) in objList"
      :key="item.title + '_' + index"
      :style="item.style"
      :ref="`css3D${index}`"
      @click="handleClick(item)"
    >
      <div class="title">{{ item.title }}</div>
      <div class="body">{{ item.params }}</div>
    </div>
  </div>
</template>
<script>
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
const scale = 0.003;
export default {
  name: "Mscene",
  inject: ["global"],
  props: {
    objList: {
      type: Array,
      default: () => [
        {
          position: "",
          title: "css3d标题",
          type: "wef",
          params: "内容1",
          style: {},
        },
        {
          position: "",
          title: "css3d标题",
          type: "wefde",
          params: "内容2",
          style: {},
        },
      ],
    },
  },
  data() {
    return {};
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
      this.objList.forEach((item, index) => {
        let obj = new CSS3DObject(this.$refs["css3D" + index][0]);
        obj.position.set(-0.5 / scale, 0, index / scale);
        objectCss3dContainer.add(obj);
      });
    },
    handleClick(val) {
      console.log("点击了:" + val.title);
    },
  },
};
</script>

<style lang="scss" scoped>
.label {
  color: #fff;
  cursor: pointer;
  position: relative;
  // transform: translateX(50%);
  .title {
    border-bottom: 2px solid #e7eb17;
  }
}
</style>
