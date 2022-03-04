<template>
  <Box
    :isShow="$store.state.panel.rightMenu"
    animateType="faderight"
    :delay="0.3"
  >
    <div
      class="rightMenu"
      :style="{ width: $store.state.layer.rightSideWidth + 'px' }"
    >
      <!-- <ul>
        <li @click="show">{{ $store.state.panel.rightMenu ? "开" : "关" }}</li>
        <li @click="show">{{ $store.state.panel.rightMenu ? "开" : "关" }}</li>
        <li @click="show">{{ $store.state.panel.rightMenu ? "开" : "关" }}</li>
      </ul> -->
      <slot />
    </div>
  </Box>
</template>

<script>
export default {
  name: "rightMenu",
  // inject: ["global"],
  data() {
    return {};
  },
  mounted() {},
  methods: {
    show() {
      this.$store.state.panel.rightMenu = !this.$store.state.panel.rightMenu;
    },
  },
};
</script>

<style lang="scss" scoped>
.rightMenu {
  background: rgba(0, 0, 0, 0.349);
  height: 100%;
  width: 100%;
  // display: flex;
  // justify-content: space-between;
  // flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  overflow-y: auto;
  // padding: 20px;
  // ul {
  //   li {
  //     cursor: pointer;
  //     width: 20px;
  //     display: inline-block;
  //     height: 20px;
  //     border: 1px solid #fff;
  //     padding: 5px;
  //     margin: 0 10px;
  //   }
  // }
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
}
</style>
