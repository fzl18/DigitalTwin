<template>
  <Transition ref="transition" :isShow="isShow">
    <div class="area" :style="{ transform: `scale(${zoomlevel})` }">
      <div class="earth">
        <img
          src="@/assets/img/skin/blackgold/world_map.png"
          alt=""
          draggable="false"
        />
        <div class="point">
          <div class="map-point cn">
            <div class="dot" @click="goto('jiangsu')"></div>
            <div class="factory" @click="goto('xinchen', true)">
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
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import Transition from "./components/transition.vue";
export default {
  components: {
    Transition,
  },
  data() {
    return {};
  },
  mounted() {},
  computed: {
    zoomlevel() {
      return this.$store.state.zoomlevel;
    },
    isShow() {
      return this.$store.state.curObjLevel == 0;
    },
  },
  methods: {
    init() {},
    goto(name, isFactory = false) {
      if (isFactory) {
        this.$store.state.curFactory = name;
        this.$store.state.curObjLevel = 4;
      } else {
        this.$store.state.curProvince = name;
        this.$store.state.curObjLevel = 1;
      }
      this.$store.state.zoomlevel = this.$store.state.defaultZoomLevel;
    },
  },
};
</script>

<style lang="scss" scoped>
.area {
  transition: transform 0.5s;
  transform-origin: center;
  position: relative;
  .earth {
    // height: 100vh;
    top: 2.5rem;
    left: 0;
    position: relative;
    .point {
      position: absolute;
      top: 0;
      left: 0;
      .cn {
        position: absolute;
        left: 620px;
        top: -30px;
      }
    }
  }
}

.map-point {
  z-index: 666;
  .dot {
    position: absolute;
    top: 160px;
    left: 280px;
    width: 27px;
    height: 47px;
    &::before {
      content: "";
      display: block;
      position: relative;
      left: -4px;
      top: -8px;
      width: 27px;
      height: 47px;
      background: url("../assets/img/skin/blackgold/dot.png") no-repeat;
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
      background: url("../assets/img/skin/blackgold/light.png") no-repeat;
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
    top: 0;
    left: 0;
  }
  position: absolute;
  top: 330px;
  left: 588px;
  &::after {
    content: "";
    position: relative;
    top: 0;
    left: 227px;
    height: 1px;
    width: 120px;
    background: #fff;
    display: block;
    transform-origin: 0;
    transform: rotate(58deg);
  }
  &::before {
    content: "";
    position: relative;
    top: 98px;
    left: -5px;
    border-radius: 50%;
    height: 10px;
    width: 10px;
    background: #fff;
    display: block;
  }
}

@keyframes jump {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0px);
  }
}
@keyframes light {
  0% {
    transform: scale(0.7);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(0.7);
    opacity: 0.6;
  }
}
</style>
