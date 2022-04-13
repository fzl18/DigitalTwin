import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 适配flex
import "@/common/flexible.js";
// 引入全局css
import "./assets/scss/style.scss";
//引入echart
import * as echarts from "echarts";
import box from "./views/components/transfBox.vue";
import blockBox from "./views/components/blockBox.vue";
import loading from "./views/components/loading";
Vue.use(ElementUI);
// Vue.use(three3d);
Vue.component("Box", box);
Vue.component("Block", blockBox);
Vue.component("Loading", loading);
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

Vue.directive("drag", {
  bind: function(el) {
    el.onmousedown = (e) => {
      let disX = e.clientX - el.offsetLeft;
      let disY = e.clientY - el.offsetTop;
      document.onmousemove = (e) => {
        let left = e.clientX - disX;
        let top = e.clientY - disY;
        el.style.left = left + "px";
        el.style.top = top + "px";
      };
      document.onmouseup = (e) => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  },
});
