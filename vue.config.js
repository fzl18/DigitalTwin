const path = require("path");
const resolve = (dir) => {
  return path.join(__dirname, dir);
};
let proxyURL = process.env.VUE_APP_URL || `https://home.bit-plat.com/`;
let proxy = {
  "/frame": {
    target: proxyURL,
    changeOrigin: true,
    // pathRewrite: {
    //   '/login': '',
    // },
  },

  "/base": {
    target: proxyURL,
    changeOrigin: true,
    // pathRewrite: {
    //   ['^' + baseURL]: '',
    // },
  },
  "/framework": {
    target: proxyURL,
    // target: 'http://192.168.131.61:10081',
    // pathRewrite: {
    //   '/api/admin': '',
    // },
    // cookiePathRewrite: {
    //   '/framework/': '/api',
    // },
  },
  "/api/admin": {
    target: proxyURL + "/framework/system",
    pathRewrite: {
      "/api/admin": "/",
    },
    cookiePathRewrite: {
      "/framework/": "/api",
    },
  },
  "/project": {
    target: proxyURL,
    changeOrigin: true,
  },
  "/cockpit-api/chart": {
    target: proxyURL, //proxyURL,
    pathRewrite: {
      "/cockpit-api/chart": "/cockpit-api/chart",
    },
    changeOrigin: true,
  },
  "/cockpit-api/config": {
    target: proxyURL, //proxyURL,
    pathRewrite: {
      "/cockpit-api/config": "/cockpit-api/config",
    },
    changeOrigin: true,
  },
  "/cockpit-api/monitor": {
    target: proxyURL, //proxyURL,
    pathRewrite: {
      "/cockpit-api/monitor": "/cockpit-api/monitor",
    },
    changeOrigin: true,
  },
  "/staticfiles": {
    target: proxyURL,
    pathRewrite: {
      "/staticfiles": "/staticfiles",
    },
    changeOrigin: true,
  },
};
module.exports = {
  publicPath: "./",
  devServer: {
    hot: true,
    port: "8080",
    open: false,
    noInfo: false,
    overlay: {
      warnings: true,
      errors: true,
    },
    proxy,
  },
  chainWebpack: (config) => {
    config.resolve.alias.set("_c", resolve("src/components")); // key,value自行定义，比如.set('@@', resolve('src/components'))
  },
};
