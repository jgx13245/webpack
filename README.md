### decelopmet 和 production打包的区别

#### 像上一节所提到的那样，如果我们要区分 Tree Shaking的开发环境和生产环境，那么我们每次打包的都要去更改相应的 Webpack配置文件 有没有什么办法能让我们少改一点代码呢？

1.TIP

> 区分开发环境和生产环境，最好的办法是把公用配置提取到一个配置文件，生产环境和开发环境只写自己需要的配置，在打包的时候再进行合并即可
webpack-merge 可以帮我们做到这个事情。

(1)新建build/webpack.common.js： 新建build文件夹，在此文件夹下新建webpack.common.js，提起公共配置到此文件

```
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
  entry: {
    main: './src/index.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      },
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel-loader" 
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new cleanWebpackPlugin()
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname,'dist')
  }
}
````

(2) 新建build/webpack.dev.js： 保留开发环境独有的配置

```
const webpack = require('webpack');
module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    // 启动bundle文件夹
    contentBase: './dist',
    // 自动打开浏览器
    open: true,
    // 端口3000
    port: 3000,
    // 模块热更新
    hot: true,
    hotOnly: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    usedExports: true
  }
}
```

(3)新建build/webpack.prod.js： 保留生产环境独有的配置

```
module.exports = {
  mode: 'production',
  devtool: 'cheap-module-source-map'
}
```
webpack-merge

利用webpack-merge进行文件合并，它需要用 npm 进行安装

$ npm install webpack-merge -D
(4)再次改造build/webpack.dev.js： 通过webpack-merge进行文件合并

```
const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    // 启动bundle文件夹
    contentBase: './bundle',
    // 自动打开浏览器
    open: true,
    // 端口3000
    port: 3000,
    // 模块热更新
    hot: true,
    hotOnly: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    usedExports: true
  }
}
module.exports = merge(commonConfig, devConfig);
```

(5)再次改造build/webpack.prod.js： 通过webpack-merge进行文件合并

```
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const prodConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map'
}
module.exports = merge(commonConfig, prodConfig);
```
(6)# 添加脚本命令

2.TIP

> 通过更改package.json文件，添加dev和build 两个Script脚本命令

"scripts": {
  "dev": "webpack-dev-server --config ./build/webpack.dev.js",
  "build": "webpack --config ./build/webpack.prod.js"
},
注意

当我们运行npm run build时，dist目录打包到了build文件夹下了，这是因为我们把webpack相关的配置放到了build文件夹下后，并没有做其他配置，webpack会认为build文件夹会是根目录

|-- build
|   |-- dist
|   |   |-- index.html
|   |   |-- main.js
|   |   |-- main.js.map
|   |-- webpack.common.js
|   |-- webpack.dev.js
|   |-- webpack.prod.js
|-- package-lock.json
|-- package.json
|-- postcss.config.js
-- src
    |-- index.html
    |-- index.js
    |-- math.js
再次修改build/webpack.common.js： 修改output属性即可

output: {
  filename: '[name].js',
  path: path.resolve(__dirname,'../dist')
}
打包结果：

|-- build
|   |-- webpack.common.js
|   |-- webpack.dev.js
|   |-- webpack.prod.js
|-- dist
|   |-- index.html
|   |-- main.js
|   |-- main.js.map
|-- package-lock.json
|-- package.json
|-- postcss.config.js
|-- src
    |-- index.html
    |-- index.js
    |-- math.js
