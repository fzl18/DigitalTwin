<template>
  <div class="my-outbox">
    <div class="my-inbox" ref="box">
      <div class="my-list" v-for="(item, index) in sendVal" :key="index">
        <span>{{ item }}</span>
      </div>
      <div
        class="my-list"
        v-for="(item, index) in sendVal"
        :key="(index + 1) * 100"
      >
        <span>{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "marquee-left",
  props: {
    sendVal: Array,
  },
  data() {
    return {
      initLeft: 0,
      animateTarget: null,
      timer: null,
      speed: 1,
    };
  },
  mounted() {
    this.animateTarget = this.$refs.box;
    requestAnimationFrame(this.animateFn);
  },
  methods: {
    animateFn() {
      this.initLeft += this.speed;
      if (this.initLeft >= this.animateTarget.offsetWidth / 2) {
        this.initLeft = 0;
      }
      this.animateTarget.style =
        "transform: translate3d(-" + this.initLeft + "px,0,0)";
      this.timer = requestAnimationFrame(this.animateFn);
    },
  },
};
</script>

<style lang="scss" scoped>
.my-outbox {
  display: flex;
  color: #bbb; //#d7bc8d;
  overflow: hidden;
  height: 35px;
  position: relative;
  .my-inbox {
    white-space: nowrap;
    // position: absolute;
    font-size: 0;
    .my-list {
      margin-right: 25px;
      display: inline-block;
      font-size: 15px;
      height: 35px;
      line-height: 35px;
      .my-uname {
        color: #ff8900;
      }
    }
  }
  &::after,
  &::before {
    content: "";
    width: 120px;
    height: 35px;
    position: absolute;
    top: 0;
    z-index: 10;
    background-image: linear-gradient(
      to right,
      rgb(27, 17, 5),
      rgb(27, 17, 5),
      rgba(0, 0, 0, 0)
    );
  }
  &::before {
    left: -2px;
  }
  &::after {
    transform: rotate(180deg);
    right: -1px;
  }
}
</style>
