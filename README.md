# css文件打包分割

> 官网 https://webpack.js.org/plugins/mini-css-extract-plugin/#root

> TIP
当我们在使用style-loader和css-loader打包.css文件时会直接把CSS文件打包进.js文件中，然后直接把样式通过<style></style>的方式写在页面，如果我们要把CSS单独打包在一起，然后通过link标签引入，那么可以使用mini-css-extract-plugin插件进行打包

> WARNING
截止到写此文档时，插件已经开发环境支持HMR，详情可以看官网的demo，这里我们配置生产模式的css代码分割

1. 新建src/style.css文件： 在 src 目录下新建style.css文件并写如下样式

```
body {
  background-color: green;
}
```

2. 在prod的配置中


（1）npm install mini-css-extract-plugin --save

```
const OptimizeCSSAssetsPlugin = require('mini-css-extract-plugin');
```

 (2) style-loader替换成MiniCssExtractPlugin.loader
```
module:{
    rules:[
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'sass-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'sass-loader',
          'postcss-loader'
        ]
      }
    ]
  },
```
(3)
```
 plugins: [
    new MiniCssExtractPlugin({})
  ]
```
3.改写index.js： 改写index.js文件，通过import引入我们所写的CSS文件。

```
import './style.css';
console.log('hello,world');
```

**通过npm run build 打包，并没有发现在dist里面生成css的文件，原因是Tree Shaking的副作用，应该在package.json中添加属性sideEffects:['*.css']**
修改好以后，发现在打包在dist里面就生成了css的文件

4.压缩css代码

我们再在src目录下新建style1.css文件，内容如下：

```
body{
  line-height: 100px;
}
```
在index.js文件中引入此CSS文件

```
import './style.css';
import './style1.css';
console.log('hello,world');
```


打包结果： 我们发现，虽然插件帮我们把CSS打包在了一个文件，但并没有合并压缩。

```
body {
  background-color: green;
}
body{
  line-height: 100px;
}

/*# sourceMappingURL=main.css.map*/
```

>要想把CSS文件进行合并压缩，需要安装optimize-css-assets-webpack-plugin插件

npm install optimize-css-assets-webpack-plugin --save

```
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({})
    ]
  },
```

打包结果： 再次使用npm run build进行打包，打包结果如下所示，可以看见，两个CSS文件的代码已经压缩合并了。

```
body{background-color:green;line-height:100px}
```