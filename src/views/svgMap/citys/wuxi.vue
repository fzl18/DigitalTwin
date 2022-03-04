<template>
  <div class="city">
    <div class="map">
      <img src="@/assets/img/skin/blackgold/city/wuxi_bg.png" alt="" />
    </div>
    <div class="map-point">
      <div class="dot" @click="goto('xinchen')"></div>
      <div class="factory" @click="goto('xinchen')">
        <div class="name">
          <span>{{ "兴澄特钢" }}</span>
          <span>中国 • 江阴</span>
        </div>
        <div>
          <img
            src="@/assets/img/skin/blackgold/factorys/xinchen_pic.png"
            alt=""
          />
        </div>
      </div>
    </div>
    <svg version="1.1" viewBox="0 0 1964 1135" xml:space="preserve">
      <defs>
        <filter id="f1" x="0" y="0" width="200%" height="200%">
          <feOffset result="offOut" in="SourceAlpha" dx="20" dy="20" />
          <feGaussianBlur result="blurOut" in="offOut" stdDeviation="3" />
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
      </defs>
      <!-- <g filter="url(#f1)"> -->
      <path
        class="st0"
        d="M1010,752l-7,2l-35-11l-7-7l-6-10l-2-15l5-22l7-15l6-46l-2-5l1-4l-5-3l-1-3l-11-3l-4-4l-8,2l-6-4v9l-11-12
		l-6-3l-1-18l-22-8v-2l-5-4l-17,4l-35,2l-3,2l-8,12l-5,1l-7-1l-20-18l-9-3h-21l-5-3l-14-3l-3-2l-4,1l-5,5h-4l-2-2l-2-8v-7h-7l-11-24
		l-5,1l-4-5l-4-1l-7,1l-10,4l-3,3v9l2,1v6l3,4l-4,7l-3,1l-7,7h-7l-7,6l-5,12l-6,6l-7,23l-3,1l-8-3l-1,2v9l4,10l2,1l-2,8l-5,1l-1,2
		l1,4l17-2l2,3l-2,4v9l-5,2v6l-4,6l-16-2l-1,14l2,2l-2-1v3l-5-1l-8,6l5,10l-5,11v3l-4,6l-2,9l1,13l2,5l-1,7l-7,11v4l2,2v9l9,8l-3,3
		v9l3,1v3l-4,3l2,9l-4,5l1,4l-4,5l8,5l7,8l6,2l1,3l-2,4l2,3l1,18l-1,11l-7,3l-5,6l-3,8l10,9l10,6l8,10l2,13l2,3l4,2l7-2l6,1l10-17
		l12-2l6-3l2-11l6-5l5-1l5-4v-4l7-3h4l3,7l16,7l3-2l3-12l2-1h6l11-4l4,4h3l23-8l9,6l1,3l-3,5l1,5l5-1l9,8l10-5l4-4l-1-4l-3-2l3-7h7
		l3,4l4,1l7-2l7,2l9,6h3l13-7l14-1l139-80l46-38l26-31l152-88h3l3,3l3-1l3,3h2l-4-5l20,3l11-1l8-3l-1,2h8v-3l4-6l10,2l2-2l-1-6l6-3
		l5,2l4-1l14-9l-2-8l-3-2l-1-5l6-10l9-4l16-13l3,1l1,7l2,1l1-2h2l2-5v-9l-2-5l2-4l-4-2l-4-24l-7-8l-12,1l4,6l-4,1l-3-3l-8,4l-4-1
		l-3-22l2-2l5-1l3,4l7-1v-6l8-4l10,2l7-5l-7-7l3-5l-4-5l4-6l-2-5l-15-5h-8l-2-2l6-2v-16l-3-1l3-2l2-5l5-1l-1-2l2,2v-3h5l8-11l4-2
		l-1-2l-7-3h-4l-2-6v-6l2-5l4-1l3-5l4-3l-1-9l-3-5l-4-1l1-4l-4-13l-10-10l-9,7l-2-1v-6l-7,1l-1,3l-10,1v-5l-3-2l-3-9l1-4l5-5v-9
		l-12-12l-5-2l-3,2l-1-9l-7-12l-1-5l-16-7l-2-9l-12-1l-10-3l-25-11v2l-4-2l-3,2l-1-2l-4-1v-2l-4-1l1-5l7-6v-6l-11-8l-2-4l-3-13l1-25
		l-13,9l-42,22l-42,19l-23,1l-52-7l-81-24l-10,14l-1,13l3,6l8,8l-13,7l-3,5l1,3l-3,7l3,4h3l2,5l4,1l-3,6l2,3l-4,4v3l-3,4l-6,3h-4
		l2,5h3v3h3v7l2-1v9l2,3l2-2l2,3l2-1l3,2l5-8h2l3,5l9,4l2-4l7-5l-1-1l18-12l4-5l9-2h14l4-3h15l2-3l8-5l13-2l5,5l2,7l-11,18l-4,2v3
		l1,4l5,2l-2,5l2,2l5,1l-4,11l8,11l6,17l4,5l2-2l1,3l-2,1h3l1,2v3l-16,3v-3l-4-4h-4l-3-2l-9,3l-1,14l2,9l-2,3l2,1v3l3,4h-2v3l-2,1
		l1,8l-3,1v3l-6,2l-2,7l5,2l1,3l-5,6l-11-8l-2,9l-1,22l-4,15l-11,2l-1,3l-6,6l-14,10v10l-13,12l-1,4l3,3v3l-3,5l6,7l4,2l7-2l2,1v3
		l11,1l1,3l-3,3h4l2,3l-1,8l2,1v8l-2,2l2,3l3,1l6-6v2l3,1l-1,8l2,1l1-6l5,6l-14,17l-4,12l3,8l-22,10l-13,8l-5,5l-7,24l-4,24l1,12
		l3,5l36,4l4,12V752z"
      />
      <path
        class="st1"
        d="M1361,416l-1,2l-9,2l-12-3l-12,5l-12-12l-7,9l-3,9l-5,1l-1,2l-4,1v-4l-3-1l-11,2l-7-3l-4,5l-3-1l-1,4l-3,1
		l-12,1l-2,2l-9-2l-9,5h-9l-10,5l2,9l2,3l5,1l1,3l-6,6l-3,1l-8,11l-4-2l-3,3h-9l1,14h-9v-2h-3l-9,3l-2,2l-1,17l6-1l13,3l7-1l2,3v3
		l-8,1l-1,3l2,1l2,6v13l3,1l-1,4l-2,1l2,3l3-2l11-2l1-3l7-2l5,2l5,6l3-2l-2-4l4-5l11-1l1-2l13,6h8l3,6l5,1l2,3l6-2v2h5v3h2l1,2l3-1
		v4l7-2l9,4l1,3l-2,4l3,2l-1,3l2,3l8,7l4-2l3,2l-4,5l-1,5l2,1l-4,1v3l2,2l-2,5l3-3l2,2v3l4,3l3,6h8l4,4l1,6l2-1v-2l-2-6l-3-2l-1-5
		l6-10l9-4l16-13l3,1l1,7l2,1l1-2h2l2-5v-9l-2-3l2-6l-4-2l-4-24l-5-6l-2-2h-10l-2,1l4,6l-4,1l-3-3l-10,4l-2-1v-6l-2-2l-1-14l2-2l5-1
		l3,4l7-1v-6l8-4l10,2l7-5l-7-7l3-5l-4-5l4-6l-2-5l-15-5h-8l-2-2l6-2v-16l-3-1l3-2l2-5l5-1l-1-2l2,2v-3h5l8-11l4-2l-1-2l-7-3h-4
		l-2-6V416z"
      />
      <path
        class="st1"
        d="M992,565l20-8l8-5v-2l4-1l2-4h5l4-4l20-10l1,17l2,6l2,2h4l2,7l2,1l2-2l3-7l8,4v-7l14-7l3,1v-3l-5-10l1-1l10-2
		l9,2l4-7l-4-13l4-4l-2-4l7-1l6,6l3-2v-3l3-5l9,2v2l13,1l9,6l2-12l2-2l9-3h3v2h9l-1-14h9l2-3l4,2l9-11l3-1l6-6v-2l-6-2l-3-5l-1-7
		l-12,5l-8-2l-10-4l-2-3l-10-3l-20,2l-7-4l-6-18l-13,4l-1-4l-5-2l-8-1l-12,4l-10-2l-3-8l1-4l-2-11l-13,2v-3l-4-4h-4l-3-2l-9,3l-1,14
		l2,9l-2,3l2,1v3l3,4h-2v3l-2,1l1,8l-3,1v3l-6,2l-2,7l5,2l1,3l-5,6l-11-8l-2,9l-1,22l-4,15l-11,2l-1,3l-6,6l-14,10v10l-13,12l-1,4
		l3,3v3l-3,5l6,7l4,2l2-1H992z"
      />
      <path
        class="st1"
        d="M1010,752l8,60l46-38l26-31l106-61l-1-38l5-9l-3-2l-1-12l4-3l-7-14l8-4l-3-5l-8-7l-7-2l-5,9l-4,2l-1,3h-7l-5-4
		l1-3h2l-1-5l-1,2l-8,1l-2-2l2-5l-3-1l-1-2h-3l-2-14l3-6l-7-10l1-6l-3-3h-7l1,2l-10-2l-8-6l-1-4l-6-2l-14,2l-1,1l5,10v3l-3-1l-14,7
		v7l-8-4l-5,9l-2-1l-2-7h-4l-2-2l-2-6l-1-17l-24,14h-5l-2,4l-4,1v2l-8,5l-20,8l3-1l2,1v3l11,1l1,3l-3,3h4l2,3l-1,8l2,1v8l-2,2l2,3
		l3,1l6-6v2l3,1l-1,8l2,1l1-6l5,6l-14,17l-4,12l3,8l-22,10l-13,8l-5,5l-7,24l-4,24l1,12l3,5l36,4l4,12V752z"
      />
      <path
        class="st1"
        d="M1189,546v-13l-2-6l-2-1l1-3l8-1l-2-6l-7,1l-13-3l-6,1v-6l-1,1l-9-6l-13-1v-2l-9-2l-3,5v3l-3,2l-6-6l-7,1l2,4
		l-4,4l4,13l-3,7l1,4l8,6l6,2h4l-1-2h7l3,3l-1,6l7,10l-3,6l2,14h3l1,2l3,1l-2,5l2,2l8-1l1-2l1,5h-2l-1,3l5,4h7l1-3l4-2l5-9l7,2
		l-8-10l1-4l4-2l-6-9h-7l-1-3h-2l2-2l-2-6l2-1h-3l-1-4l-1,2l-2-1h2l-1-2l1-2v2l2-1v-3l3,7v-2l2-1v2h2v4l-2-1l4,2v-9l2,4l6-2H1189z"
      />
      <path
        class="st1"
        d="M1190,588l8,7l3,5l-8,4l7,14l-4,3l1,12l3,2l-5,9l1,38l46-27h3l3,3l3-1l3,3h2l-4-5l20,3l11-1l8-3l-1,2h8v-3l4-6
		l10,2l2-2l-1-6l6-3l5,2l4-1l12-8l-1-5l-4-5h-8l-3-6l-4-3v-3l-2-2l-2,3l1-5l-2-2v-3l4-1l-2-1l1-5l4-5l-3-2l-4,2l-8-7l-2-3l1-3l-3-2
		l2-4l-1-3l-9-4l-7,2v-4l-3,1l-1-2h-2v-3h-5v-2l-6,2l-2-3l-3,1l-5-8h-8l-13-6l-1,2l-11,1l-3,3l1,6l-3,2l-4-6l-5-2l-8,2l-1,3l-11,2
		l-3,2l-2-3l2-1l1-4l-5-1l-6,2l-2-4v9l-4-1h2v-4h-2v-2l-2,1v2l-3-7v3l-2,1v-2v4h-2l2,1l1-2l1,4h3l-2,1l2,6l-2,2h2l1,3h7l6,9l-4,2
		l-1,4l8,9V588z"
      />
      <path
        class="st1"
        @click="goto('xinchen')"
        d="M1361,416l2-5l4-1l3-5l4-3l-1-9l-3-5l-4-1l1-4l-4-13l-10-10l-9,7l-2-1v-6l-7,1l-1,3l-10,1v-5l-3-2l-3-9l1-4
		l5-5v-9l-12-12l-5-2l-3,2l-1-9l-7-12l-1-5l-16-7l-2-9l-12-1l-10-3l-25-11v2l-4-2l-3,2l-1-2l-4-1v-2l-4-1l1-5l7-6v-6l-11-8l-2-4
		l-3-13l1-25l-13,9l-42,22l-42,19l-23,1l-52-7l-81-24l-10,14l-1,13l3,6l8,8l-13,7l-3,5l1,3l-3,7l3,4h3l2,5l4,1l-3,6l2,3l-4,4v3l-3,4
		l-6,3h-4l2,5h3v3h3v7l2-1v9l2,3l2-2l2,3l2-1l3,2l5-8h2l3,5l9,4l2-4l7-5l-1-1l18-12l4-5l9-2h14l4-3h15l2-3l8-5l13-2l5,5l2,7l-11,18
		l-4,2v3l1,4l5,2l-2,5l2,2l5,1l-4,11l8,11l6,17l4,5l2-2l1,3l-2,1h3l1,2v3l-3,1l2,11l-1,4l3,8l10,2l12-4l8,1l5,2l1,4l13-4l7,19l6,3
		l20-2l10,3l2,3l10,4l8,2l16-6l6-4h9l9-5l9,2l2-2l15-2l1-4l3,1l4-5l7,3l11-2l3,1v4l4-1l1-2l5-1l2-9l8-9l12,12l12-5l8,3l13-2
		L1361,416z"
      />
      <path
        class="st1"
        d="M1010,752l-7,2l-35-11l-7-7l-6-10l-2-15l5-22l7-15l6-46l-2-5l1-4l-5-3l-1-3l-11-3l-4-4l-8,2l-6-4v9l-11-12
		l-6-3l-1-18l-22-8v-2l-5-4l-17,4l-35,2l-3,2l-8,12l-5,1l-7-1l-20-18l-9-3h-21l-5-3l-14-3l-3-2l-4,1l-5,5h-4l-2-2l-2-8v-7h-7l-11-24
		l-5,1l-4-5l-4-1l-7,1l-10,4l-3,3v9l2,1v6l3,4l-4,7l-3,1l-7,7h-7l-7,6l-5,12l-6,6l-7,23l-3,1l-8-3l-1,2v9l4,10l2,1l-2,8l-5,1l-1,2
		l1,4l17-2l2,3l-2,4v9l-5,2v6l-4,6l-16-2l-1,14l2,2l-2-1v3l-5-1l-8,6l5,10l-5,11v3l-4,6l-2,9l1,13l2,5l-1,7l-7,11v4l2,2v9l9,8l-3,3
		v9l3,1v3l-4,3l2,9l-4,5l1,4l-4,5l8,5l7,8l6,2l1,3l-2,4l2,3l1,18l-1,11l-7,3l-5,6l-3,8l10,9l10,6l8,10l2,13l2,3l4,2l7-2l6,1l10-17
		l12-2l6-3l2-11l6-5l5-1l5-4v-4l7-3h4l3,7l16,7l3-2l3-12l2-1h6l11-4l4,4h3l23-8l9,6l1,3l-3,5l1,5l5-1l9,8l10-5l4-4l-1-4l-3-2l3-7h7
		l3,4l4,1l7-2l7,2l6,5l6,1l13-7l14-1l139-80L1010,752z"
      />
      <!-- </g> -->
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {
      factory: "",
    };
  },
  methods: {
    goto(factoryName) {
      this.$store.state.index.curFactory = factoryName;
      this.$store.state.index.curObjLevel = 4;
      this.$store.state.index.zoomlevel = this.$store.state.index.defaultZoomLevel;
    },
  },
};
</script>

