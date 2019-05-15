# Shimming

>有时候我们在引入第三方库的时候，不得不处理一些全局变量的问题，例如jQuery的$，lodash的_，但由于一些老的第三方库不能直接修改它的代码，这时我们能不能定义一个全局变量，当文件中存在$或者_的时候自动的帮他们引入对应的包。

**解决办法**

1.这个问题，可以使用ProvidePlugin插件来解决，这个插件已经被Webpack内置，无需安装，直接使用即可。

添加src/jquery.ui.js文件： 在src目录下新建jquery.ui.js文件，代码如下所示，它使用了jQuery的$符号，创建这个文件，目的是为了来模仿第三方库。

```
export function UI() {
  $('body').css('background','green');
}
```

修改index.js文件： 改写index.js文件，并在其中引入我们的jquery.ui.js文件

```
import _ from 'lodash';
import $ from 'jquery';
import { UI } from './jquery.ui';

UI();

var dom = $('<div>');
dom.html(_.join(['Dell', 'Lee'], '---'));
$('body').appendChild(dom);
```

- 打包结果： 使用npm run dev进行打包，会发现，代码运行不起来，报错$ is not defined，这是因为虽然我们在index.js中引入的jQuery文件，但$符号只能在index.js才有效，在jquery.ui.js无效，报错是因为jquery.ui.js中$符号找不到引起的。因为模块化，每个模块只认识自己的变量。


2.改写webpack.common.js文件： 在webpack.common.js文件中使用ProvidePlugin插件

TIP

配置$:'jquery'，只要我们文件中使用了$符号，它就会自动帮我们引入jquery，相当于import $ from 'jquery'

```
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
module.exports = {
  entry: {
    main: './src/index.js'
  },
  plugins: [
    new htmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new cleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      _: 'lodash'
    })
  ]
}
```

打包结果： 使用npm run dev进行打包，打包结果如下，可以发现，项目已经可以正确运行了。 


# 处理全局this指向问题

我们现在来思考一个问题，一个模块中的this到底指向什么，是模块自身还是全局的window对象

// index.js代码，在浏览器中输出：false

```
console.log(this===window);
```
如上所示，如果我们使用npm run dev运行项目，运行index.html时，会在浏览器的console面板输出false，证明在模块中this指向模块自身，而不是全局的window对象，那么我们有什么办法来解决这个问题呢？

**解决办法**

安装使用imports-loader来解决这个问题

> $ npm install imports-loader -D

改写webpack.common.js文件： 在.js的loader处理中，添加imports-loader

```
module.exports = {
  // ... 其他配置
  module: {
    rules: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'imports-loader?this=>window'
          }
        ]
      }
    ]
  },
  // ... 其他配置
}
```

打包结果： 使用npm run dev来进行打包，运行index.html，查看console控制台，输出true，证明this这个时候已经指向了全局window对象，问题解决。 