<template>
  <Box
    :isShow="isShow"
    :animateType="animateType"
    :duration="duration"
    :delay="delay"
  >
    <div :class="['block-box', skin]">
      <div class="title" v-if="$slots.head">
        <Box
          :isShow="isShow"
          :animateType="animateType"
          :duration="duration"
          :delay="delay + 0.2"
          ><slot name="head"></slot
        ></Box>
      </div>
      <div class="body">
        <template>
          <Box
            :isShow="isShow"
            :animateType="animateType"
            :duration="duration"
            :delay="delay + ($slots.head ? 0.4 : 0.2)"
            ><slot> </slot>
          </Box>
        </template>
      </div>
      <div class="foot" v-if="$slots.foot">
        <Box
          :isShow="isShow"
          :animateType="animateType"
          :duration="duration"
          :delay="delay + ($slots.head ? 0.6 : 0.4)"
          ><slot name="foot"></slot
        ></Box>
      </div>
    </div>
  </Box>
</template>

<script>
import config from "@/config";
export default {
  name: "BlockBox",
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
    skin: {
      type: String,
      default: config.layer.skin,
    },
  },
};
</script>

<style lang="scss" scoped>
.block-box {
  border: 1px solid #ddd;
  padding: 5px;
  .title {
    border-left: 3px solid rgb(6, 196, 221);
    padding-left: 5px;
    font-size: 18px;
  }
}
</style>
