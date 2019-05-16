# pwa（跨平台应用）的打包配置

概念以及作用

> PWA全称Progressive Web Application(渐进式应用框架)，它能让我们主动缓存文件，这样用户离线后依然能够使用我们缓存的文件打开网页，而不至于让页面挂掉，实现这种技术需要安装workbox-webpack-plugin插件

# 安装插件

$ npm install workbox-webpack-plugin -D

# webpack.config.js文件配置

// PWA只有在线上环境才有效，所以需要在webpack.prod.js文件中进行配置

```
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const prodConfig = {
  // ... 其他配置
  plugins: [
    new MiniCssExtractPlugin({}),
    new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    })
  ]
}
```
module.exports = merge(commonConfig, prodConfig);

# 改写index.js

TIP

需要判断浏览器是否支持PWA，支持的时候我们才进行注册，注册的.js文件为我们打包后的service-worker.js文件。

```
console.log('hello,world');
if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').then((register) => {
    console.log('注册成功');
  }).catch(error => {
    console.log('注册失败');
  })
}
```

# 打包生成线上文件

TIP

precache-manifest.xxxxx.js文件和service-worker.js就能让我们实现PWA

```
|-- build
|   |-- webpack.common.js
|   |-- webpack.dev.js
|   |-- webpack.prod.js
|-- dist
|   |-- index.html
|   |-- main.f28cbac9bec3756acdbe.js
|   |-- main.f28cbac9bec3756acdbe.js.map
|   |-- precache-manifest.ea54096f38009609a46058419fc7009b.js
|   |-- service-worker.js
|-- package-lock.json
|-- package.json
|-- postcss.config.js
|-- src
    |-- index.html
    |-- index.js
```

# PWA实际效果

TIP

在npm run dev后，我们利用webpack-dev-server启动了一个小型的服务器，然后我们停掉这个服务器，刷新页面，数据仍然展示