const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  devtool: false,
  plugins: [
    new CleanWebpackPlugin(), // webpack5.20以下版本清除dist文件内容一般使用插件 clean-webpack-plugin 可去除
    // 生产环境优化
    new TerserPlugin({
      parallel: true, // 多进程
      extractComments: false, // 删除注释
      terserOptions: {
        // 生产环境去除console
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    })
  ]
});
