<template>
  <div class="topMenu">
    <div class="user">
      <span :title="userinfo.topUnitName" class="unit">{{
        userinfo.topUnitName
      }}</span>
      - {{ userinfo.userName }}
      <span v-if="userinfo.topUnitName" class="logout" @click="logout"
        >退出</span
      >
      <span ref="fullScreen" @click="screenfull"> 全</span>
    </div>
  </div>
</template>

<script>
import screenfull from "screenfull";
import api from "@/views/api/common";
export default {
  name: "topMenu",
  data() {
    return {
      userinfo: this.$store.state.userinfo,
    };
  },
  mounted() {},
  methods: {
    screenfull() {
      screenfull.toggle();
      this.$store.state.index.isFullscreen = !screenfull.isFullscreen;
    },
    logout() {
      let href = window.location.href;
      const url = `${api.logout}?redirectUrl=${href}`;
      window.location.href = url;
    },
  },
};
</script>

<style lang="scss" scoped>
.topMenu {
}
</style>
