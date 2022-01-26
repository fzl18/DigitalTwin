<template>
  <!-- <div class="lists" v-if="config.data.length > 0">
    <ScrollBoard :config="config" style="width:5rem;height:1.5rem" />
  </div> -->
  <div class="newbar">
    <div class="news">
      <div class="icon"></div>
      <MarqueeLeft :send-val="config.data" v-if="config.data.length" />
    </div>
    <div class="arrow">
      <img
        src="@/assets/img/skin/blackgold/arrow_btn.png"
        alt=""
        @click="open"
      />
    </div>
  </div>
</template>

<script>
// import ScrollBoard from "./scrollBoard.vue";
import MarqueeLeft from "./marqueeLeft.vue";
export default {
  components: { MarqueeLeft },
  data() {
    return {
      config: {
        data: [],
        rowNum: 3,
        waitTime: 3000,
        oddRowBGC: "none",
        evenRowBGC: "none",
        hoverPause: true,
      },
    };
  },
  mounted() {
    this.init();
  },
  props: {
    data: [],
  },
  watch: {
    data: {
      handler(newData) {
        const list = [];
        newData.map((val) => {
          // list.push([val]);
          list.push(val);
        });
        this.config.data = list;
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    init() {},
    open() {
      this.$root.$children[0].$children[0].$refs.head.handleOpen("messages");
    },
  },
};
</script>

<style lang="scss" scoped>
.newbar {
  display: flex;
  align-items: center;
  .news {
    display: flex;
    overflow: hidden;
    align-items: center;
    background: #1d1910;
    border: 1px solid #5a3c0d;
    // border-right-width: 2px;
    width: calc(100% - 85px);
    .icon {
      border-right: 1px solid #5a3c0d;
      padding: 10px 70px;
      height: 35px;
      background: #2c2211 url("../../assets/img/skin/blackgold/news_icon.png")
        center center no-repeat;
      background-size: 75% 70%;
    }
  }
  .arrow {
    margin-left: 20px;
    img {
      cursor: pointer;
      height: 28px;
    }
  }
}

.lists {
  font-size: 12px /* 16/80 */;
  // font-weight: bold;
  padding: 0 1rem;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(255, 239, 169, 0.3),
    rgba(255, 239, 169, 0.4),
    rgba(255, 239, 169, 0.3),
    rgba(0, 0, 0, 0)
  );
  opacity: 0.6;
  &:hover {
    opacity: 0.9;
  }
  .item {
    margin: 0.125rem; /* 10/80 */
    margin-left: 0.5rem;
    display: flex;
    span {
      margin-right: 0.2rem;
    }
  }
}
</style>
