const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "production",
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm-browser.prod.js",
    },
  },
  plugins: [new CleanWebpackPlugin()],
});