<style lang="scss" scoped>
.city {
  .map {
    position: absolute;
    left: 0;
    top: 0;
  }
}
svg {
  position: absolute;
  top: 74px;
  left: -38px;
  width: 1213px;
  transform: scale(1.52);
  path {
    fill: #333;
    fill-opacity: 0.1;
    &:hover {
      fill: #d8aa50;
      fill-opacity: 1;
      pointer-events: all;
    }
  }
}
.st0 {
  stroke: #d8aa50;
  stroke-width: 3.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.st1 {
  stroke: #d8aa50;
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1, 6;
}
.map-point {
  z-index: 666;
  .dot {
    position: absolute;
    top: 160px;
    left: 280px;
    width: 27px;
    height: 47px;
    // pointer-events: none;
    &::before {
      content: "";
      display: block;
      position: relative;
      left: -4px;
      top: -8px;
      width: 27px;
      height: 47px;
      background: url("../../../assets/img/skin/blackgold/dot.png") no-repeat;
      cursor: pointer;
      animation: jump 2s linear infinite;
    }
    &::after {
      content: "";
      display: block;
      position: relative;
      left: -130px;
      top: -22px;
      width: 223px;
      height: 48px;
      background: url("../../../assets/img/skin/blackgold/light.png") no-repeat;
      pointer-events: none;
      animation: light 2s linear infinite;
      transform-origin: 60% center;
    }
  }
  .factory {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid #fff;
    width: 228px;
    .name {
      padding: 10px 15px;
      border: 1px solid #d8aa50;
      border-right: none;
      background: rgba(0, 0, 0, 0.8);
      span {
        display: block;
        line-height: 26px;
        &:nth-child(1) {
          font-size: 18px;
          font-weight: bold;
        }
      }
    }
    cursor: pointer;
    position: relative;
    text-align: center;
    top: 350px;
    left: -80px;
  }
  position: absolute;
  top: -58px;
  left: 466px;
  &::after {
    content: "";
    position: relative;
    top: 349px;
    left: 148px;
    height: 1px;
    width: 280px;
    background: #fff;
    display: block;
    transform-origin: 0;
    transform: rotate(-60deg);
  }
  &::before {
    content: "";
    position: relative;
    top: 448px;
    left: -82px;
    border-radius: 50%;
    height: 10px;
    width: 10px;
    background: #fff;
    display: block;
  }
}
@keyframes ripple {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(3);
    opacity: 0;
  }
}
@keyframes jump {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, 10px, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes light {
  0% {
    transform: scale(0.7) translateZ(0);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.1) translateZ(0);
    opacity: 1;
  }
  100% {
    transform: scale(0.7) translateZ(0);
    opacity: 0.6;
  }
}
</style>
