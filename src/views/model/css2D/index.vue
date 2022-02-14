<template>
  <div class="css2d">
    <div
      :class="[
        'label',
        $store.state.layer.css3DShow ? 'show' : 'hide',
        item.type,
      ]"
      v-for="(item, index) in objList"
      :key="item.title + '_' + index"
      :style="item.style"
      :ref="`css2D${index}`"
      @click="handleClick(item)"
    >
      <div class="title">{{ item.title }}</div>
      <div class="body">{{ item.params }}</div>
    </div>
  </div>
</template>
<script>
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer";
export default {
  name: "Mscene",
  inject: ["global"],
  props: {
    objList: {
      type: Array,
      default: () => [
        {
          target: "",
          title: "标题1",
          type: "",
          params: "内容",
          style: {},
        },
        {
          target: "",
          title: "标题2",
          type: "",
          params: "内容",
          style: {},
        },
      ],
    },
  },
  data() {
    return {};
  },

  mounted() {
    this.initCss2D();
  },
  watch: {},
  methods: {
    initCss2D() {
      const css2dContainer = document.createElement("div");
      const objectCss2dContainer = new CSS2DObject(css2dContainer);
      objectCss2dContainer.position.set(0, 0, 0);
      this.global.scene.add(objectCss2dContainer);
      this.objList.forEach((item, index) => {
        let obj = new CSS2DObject(this.$refs["css2D" + index][0]);
        obj.position.set(0, 0, index);
        objectCss2dContainer.add(obj);
      });
    },
    handleClick(val) {
      console.log("点击了:" + val.title);
      this.$store.state.screen.backgroundColor = "#333";
    },
  },
};
</script>

<style lang="scss" scoped>
.label {
  color: #fff;
  font-size: 14px;
  position: relative;
  cursor: pointer;
  &.show {
    display: block;
  }
  &.hide {
    display: none;
  }
}
</style>
