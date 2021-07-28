# 手写 react typescript 脚手架

## 安装

```
yarn install
```

## 构建

```
yarn build
```

## 疑问

### 1.关于图片以及其他静态资源引用

```
使用 webpack5 asset/module
https://webpack.docschina.org/guides/asset-modules/
```

### 2.关于持久化缓存

```
https://www.jianshu.com/p/4e810ca6c132
cache: {
  type: "filesystem", // 使用文件缓存
  // cacheDirectory 默认路径是 node_modules/.cache/webpack
  // cacheDirectory: path.resolve(__dirname, "./temp_cache") //本地目录
  // 缓存依赖，当缓存依赖修改时，缓存失效
  buildDependencies: {
    // 将你的配置添加依赖，更改配置时，使得缓存失效
    config: [__filename]
  }
}
```

### 3.关于状态管理

```
mobx + mobx-react
https://zh.mobx.js.org/react-integration.html
```

### 4.关于 tsx

```
既可以使用 babel-loader
也可以使用 ts-loader
```
