### webpack 和coding splitting代码分割

#### 代码分割和webpack没有啥关系

**webpack实现代码分割有两种方式**

1.同步的代码。只要在webpack中配置optimization:{splitChunks:'all'}

2.不需要什么配置，会自动进行代码分割


> 分割线-------------------------------------

Code Splitting 的核心是把很大的文件，分离成更小的块，让浏览器进行并行加载。常见的代码分割有三种形式：

收到进行分割，例如项目如果用到lodash（一个公用库），则把lodash单独打包成一个文件。
同步导入的代码使用webpack配置进行代码分割。
异步导入的代码，通过模块中的内联函数调用来分割代码。
修改index.js代码： 在使用 npm 安装lodash后，修改index.js文件

import _ from 'lodash'
console.log(_.join(['Dell','Lee'], ' '));

# 同步导入代码分割
TIP

在webpack.common.js中配置splitChunks属性即可

optimization: {
  splitChunks: {
    chunks: 'all'
  }
}
打包结果： main.js中是我们的业务代码，vendors~main.js是我们的公用库代码

|-- build
|   |-- webpack.common.js
|   |-- webpack.dev.js
|   |-- webpack.prod.js
|-- dist
|   |-- index.html
|   |-- main.js
|   |-- vendors~main.js
|-- package-lock.json
|-- package.json
|-- postcss.config.js
|-- src
    |-- index.html
    |-- index.js
    |-- math.js
# 异步导入代码分割
TIP

异步带入的代码，不需要我们进行代码分割，webpack会自动帮我们把第三方库单独打包成一个文件

WARNING

由于异步带入语法目前并没有得到全面支持，需要通过 npm 安装 @babel/plugin-syntax-dynamic-import 插件来进行转译

$ npm install @babel/plugin-syntax-dynamic-import -D
打包结果： 使用npm run build进行打包，0.js为第三方库打包的代码，main.js为我们的业务代码

|-- build
|   |-- webpack.common.js
|   |-- webpack.dev.js
|   |-- webpack.prod.js
|-- dist
|   |-- 0.js
|   |-- index.html
|   |-- main.js
|-- package-lock.json
|-- package.json
|-- postcss.config.js
|-- src
    |-- index.html
    |-- index.js
    |-- math.js
# SplitChunksPlugin配置参数详解
在上一节中，我们配置了splitChunk属性，它能让我们进行代码分割，其实这是因为 Webpack 底层使用了 splitChunksPlugin 插件。这个插件有很多可以配置的属性，它也有一些默认的配置参数，它的默认配置参数如下所示，我们将在下面为一些常用的配置项做一些说明。

```
module.exports = {
  //...其它配置项
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000, // 小于多少才会分割
      maxSize: 0,
      minChunks: 1,  // 一个模块用了多少次才会进行分割
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {  // 分组，如果模块满足在module包里面，就打包成vender.js形式
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10   // 值越大。越服从谁，比如一个loadsh的包，符合第一个组，也符合默认，就看priority的值，越大就听谁的
          filename:'vender.js'
        },
        default: {  // 如果模块那个分组都不满足，就默认打包成common.js形式
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true  // 如果一个模块已经被打包了，在遇到的时候，就忽略掉，直接使用以前的的打包
          filename:'common.js'
        }
      }
    }
  }
};
```

# chunks参数

TIP

chunks参数，它告诉webpack应该对哪些模式进行打包，它的参数有三种：

async，此值为默认值，只有异步导入的代码才会进行代码分割。
initial，与async相对，只有同步引入的代码才会进行代码分割。
all，此值可以看做是async和inintal的结合，表示无论是同步的代码还是异步的代码，都能进行代码分割。


# 官网 

https://www.webpackjs.com/plugins/split-chunks-plugin/