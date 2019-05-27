# 编写一个plugin

- 与loader一样，我们在使用 Webpack 的过程中，也经常使用plugin，那么我们学习如何编写自己的plugin是十分有必要的。

### plugin基础

plugin基础讲述了怎么编写自己的plugin以及如何使用，与创建自己的loader相似，我们需要创建如下的项目目录结构：

```
|-- webpack-plugin
    |-- plugins
    |   |-- copyWebpackPlugin.js
    |-- src
    |   |-- index.js
    |-- webpack.config.js
    |-- package-lock.json
    |-- package.json
```

copyWebpackPlugins.js中的代码：使用npm run build进行打包时，我们会看到控制台会输出hello, my plugin这段话。

TIP

plugin与loader不同，plugin需要我们提供的是一个类，这也就解释了我们必须在使用插件时，为什么要进行new操作了。 新建一个文件夹

```
class copyWebpackPlugin {
  constructor() {
    console.log('hello, my plugin');
  }
  apply(compiler) {

  }
}
module.exports = copyWebpackPlugin;
```

webpack.config.js中的代码：

```
const path = require('path');
// 引用自己的插件
const copyWebpackPlugin = require('./plugins/copyWebpackPlugin.js');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    // new自己的插件
    new copyWebpackPlugin()
  ]
}
```

### 如何传递参数

在使用其他plugin插件时，我们经常需要传递一些参数进去，那么我们如何在自己的插件中传递参数呢？在哪里接受呢？
其实，插件传参跟其他插件传参是一样的，都是在构造函数中传递一个对象，插件传参如下所示：

```
const path = require('path');
const copyWebpackPlugin = require('./plugins/copyWebpackPlugin.js');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    // 向我们的插件传递参数
    new copyWebpackPlugin({
      name: 'why'
    })
  ]
}
```
在plugin的构造函数中调用：使用npm run build进行打包，在控制台可以打印出我们传递的参数why

```
class copyWebpackPlugin {
  constructor(options) {
    console.log(options.name);
  }
  apply(compiler) {

  }
}
module.exports = copyWebpackPlugin;
```

### 如何编写及使用自己的Plugin

TIP

apply函数是我们插件在调用时，需要执行的函数
apply的参数，指的是 Webpack 的实例
compilation.assets打包的文件信息
我们现在有这样一个需求：使用自己的插件，在打包目录下生成一个copyright.txt版权文件，那么该如何编写这样的插件呢？ 首先我们需要知道plugin的钩子函数，符合我们规则钩子函数叫：emit，它的用法如下：

```
class CopyWebpackPlugin {
  constructor() {
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync('CopyWebpackPlugin', (compilation, cb) => {
      var copyrightText = 'copyright by why';
      compilation.assets['copyright.txt'] = {
        source: function() {
          return copyrightText
        },
        size: function() {
          return copyrightText.length;
        }
      }
      cb();
    })
  }
}
module.exports = CopyWebpackPlugin;
```

使用npm run build命名打包后，我们可以看到dist目录下，确实生成了我们的copyright.txt文件：

```
|-- dist
|   |-- copyright.txt
|   |-- main.js
|-- plugins
|   |-- copyWebpackPlugin.js
|-- src
|   |-- index.js
|-- webpack.config.js
|-- package-lock.json
|-- package.json
```
官网：https://webpack.js.org/api/compiler-hooks#emit