<template>
  <div class="nav">
    <template>
      <div
        v-for="(item, index) in nav"
        :class="[
          'btn',
          { active: isActive == item.level },
          { disable: isActive < item.level },
        ]"
        :key="index"
        @click="isActive >= item.level && item.enable ? navTo(item.level) : ''"
      >
        <i class="icon"></i>
        <i class="name"
          >{{ item.tit }} <span>{{ item.en }}</span></i
        >
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
      nav: this.$store.state.index.nav,
    };
  },
  mounted() {
    this.navTo(this.$store.state.index.defaultObjLevel);
  },
  computed: {
    isActive() {
      return this.$store.state.index.curObjLevel;
    },
  },
  methods: {
    navTo(index) {
      this.$store.state.index.curObjLevel = index;
      this.$store.state.index.zoomlevel = this.$store.state.defaultZoomLevel;
    },
  },
};
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  color: #7c7c7c;
  background: url("../../assets/img/skin/blackgold/nav_bg.png") no-repeat;
  background-size: 100% 100%;
  height: 60px;
  align-items: center;
  justify-content: space-around;
  width: 1100px;
  margin: 15px auto;
  div {
    margin: 0 0.1rem;
    cursor: pointer;
    font-size: 12px;
    font-weight: bold;
    transition: all 500ms;
    color: #a79468;
    &.disable {
      color: #7c7c7c;
      .icon {
        filter: grayscale(1) brightness(0.7);
      }
      &:hover {
        color: #7c7c7c;
      }
      cursor: not-allowed;
    }
    &.btn {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;

      i {
        display: inline-block;
        font-style: normal;

        &.name {
          display: flex;
          flex-direction: column;
          opacity: 0.8;
          span {
            font-weight: normal;
            margin-top: 10px;
            font-size: 13px;
          }
        }
      }
      .icon {
        width: 70px;
        height: 90px;
        background: url("../../assets/img/skin/blackgold/nav_btn.png") no-repeat;
        background-position-y: 35px;
        display: inline-block;
        position: relative;
        top: -20px;
      }
      &.active,
      &:hover {
        i.name {
          opacity: 1;
          color: #eec066;
        }
        i.icon {
          background-position-y: -100px;
        }
      }
      &.disable:hover {
        i.icon {
          background-position-y: 35px;
        }
        i.name {
          opacity: 0.8;
          color: #7c7c7c;
        }
      }
    }
    &:nth-child(2) {
      .icon {
        background-position-x: -200px /* 88/80 */;
      }
    }
    &:nth-child(3) {
      .icon {
        background-position-x: -400px /* 268/80 */;
      }
    }
    &:nth-child(4) {
      .icon {
        background-position-x: -600px /* 179/80 */;
      }
    }
    &:nth-child(5) {
      .icon {
        background-position-x: -800px /* 179/80 */;
      }
    }
  }
}
</style>
