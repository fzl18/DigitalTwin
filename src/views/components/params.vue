<template>
  <div class="data">
    <div class="item" v-for="(val, index) in params" :key="index">
      <div class="icon">
        <div :class="val.icon"></div>
      </div>
      <div>
        <div class="text border">{{ val.text }}</div>
      </div>
      <CountTo :endVal="val.value" class="num"></CountTo>
      <span class="text">条</span>
    </div>
  </div>
</template>

<script>
import CountTo from "vue-count-to";
export default {
  name: "Params",
  components: {
    CountTo,
  },
  data() {
    return {
      params: [
        {
          icon: "normal",
          value: 300,
          text: "正常运行",
        },
        {
          icon: "stop",
          value: 20,
          text: "停机数量",
        },
        {
          icon: "warn",
          value: 10,
          text: "异常预警",
        },
        {
          icon: "err",
          value: 8,
          text: "故障报警",
        },
      ],
    };
  },
  watch: {
    "$store.state.index.paramsData": {
      handler(newData) {
        this.params[0].value = newData.normalNums;
        this.params[1].value = newData.shutdownNums;
        this.params[2].value = newData.errorNums;
        this.params[3].value = newData.warnNums;
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.data {
  display: flex;
  transform: scale(1.15);
  .item {
    display: flex;
    align-items: center;
    margin-right: 0.5rem;
    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      div {
        width: 45px;
        height: 45px;
        &.normal,
        &.stop,
        &.err,
        &.warn {
          background: url("../../assets/img/skin/blackgold/top_icon.png")
            no-repeat;
          background-size: cover;
          position: relative;
          top: -2px;
          left: -10px;
        }
        &.normal {
          background-position: -183px 0;
        }
        &.err {
          background-position: -275px 0;
        }
        &.stop {
          background-position: -92px 0;
        }
        &.warn {
        }
      }
    }
    .num {
      font-size: 28px;
      font-weight: bold;
      margin: 0 6px;
    }
    .text {
      color: #7f5b16;
      font-size: 15px;
      padding-top: 6px;
      &.border {
        border-top: 1px dashed #4e3911;
      }
    }
  }
}
</style>
