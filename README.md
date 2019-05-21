# Typescript 的打包配置

>随着TypeScript的不断发展，相信未来使用TypeScript来编写 JS 代码将变成主流形式，那么如何在 Webpack 中配置支持TypeScript呢？
解决办法

可以安装ts-loader和typescript来解决这个问题

# 新建一个项目webpack-typescript
TIP

新创建一个项目，命名为webpack-typescript，并按如下步骤处理：

使用npm init -y初始化package.json文件，并在其中添加build Webpack打包命令
新建webpack.config.js文件，并做一些简单配置，例如entry、output等
新建src目录，并在src目录下新建index.ts文件
在src目录下，新建index.ts文件
新建tsconfig.json文件，并做一些配置
安装webpack和webpack-cli
安装ts-loader和typescript
整体目录： 按以上步骤运行后，项目目录大概如下所示

```
|-- src
|   |-- index.ts
|-- tsconfig.json
|-- webpack.config.js
|-- package-lock.json
|-- package.json
package.json文件： 添加好命令和安装好依赖后，结构可能如下所示：

{
  "name": "webpack-typescript",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "ts-loader": "^5.3.3",
    "typescript": "^3.4.1",
    "webpack": "^4.29.6",
    "webpack-cli": "^3.3.0"
  }
}
```

webpack.config.js： 想要进行 Webpack的配置，需要进行如下配置：

```
const path = require('path');
module.exports = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: {
          loader: 'ts-loader'
        }
      }
    ]
  },
  entry: {
    main: './src/index.ts'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

tsconfig.json文件： 在里面进行typescript的相关配置，配置项的说明如下

>module: 表示我们使用ES6模块
target: 表示我们转换成ES5代码
allowJs: 允许我们在.ts文件中通过import语法引入其他.js文件

```
{
  "compilerOptions": {
    "module": "ES6",
    "target": "ES5",
    "allowJs": true
  }
}
```
index.ts文件代码： 在此文件中书写TypeScript代码

```
class Greeter {
  greeting: string
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return 'hello, ' + this.greeting;
  }
}

let greeter = new Greeter('why');
console.log(greeter.greet());

```

# 打包测试

运行npm run build进行打包
在生成dist目录下，新建index.html，并引入打包后的main.js文件
在浏览器中运行index.html 打包结果

# 使用其他模块的类型定义文件
TIP

如果我们要使用lodash库，必须在@types/xxx下安装其对应的类型定义文件

改写index.ts： 在安装npm install @types/lodash -D后，引入lodash，并使用里面的方法

```
import * as _ from 'lodash'

class Greeter {
  greeting: string
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return _.join(['hello', this.greeting], '**');
  }
}

let greeter = new Greeter('why');
console.log(greeter.greet());
```