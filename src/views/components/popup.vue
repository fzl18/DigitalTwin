<template>
  <div
    v-show="visible"
    ref="popupWarp"
    class="popup-warp"
    :class="[isAddClass ? 'bindata-popup-open' : 'bindata-popup-close']"
  >
    <div
      :style="`transform:scale(${$store.state.index.scale + 0.1})`"
      class="popup-card"
      :class="isAddClass ? 'popup-card-open' : 'popup-card-close'"
    >
      <div class="popup-head" v-if="$slots.head">
        <div class="popup-head-title">
          <slot name="head"></slot>
        </div>
        <i class="el-icon-close bindata-btn-close" @click="hide"></i>
      </div>
      <div
        :class="[
          $store.state.index.isFullscreen ? 'h110' : 'h55',
          'popup-body',
        ]"
      >
        <div class="horn tl"></div>
        <div class="horn tr"></div>
        <div class="horn bl"></div>
        <div class="horn br"></div>
        <div class="popup-body-title"></div>
        <slot />
        <i
          v-if="!$slots.head"
          class="el-icon-close bindata-btn-close"
          @click="hide"
        ></i>
      </div>

      <div v-if="$slots.footer" class="popup-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 自定义弹窗
 */
export default {
  name: "Popup",
  props: {
    title: {
      type: String,
      default: () => "提示",
    },
    visible: {
      type: Boolean,
      default: () => false,
    },
    appendToBody: {
      type: Boolean,
      default: () => true,
    },
  },
  data() {
    return {
      isAddClass: false,
    };
  },
  watch: {
    visible: {
      handler(bool) {
        if (bool) {
          this.isAddClass = true;
          if (!this.appendToBody) return false;
          document.body.appendChild(this.$refs.popupWarp);
        } else {
          this.isAddClass = false;
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    // 隐藏 `popup` 弹窗
    hide() {
      this.isAddClass = false;
      setTimeout(() => {
        this.$emit("update:visible", false);
      }, 700);
    },
  },
};
</script>

<style scoped lang="scss">
$bg: rgba(65, 58, 35, 0.9);
.popup-warp {
  width: 100%;
  height: 1080px;
  position: fixed;
  top: 7.2%;
  right: 0;
  z-index: 99999;
  color: #333333;
  display: flex;
  justify-content: center;
  align-items: center;
}
.popup-card {
  transform-origin: center top;
  color: #fff;
  height: 100%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  .popup-head {
    // width: 85%;
    width: 1200px;
    max-width: 1200px;
    // min-width: 80%;
    height: 1.4rem;
    display: flex;
    // align-items: center;
    padding: 0 15px;
    background: rgb(104, 92, 59);
    // border: 1px solid rgb(240, 225, 182);
    margin: auto;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      right: -0.5rem;
      z-index: -1;
      width: 0;
      height: 0;
      border-right: 0.5rem solid transparent;
      border-top: 1.4rem solid rgb(104, 92, 59);
    }
    .popup-head-title {
      flex: 1;
      font-weight: 500;
      font-size: 16px;
    }
    .bindata-btn-close {
      font-size: 16px;
      cursor: pointer;
      color: rgb(243, 201, 124);
      background: rgb(128, 109, 54);
      border: 1px solid rgb(175, 148, 66);
      border-radius: 50%;
      padding: 3px;
      position: relative;
      top: -0.2rem;
      right: -1rem;
      height: 25px;
      width: 25px;
      &:hover {
        color: rgb(255, 249, 191);
      }
    }
  }
  .popup-body {
    color: #fff;
    background: $bg;
    box-shadow: 0 0 80px rgba(56, 50, 44, 0.5) inset;
    // padding: 15px;
    border: 1px solid #5f4315;
    width: 1200px;
    max-width: 1200px;
    margin: 0.2rem auto;
    position: relative;
    .horn {
      position: absolute;
      width: 20px;
      height: 20px;
      overflow: hidden;
      left: -1px;
      top: -1px;
      z-index: 999;
      &.tr {
        right: -1px;
        transform: rotate(90deg);
        left: inherit;
      }
      &.bl {
        transform: rotate(-90deg);
        top: inherit;
        bottom: -1px;
      }
      &.br {
        right: -1px;
        transform: rotate(180deg);
        left: inherit;
        top: inherit;
        bottom: -1px;
      }
      &::before {
        position: absolute;
        left: 0;
        top: 0;
        content: "";
        width: 2px;
        height: 8px;
        background: rgb(173, 118, 0);
      }
      &::after {
        position: absolute;
        left: 0;
        top: 0;
        content: "";
        width: 8px;
        height: 2px;
        background: rgb(173, 118, 0);
      }
    }
    .bindata-btn-close {
      font-size: 16px;
      cursor: pointer;
      color: rgb(243, 201, 124);
      background: rgb(128, 109, 54);
      border: 1px solid rgb(175, 148, 66);
      border-radius: 50%;
      padding: 3px;
      position: absolute;
      top: -10px;
      right: -10px;
      height: 25px;
      width: 25px;
      z-index: 999;
      &:hover {
        color: rgb(255, 249, 191);
      }
    }
  }
  .popup-footer {
    height: 55px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    background: none;
    border: 1px solid #eaeefb;
    border-top: none;
    justify-content: flex-end;
  }
  .h55 {
    height: calc(100% - 450px);
  }
  .h110 {
    height: calc(100% - 400px);
  }
}
.popup-card-open,
.popup-card-close {
  padding: 15px;
  height: 100%;
  box-sizing: border-box;
  // overflow: auto;
}
.popup-card-open {
  animation: open-fade 0.5s ease-out 0.7s both;
}
.popup-card-close {
  animation: close-fade 0.5s ease-out both;
}
.bindata-popup-open:before,
.bindata-popup-close:before {
  content: "";
  box-sizing: border-box;
  width: 100%;
  position: fixed;
  top: 50%;
  will-change: height, top;
  background: rgba(31, 28, 24, 0.8);
  // backdrop-filter: brightness(90%) saturate(200%) blur(7px);
}
.bindata-popup-open:before {
  animation: open-animation 0.5s cubic-bezier(0.83, 0.04, 0, 1.16) 0.1s both;
}
.bindata-popup-close:before {
  animation: close-animation 0.5s cubic-bezier(0.83, 0.04, 0, 1.16) 0.1s both;
}
@keyframes open-animation {
  0% {
    height: 0;
    top: 50%;
  }
  100% {
    height: 100vh;
    top: 0;
  }
}
@keyframes close-animation {
  0% {
    height: 100vh;
    top: 0;
  }
  100% {
    height: 0;
    top: 50%;
  }
}
@keyframes open-fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes close-fade {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
