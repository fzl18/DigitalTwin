<template>
  <Box :isShow="$store.state.panel.leftMenu" :delay="0.3">
    <div class="leftMenu">
      <div
        v-for="(item, index) in list"
        :key="index"
        @click="command(item.action)"
        class="list"
      >
        <Box :isShow="$store.state.panel.leftMenu" :delay="0.3 + index * 0.2">
          <div class="item">{{ item.name }}</div>
        </Box>
      </div>
    </div>
  </Box>
</template>

<script>
import { cameraViewerTransfrom } from "@/utils/action";
export default {
  name: "leftMenu",
  inject: ["global"],
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
    change() {
      const { camera } = this.global;
      let tw1 = cameraViewerTransfrom(camera, { x: 0.2, y: -5, z: 1 });
      let tw2 = cameraViewerTransfrom(camera, { x: -0.2, y: -2, z: 0.2 });
      tw1.chain(tw2);
      tw1.start();
    },
    material() {
      // console.log(this.global.scene.children[4].children[0]);
      this.global.scene.children[4].children[0].children[0].visible = !this
        .global.scene.children[4].children[0].children[0].visible;
      this.global.scene.children[4].children[0].children[1].visible = !this
        .global.scene.children[4].children[0].children[0].visible;
    },
    hidden() {
      this.global.scene.children[4].visible = !this.global.scene.children[4]
        .visible;
      this.global.scene.children[6].visible = !this.global.scene.children[4]
        .visible;
    },
    play() {
      console.log(this.global.mixers);
      this.global.mixers.get("Anim_0").timeScale = this.global.mixers.get(
        "Anim_0"
      ).timeScale
        ? 0
        : 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.leftMenu {
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  padding: 20px 30px;
  background: rgba($color: #000000, $alpha: 0.3);
  .list {
    .item {
      display: block;
      padding: 5px 15px;
      margin: 10px;
      border: 1px solid #fff;
      cursor: pointer;
    }
  }
}
</style>
