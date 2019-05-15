# 创造一个库  library，并进行响应的配置

## 这一章代码没有参考价值，这个章节需要重新新建。。。。。只需要看README.md就行

>如何打包一个库文件(Library)
在上面所有的 Webpack 配置中，几乎都是针对业务代码的，如果我们要打包发布一个库，让别人使用的话，该怎么配置？在下面的几小结中，我们将来讲一讲该怎么样打包一个库文件，并让这个库文件在多种场景能够使用。

# 创建一个全新的项目

步骤

创建library项目
使用npm init -y进行配置package.json
新建src目录，创建math.js文件、string.js文件、index.js文件
根目录下创建webpack.config.js文件
安装webpack、webpack-cli

# 初始化package.json
// 初始化后，改写package.json
{
  "name": "library",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "MIT"
}

# 创建src目录，并添加文件

math.js文件代码： 添加四个四则混合运算的方法

```
export function add(a, b) {
  return a + b;
}
export function minus(a, b) {
  return a - b;
}
export function multiply(a, b) {
  return a * b;
}
export function division(a, b) {
  return a / b;
}
string.js文件代码： 添加一个join方法

export function join(a, b) {
  return a + '' + b;
}
index.js文件代码： 引用math.js、string.js并导出

import * as math from './math';
import * as string from './string';

export default { math, string };
```

# 添加webpack.config.js

TIP

因为我们是要打包一个库文件，所以mode只配置为生产环境即可。

```
const path = require('path');
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'library.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

# 安装webpack

```
$ npm install webpack webpack-cli -D
```

# 项目整体目录结构

```
|-- src
|   |-- index.js
|   |-- math.js
|   |-- string.js
|-- webpack.config.js
|-- package-lock.json
|-- package.json
```

# 进行第一次打包

TIP

使用npm run build进行第一次打包，在dist目录下生成了library.js，在dist目录下新建index.html

```
$ npm run build
$ cd dist
$ touch index.html
```

在index.html中引入library.js文件：

<script src="./library.js"></script>

至此，我们已经基本把项目目录搭建完毕，现在我们来考虑一下，可以在哪些情况下使用我们打包的文件：

- 使用ES Module语法引入，例如import library from 'library'
- 使用CommonJS语法引入，例如const library = require('library')
- 使用AMD、CMD语法引入，例如require(['library'], function() {// todo})
- 使用script标签引入，例如<script src="library.js"></script>

打包方案

针对以上几种使用场景，我们可以在output中配置library和libraryTarget属性(注意：这里的library和libraryTarget和我们的库名字library.js没有任何关系，前者是webpack固有的配置项，后者只是我们随意取的一个名字)

```
const path = require('path');
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: 'library',
    libraryTarget: 'umd'
  }
}
```

配置属性说明： 

**library**: 这个属性指，我们库的全局变量是什么，类似于jquery中的$符号
**libraryTarget**: 这个属性指，我们库应该支持的模块引入方案，umd代表支持ES Module、CommomJS、AMD以及CMD
打包结果： 在配置完毕后，我们再使用npm run build进行打包，并在浏览器中运行index.html，在console控制台输出library这个全局变量，结果如下图所示: 打包结果

以上我们所写的库非常简单，在实际的库开发过程中，往往需要使用到一些第三方库，如果我们不做其他配置的话，第三方库会直接打包进我们的库文件中。如果用户在使用我们的库文件时，也引入了这个第三方库，就造成了重复引用的问题，那么如何解决这个问题呢？

解决办法

可以在webpack.config.js文件中配置externals属性

修改string.js的代码： 在join方法中，我们使用第三方库lodash中的_join()方法来进行字符串的拼接。

```
import _ from 'lodash';
export function join(a, b) {
  return _.join([a, b], ' ');
}
```

不做配置时的打包结果： 在修改完毕string.js文件后，使用npm run build进行打包，发现lodash直接打包进了我们的库文件，造成库文件积极臃肿，有70.8kb。

```
$ npm run build
Built at: 2019-04-05 00:47:25
     Asset      Size  Chunks             Chunk Names
library.js  70.8 KiB       0  [emitted]  main
```

配置externals：

```
const path = require('path');
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  externals: ['lodash'],
  output: {
    filename: 'library.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'library',
    libraryTarget: 'umd'
  }
}
```
配置externals后的打包结果： 可以看到，我们的库文件又变回原来的大小了，证明我们的配置起作用了。

```
$ npm run build
Built at: 2019-04-05 00:51:22
     Asset      Size  Chunks             Chunk Names
library.js  1.63 KiB       0  [emitted]  main
```

# 如何发布并使用我们的库文件

步骤

要想发布我们的库到npm上，步骤如下：

注册npm账号
修改package.json文件的入口，修改为："main": "./dist/library.js"
运行npm adduser添加账户名称
运行npm publish命令进行发布
运行npm install xxx来进行安装
警告

为了维护npm仓库的干净，我们并未实际运行npm publish命令，因为我们的库是无意义的，发布上去属于垃圾代码，所以为了维护npm仓库的干净性，请自行尝试发布。
自己包的名字不能和npm仓库中已有的包名字重复，所以需要在package.json中给name属性起一个特殊一点的名字才行，例如"name": "why-library-2019"