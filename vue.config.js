const { defineConfig } = require("@vue/cli-service");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack(config) {
    config.plugin("monaco").use(new MonacoWebpackPlugin());
  },
});

// 生产环境配置
// module.exports = {
//   publicPath:
//     process.env.NODE_ENV === "production" ? "http://47.94.37.63" : "/",
// };
