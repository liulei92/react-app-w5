const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const tsImportPluginFactory = require("ts-import-plugin");
const WebpackBar = require("webpackbar");
const { ProgressPlugin } = require("webpack");
const { PROJECT_PATH, isDEV } = require("../constant");

const getCssLoaders = () => [
  { loader: isDEV ? "style-loader" : MiniCssExtractPlugin.loader },
  {
    loader: "css-loader",
    options: {
      modules: false,
      sourceMap: false
    }
  },
  {
    loader: "postcss-loader",
    options: {
      // ident: "postcss",
      postcssOptions: {
        plugins: [["postcss-preset-env"]]
      }
    }
  }
];
module.exports = {
  target: "web",
  entry: {
    app: path.resolve(PROJECT_PATH, "./src/index.tsx")
  },
  output: {
    filename: "static/js/[name].js",
    chunkFilename: "static/js/[name].[contenthash:8].js",
    path: path.resolve(PROJECT_PATH, "./dist"),
    clean: true
  },
  cache: {
    type: "filesystem", // 使用文件缓存
    // cacheDirectory 默认路径是 node_modules/.cache/webpack
    // cacheDirectory: path.resolve(__dirname, "./temp_cache") //本地目录
    // 缓存依赖，当缓存依赖修改时，缓存失效
    buildDependencies: {
      // 将你的配置添加依赖，更改配置时，使得缓存失效
      config: [__filename]
    }
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    alias: {
      "@": path.resolve(PROJECT_PATH, "./src")
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: path.resolve(__dirname, "node_modules"),
        use: getCssLoaders()
      },
      {
        test: /\.less$/i,
        exclude: path.resolve(__dirname, "node_modules"),
        use: [
          ...getCssLoaders(),
          {
            loader: "less-loader",
            options: {
              sourceMap: false,
              lessOptions: {
                // modifyVars
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      {
        test: /\.(webp|png|svg|jpe?g|gif|avif)$/i,
        // 方案1
        // use: [
        //   {
        //     loader: "url-loader",
        //     options: {
        //       limit: 8 * 1024,
        //       name: "[name].[contenthash:8].[ext]",
        //       outputPath: "static/media",
        //       esModule: false
        //     }
        //   }
        // ],
        // type: "javascript/auto"
        // 方案2
        // type: "asset/resource",
        type: "asset", // https://webpack.docschina.org/guides/asset-modules/
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024 // 4kb
          }
        },
        generator: {
          filename: "static/media/[name].[hash:8][ext]"
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource", // 利用asset/module代替传统file-loader
        generator: {
          filename: "static/fonts/[name][ext]"
        }
      },
      {
        test: /\.svg$/i,
        type: "asset/inline"
      },
      {
        test: /\.(jsx?|tsx?)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.tsx?$/i,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
            getCustomTransformers: () => ({
              before: [
                tsImportPluginFactory({
                  libraryName: "antd",
                  libraryDirectory: "es",
                  style: true
                })
              ]
            }),
            compilerOptions: {
              module: "es2015"
            }
          }
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          context: path.resolve(PROJECT_PATH, "./public"),
          from: "*",
          to: path.resolve(PROJECT_PATH, "./dist"),
          toType: "dir",
          globOptions: {
            ignore: [
              // Ignore all `txt` files
              "**/*index.html"
            ]
          }
        }
      ]
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(PROJECT_PATH, "./public/index.html"),
      filename: "index.html",
      cache: false
      // favicon: path.resolve(PROJECT_PATH, "./public/favicon.ico")
      //   minify: isDEV
      //     ? false
      //     : {
      //         removeAttributeQuotes: true,
      //         collapseWhitespace: true,
      //         removeComments: true,
      //         collapseBooleanAttributes: true,
      //         collapseInlineTagWhitespace: true,
      //         removeRedundantAttributes: true,
      //         removeScriptTypeAttributes: true,
      //         removeStyleLinkTypeAttributes: true,
      //         minifyCSS: true,
      //         minifyJS: true,
      //         minifyURLs: true,
      //         useShortDoctype: true
      //       }
    }),
    new WebpackBar({
      name: isDEV ? "RUNNING" : "BUILDING",
      color: "#52c41a"
    }),
    !isDEV &&
      new MiniCssExtractPlugin({
        filename: "static/css/[name].css",
        chunkFilename: "static/css/[name].[hash:8].css"
        // ignoreOrder: true
      }),
    new ForkTsCheckerWebpackPlugin({}),
    new ProgressPlugin() // ProgressPlugin 可以监控各个 hook 执行的进度 percentage，输出各个 hook 的名称和描述
  ].filter(Boolean)
};
