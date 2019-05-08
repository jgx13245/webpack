### 使用tree shaking

1.开发中有这种问题，我在一个模块里面建立了是几个方法，在其他模块里面引入了其中一个方法，打包的时候我们会发现模块1
里面的方法全部都在打包文件里面，这样没有必要，

2.tree shaking 翻译成汉语的意思是 摇树的意思，意思是把我不需要引入的模块去掉


1.TIP

> Tree Shaking是一个术语，通常用于描述移除JavaScript中未使用的代码，在开发环境中，Tree Shaking还是会起作用，但未使用的代码依然还进行打包，这是因为保存正确的source-map的缘故。

2.注意

> Tree Shaking 只适用于ES Module语法(既通过export导出，import引入)，因为它依赖于ES Module的静态结构特性。

3.步骤

添加src/math.js文件： 定义两个方法并export出去

```
export function add(a, b) {
  console.log(a + b);
}

export function minus(a, b) {
  console.log(a - b);
}
```

改写index.js：

```
import { add } from './math'

add(1, 4);
// 改写webpack.config.js： 更改 webpack 配置文件，进行 Tree Shaking配置

const path = require('path');
module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    main: './src/index.js'
  },
  optimization: {
    usedExports: true
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname,'dist')
  }
}
```
开发环境下打包结果： 使用npm run build进行打包

打包结果分析

虽然我们配置了 Tree Shaking，但在开发环境下，我们依然能够看到未使用过的minus方法，以下注释也清晰了说明了这一点，这是因为我们处于开发环境下打包。

```
"use strict";
/* harmony export (binding) */ 
__webpack_require__.d(__webpack_exports__, "a", function() { return add; });
/* unused harmony export minus */
function add(a, b) {
  console.log(a + b);
}
function minus(a, b) {
  console.log(a - b);
}
```
生产环境下打包结果： 将webpack.config.js中的Mode属性，由development改为production，再运行npm run build

4.打包代码分析

这是一段add方法压缩后的代码，我们在打包后的.js文件中，并没有找到minus方法，证明在生产环境下，Tree Shaking 真正起了作用。

```
([function(e,n,r){
  "use strict";
  var t,o;
  r.r(n),
  t=1,
  o=4,
  console.log(t+o)
}]);

5.**SideEffects**

TIP

> 由于 Tree Shaking作用于所有通过import引入的文件，如果我们引入第三方库，例如：import _ from 'lodash'或者.css文件，例如import './style.css' 时，如果我们不 做限制的话，Tree Shaking将起副作用，SideEffects属性能帮我们解决这个问题：它告诉webpack，我们可以对哪些文件不做 Tree Shaking

// 修改package.json
// 如果不希望对任何文件进行此配置，可以设置sideEffects属性值为false
// *.css 表示 对所有css文件不做 Tree Shaking
// @babael/polyfill 表示 对@babel/polyfill不做 Tree Shaking
"sideEffects": [
  "*.css",
  "@babel/polyfill"
],