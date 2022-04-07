<template>
  <div
    :class="['box', isShow ? `${animateType}in` : `${animateType}out`]"
    :style="{
      opacity: isShow,
      transitionDuration: `${duration}s`,
      transitionDelay: isShow ? `${delay}s` : '0s',
    }"
  >
    <slot></slot>
  </div>
</template>

<script>
import config from "@/config";
export default {
  name: "transfBox",
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    animateType: {
      type: String,
      default: config.animationEffect.animateType,
    },
    duration: {
      type: Number,
      default: config.animationEffect.duration,
    },
    delay: {
      type: Number,
      default: config.animationEffect.delay,
    },
  },
  mounted() {},
  watch: {
    // isShow(v) {
    //   if (v) {
    //   } else {
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped>
.box {
  position: relative;
  transition: all 0.5s ease-in-out;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  // pointer-events: auto;
  // transform-origin: 0 0;
  &.fadeleftin {
    transform: translateX(0px);
  }
  &.fadeleftout {
    transform: translateX(-20px);
    opacity: 0;
    pointer-events: none;
  }
  &.faderightin {
    transform: translateX(0px);
  }
  &.faderightout {
    transform: translateX(20px);
    opacity: 0;
    pointer-events: none;
  }
  &.fadeupin {
    transform: translateY(0px);
  }
  &.fadeupout {
    transform: translateY(20px);
    opacity: 0;
    pointer-events: none;
  }
  &.fadedownin {
    transform: translateY(0px);
  }
  &.fadedownout {
    transform: translateY(-20px);
    opacity: 0;
    pointer-events: none;
  }
  &.flipin {
    transform: skewY(0deg);
    opacity: 1;
  }
  &.flipout {
    transform: skewY(90deg);
    opacity: 0;
    pointer-events: none;
  }
  &.togglein {
    transform: rotateY(0deg);
    opacity: 1;
  }
  &.toggleout {
    transform: rotateY(90deg);
    opacity: 0;
    pointer-events: none;
  }
}
</style>
