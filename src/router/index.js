import Vue from "vue";
import VueRouter from "vue-router";
import Api from "@/views/api/login";
import $api from "@/views/api/common";
import store from "../store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: () => import("../views/Home.vue"),
  },
];
const router = new VueRouter({
  mode: "hash",
  routes,
});

router.beforeEach((to, from, next) => {
  // next();
  let href = window.location.href;
  let query = href.substring(href.indexOf("?") + 1);
  let vars = query.split("&");
  let pair = [];
  let xtoken = "";
  let flag = false;
  for (var i = 0; i < vars.length; i++) {
    pair = vars[i].split("=");
    if (pair[0] == "xtoken") {
      xtoken = pair[1];
      flag = true;
    }
  }
  if (flag) {
    document.cookie = "SESSION=" + xtoken.replace("#/", "") + ";path=/";
    window.location.href = href.replace(
      vars.length == 1 ? "?xtoken=" + xtoken : "xtoken=" + xtoken,
      ""
    );
    next();
  }
  Api.getLogin().then((res) => {
    if (res.code == 302) {
      window.location.href = `${$api.login}?redirectUrl=${href}`;
    } else {
      new Promise((resolve, reject) => {
        $api
          .getUnitUsers({
            params: {
              topUnit: res.data.userInfo.topUnit,
              unitCode: res.data.userInfo.topUnit,
            },
          })
          .then((res) => {
            store.state.allUser = res.data;
          });
        store.state.userinfo = res.data.userInfo;
        store.state.userPowers = res.data.userOptList;
        resolve("成功");
      })
        .then((res) => {
          next();
        })
        .catch((error) => {
          alert("请求出错");
        });
    }
  });
});

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};

export function resetRouter() {
  router.matcher = new VueRouter({
    base: publicPath,
    mode: routerMode,
    scrollBehavior: () => ({
      y: 0,
    }),
    routes,
  }).matcher;
}

export default router;
