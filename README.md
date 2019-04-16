## css类型文件处理的基本配置参数 
 - 这次我们需要用到 css-loader，style-loader 等 loader，跟 babel 一样，webpack 不知道将 CSS 提取到文件中。需要使用 loader 来加载对应的文件 
  
  ### css-loader:负责解析 CSS 代码，主要是为了处理 CSS 中的依赖，例如 @import 和 url() 等引用外部文件的声明 
  
  ### style-loader 会将 css-loader 解析的结果转变成 JS 代码，运行时动态插入 style 标签来让 CSS 代码生效。 

> 样式生效以后，不会生成一个css的文件夹，webpack会通过 style-laoder自动的吧样式加在头部的 style 里面

 1、如果想要使用scss的后缀样式，就需要继续引入 sass-laoder  node-sass的两个loader.然后继续加在 use:['style-loader','css-loader']  后面. scss-laoder 可以让scss的后缀文件变成css的文件
 
 2.use:['style-loader','css-loader','scss-loader'] 这里面的执行顺序是  **从下到上。从左到右执行的**

 3.postcss-laoder:有时候有些css3的新特性，必须加上浏览器前缀，才能兼容，就需要这个特性，
 (1)在根目录添加 postcss.config.js文件，里面设置一下，需要npm install autoprefixer的依赖，这样的css3 的特性就会加上 厂商前缀

4.importLoaders 假如有这个场景，各种loader本来是解决js文件里面引入的不同类型的文件用来解析的，如果一个scss的文件里面通过@import引入了另一个scsd的文件，那么第二个scss的文件可能就不会用上post-laoder的转换，这就不好了，使用importloaders可是让嵌套的scss也把地下的loader也使用上

## css模块化打包
1.假如你在index.js里面引入了一个样式。另外还有个js的文件，也有自己的样式，可能就会影响和冲突，这样打包，就不会影响
平时我们引用css文件手机 import './xx.scss'
使用以后就可以模块化使用。import cssModule from './xx.scss'
下面使用就可以 cssModule.xxxx
```
{
      test:/\.scss$/,
      use:['style-loader',
           {
             loader:'css-loader',
             options:{
               importLoaders:2,
               module:true  // 开启样式模块化打包
             }
           },
           'sass-loader',
           'postcss-loader']
    }
```