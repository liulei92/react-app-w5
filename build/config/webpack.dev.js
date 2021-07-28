const common = require("./webpack.common");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const { PROJECT_PATH } = require("../constant");
const path = require("path");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  devtool: "cheap-module-source-map",
  devServer: {
    stats: "errors-only",
    clientLogLevel: "silent",
    overlay: true, //编译错误直接显示在页面上
    contentBase: path.resolve(PROJECT_PATH, "./dist"),
    // port: "3000", // 指定端口，默认是8080
    noInfo: true,
    // stats: "errors-only", // 终端仅打印 error
    clientLogLevel: "silent", // 日志等级
    compress: true, // 是否启用 gzip 压缩
    open: true, // 打开默认浏览器
    hot: true // 热更新
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ErrorOverlayPlugin()
    // new FriendlyErrorsWebpackPlugin({
    //   compilationSuccessInfo: {
    //     messages: [`Your application is running here:http://localhost:3000`]
    //   }
    // })
  ]
});
