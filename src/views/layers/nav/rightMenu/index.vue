<template>
  <Box
    :isShow="$store.state.panel.rightMenu"
    animateType="faderight"
    :delay="0.3"
  >
    <div class="rightMenu">
      <ul>
        <li @click="show">{{ $store.state.panel.rightMenu ? "开" : "关" }}</li>
        <li @click="show">{{ $store.state.panel.rightMenu ? "开" : "关" }}</li>
        <li @click="show">{{ $store.state.panel.rightMenu ? "开" : "关" }}</li>
      </ul>
    </div>
  </Box>
</template>

<script>
export default {
  name: "rightMenu",
  inject: ["global"],
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
  ul {
    width: 200px;
    li {
      cursor: pointer;
      width: 20px;
      display: inline-block;
      height: 20px;
      border: 1px solid #fff;
      padding: 5px;
      margin: 0 10px;
    }
  }
}
</style>
