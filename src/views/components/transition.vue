<template>
  <div class="transition" v-show="showing">
    <div
      v-if="$store.state.curObjLevel != 4"
      class="box"
      :class="animation"
      :style="{ 'transition-duration': $store.state.delay + 'ms' }"
    >
      <slot />
    </div>
    <div v-else>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "transition",
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      zoomlevel: 1,
      animation: "",
      showing: false,
    };
  },
  mounted() {},

  watch: {
    isShow(val) {
      if (val) {
        this.showing = true;
        setTimeout(() => {
          this.animation = "fadeIn";
        }, 100);
      } else {
        this.animation = "fadeOut";
        setTimeout(() => {
          this.showing = false;
        }, this.$store.state.delay);
      }
    },
  },
  methods: {
    init() {},
  },
};
</script>

<style lang="scss" scoped>
.transition {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  .box {
    left: -2rem;
    opacity: 0;
    transition: all;
    position: relative;
  }
  .fadeIn {
    left: 0rem;
    opacity: 1;
  }
  .fadeOut {
    left: -2rem;
    opacity: 0;
  }
}
</style>
