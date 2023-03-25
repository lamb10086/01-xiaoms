const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "/",
  devServer: {
    proxy: {
      "/xiaoms": {
        target: "https://mall.api.epet.com",
        ws: true,
        ChangeOrigin: true,
        pathRewrite: {
          "^/xiaoms": "",
        },
      },
      "/local": {
        target: "http://localhost:8081",
        ws: true,
        ChangeOrigin: true,
        pathRewrite: {
          "^/local": "",
        },
      },
    },
  },
});
