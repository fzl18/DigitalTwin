import Vue from "vue";
import axios from "axios";
import store from "@/store";
import qs from "qs";
import router from "@/router";

let loadingInstance;
const handleData = ({ config, data }) => {
  if (loadingInstance) loadingInstance.close();

  // return data;
  let { success, errorCode, errorMsg } = data;
  let res = data.data;
  return data;
  if (success) {
    return res;
  } else {
    window.alert("error");
  }
  return;
  // 提醒接口报错消息
  if (!success) {
    const msg = !success
      ? `后端接口 ${config.url} 异常 ${errorCode}：${errorMsg}`
      : ``;

    switch (errorCode) {
      case `401`:
        store.dispatch("coreUser/resetAll").catch(() => {});
        window.location.href = `${
          res.redirectUrl
        }${router.history.pending.path.substr(1)}`;
        break;
      // case `403`:
      //   router.push({ path: '/403' }).catch(() => {})
      //   break
      default:
        Vue.prototype.$baseMessage(msg, "error");
        throw new Error(errorMsg);
        break;
    }
  }
  return data;
};

export default (url) => {
  /**
   * @description axios初始化
   */

  //  requestTimeout
  const instance = axios.create({
    baseURL: url || process.env.VUE_APP_URL,
    timeout: 20000,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
  /**
   * @description axios请求拦截器
   */
  instance.interceptors.request.use(
    (config) => {
      let i18n = store.state["language"] || "zh";
      config.headers["Accept-Language"] = i18n;
      if (store.state["accessToken"])
        config.headers["Authorization"] = store.state["accessToken"];

      if (store.state["userinfo"]) {
        config.headers["cnt-current-user-code"] =
          store.state["userinfo"].userCode;
        config.headers["cnt-current-top-unit"] =
          store.state["userinfo"].topUnit;
      }
      // config.headers['cnt-current-user-code'] = 'u0000000'
      // config.headers['cnt-current-top-unit'] = '1'
      if (
        config.data &&
        config.headers["Content-Type"] ===
          "application/x-www-form-urlencoded;charset=UTF-8"
      )
        config.data = qs.stringify(config.data);
      // if ([''].some((item) => config.url.includes(item)))
      //   loadingInstance = Vue.prototype.$baseLoading()
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  /**
   * @description axios响应拦截器
   */
  instance.interceptors.response.use(
    (response) => handleData(response),
    (error) => {
      if (loadingInstance) loadingInstance.close();
      const { response } = error;
      if (response === undefined) {
        // Vue.prototype.$Message(
        //   '未可知错误，可能是由于后端不支持跨域CORS或代理配置无效引起',
        //   'error'
        // )
        window.alert(
          "未可知错误，可能是由于后端不支持跨域CORS或代理配置无效引起"
        );
        return {};
      } else return handleData(response);
    }
  );

  return instance;
};
