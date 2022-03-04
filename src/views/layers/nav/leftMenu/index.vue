<template>
  <Box :isShow="$store.state.panel.leftMenu" :delay="0.3">
    <div
      class="leftMenu"
      :style="{ width: $store.state.layer.leftSideWidth + 'px' }"
    >
      <!-- <div
        v-for="(item, index) in list"
        :key="index"
        @click="command(item.action)"
        class="list"
      >
        <Box :isShow="$store.state.panel.leftMenu" :delay="0.3 + index * 0.2">
          <div class="item">{{ item.name }}</div>
        </Box>
      </div> -->
      <slot />
    </div>
  </Box>
</template>

<script>
import { cameraViewerTransfrom } from "@/utils/action";
export default {
  name: "leftMenu",
  // inject: ["global"],
  data() {
    return {
      list: [
        {
          name: "镜头远近",
          action: "change",
        },
        {
          name: "显隐切换",
          action: "hidden",
        },
        {
          name: "线框切换",
          action: "material",
        },
        {
          name: "动画启停",
          action: "play",
        },
      ],
    };
  },
  mounted() {},
  methods: {
    command(name) {
      this[name]();
    },
    // change() {
    //   const { camera } = this.global;
    //   let tw1 = cameraViewerTransfrom(camera, { x: 0.2, y: -5, z: 1 });
    //   let tw2 = cameraViewerTransfrom(camera, { x: -0.2, y: -2, z: 0.2 });
    //   tw1.chain(tw2);
    //   tw1.start();
    // },
    // material() {
    //   // console.log(this.global.scene.children[4].children[0]);
    //   this.global.scene.children[4].children[0].children[0].visible = !this
    //     .global.scene.children[4].children[0].children[0].visible;
    //   this.global.scene.children[4].children[0].children[1].visible = !this
    //     .global.scene.children[4].children[0].children[0].visible;
    // },
    // hidden() {
    //   this.global.scene.children[4].visible = !this.global.scene.children[4]
    //     .visible;
    //   this.global.scene.children[6].visible = !this.global.scene.children[4]
    //     .visible;
    // },
    // play() {
    //   console.log(this.global.mixers);
    //   this.global.mixers.get("Anim_0").timeScale = !this.global.mixers.get(
    //     "Anim_0"
    //   ).timeScale;
    // },
  },
};
</script>

<style lang="scss" scoped>
.leftMenu {
  // display: flex;
  // justify-content: space-between;
  // flex-direction: column;
  height: 100%;
  // padding: 20px 30px;
  background: rgba(0, 0, 0, 0.349);
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 3px;
  }
  &:hover {
    &::-webkit-scrollbar {
      width: 3px;
      background-color: rgba(39, 33, 5, 0.3);
      border-radius: 20px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(194, 168, 55, 0.1);
      border-radius: 20px;
    }
  }
  // .list {
  //   .item {
  //     display: block;
  //     padding: 5px 15px;
  //     margin: 10px;
  //     border: 1px solid #fff;
  //     cursor: pointer;
  //   }
  // }
}
</style>
