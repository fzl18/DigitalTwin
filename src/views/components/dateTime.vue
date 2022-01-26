<template>
  <div v-if="showTime.hour" class="data">
    <div class="left">
      <div class="year">
        <img
          src="@/assets/img/skin/blackgold/time_icon.png"
          width="110"
          alt=""
        />
        <span>{{ showTime.year }} 年</span>
      </div>
      <div class="time">
        <span> {{ showTime.hour.split("")[0] }}</span>
        <span> {{ showTime.hour.split("")[1] }}</span>
        <i class="dot">:</i>
        <span> {{ showTime.min.split("")[0] }}</span>
        <span> {{ showTime.min.split("")[1] }}</span>
        <i class="sec">:</i>
        <span> {{ showTime.sec.split("")[0] }} </span>
        <span> {{ showTime.sec.split("")[1] }} </span>
      </div>
    </div>
    <div class="right">
      <div class="day">
        <span>{{ showTime.mouth }}</span> <i class="split"></i>
        <span style="margin-left:20px">{{ showTime.day }}</span>
      </div>
      <div class="temperature">
        <span :title="weatherTxt.type">{{ weatherTxt.type }}</span>
        <span style="margin-left:5px;"
          >{{ weatherTxt.ltemp }} ~ {{ weatherTxt.htemp }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { weather } from "../api/charts.js";
export default {
  name: "DateTime",
  data() {
    return {
      showTime: {
        hour: "",
        year: "",
        min: "",
        halfDay: "",
        day: "",
        sec: "",
        week: "",
        mouth: "",
      },
      weatherTxt: {
        type: "多云",
        htemp: 0,
        ltemp: 0,
      },
      timer: null,
    };
  },
  created() {
    weather().then((res) => {
      if (res.success) {
        let { data } = res;
        this.weatherTxt.type = data.type;
        this.weatherTxt.htemp = data.high.split(" ")[1];
        this.weatherTxt.ltemp = data.low.split(" ")[1];
      }
    });
  },
  mounted() {
    this.timer = setInterval(() => {
      this.showTime.hour = dayjs().format("HH");
      this.showTime.year = dayjs().format("YYYY");
      this.showTime.min = dayjs().format("mm");
      this.showTime.sec = dayjs().format("ss");
      this.showTime.day = dayjs().format("DD");
      this.showTime.mouth = dayjs().format("MM");
      this.showTime.week = dayjs().day();
      this.showTime.halfDay = dayjs().format("HH") > 12 ? "PM" : "AM";
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.data {
  width: 100%;
  min-width: 280px;
  height: 80px;
  display: flex;
  justify-content: space-between;
  .left {
    .year {
      display: flex;
      align-items: center;
      font-size: 15px;
      font-weight: 600;
      span {
        margin-left: 10px;
      }
    }
    .time {
      font-family: "clock";
      margin-top: 7px;
      font-size: 26px;
      i {
        font-style: normal;
        margin: 0 2px;
      }
      span {
        display: inline-block;
        padding: 0 2px;
        // border: 2px solid #ddd;
        border-radius: 4px;
        height: 32px;
        line-height: 32px;
        background: #000;
        position: relative;
        margin: 0 1px;
        &:after {
          content: "";
          position: absolute;
          top: -2px;
          bottom: -1px;
          left: -1px;
          right: -1px;
          background: linear-gradient(to top, #eec65b, #5e4414);
          border-radius: 4px;
          content: "";
          z-index: -1;
        }
      }
    }
  }
  .right {
    padding: 10px 0;
    width: 95px;
    .day {
      font-weight: 600;
      font-size: 28px;
      position: relative;
      .split {
        border-bottom: 2px solid #ccc;
        width: 30px;
        display: inline-block;
        position: absolute;
        left: 30px;
        top: 6px;
        transform: rotate(-45deg);
      }
    }
    .temperature {
      border-top: 1px solid #ccc;
      margin-top: 13px;
      padding-top: 13px;
      width: 130%;
      transform: scale(0.85);
      margin-left: -10px;
      // text-align: center;
      span {
        &:first-child {
          width: 28px;
          display: inline-block;
          text-align: center;
          overflow: hidden;
          white-space: nowrap;
          position: relative;
          top: 2px;
        }
      }
    }
  }
}
@keyframes clock {
  0% {
    opacity: 0;
  }
  5% {
    opacity: 1;
  }

  40% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
</style>
