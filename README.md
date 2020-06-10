### Hot Module Replacement 热模块更新

1.怎么添加呢，假如每次修改完页面的css的样式，webapck都会把页面重新刷新一遍，有些样式是需要点击才能生效，这样就很费时间
每次都要点击。

2.使用HMR 可以解决
```
devServer:{
    contentBase:'./dist',
    hot:true，
    hotOnly:true  // 即使html的功能没有生效，也不让浏览器重新刷新 
  },

// 最上层引入

const webapck =  require（’webapck‘）

// 插件部分
 plugins: [
    new HtmlWebpackPlugin({
    template: './src/index.html'
    }),
   new CleanWebpackPlugin(),
   new webapck.HotModuleReplacementPlugin()
  ]
```

3.在js中的使用，

假设页面上两个按钮。两个js文件模块分别控制的，一个是点击改变，一个是固定，点击的我改变了，固定的我修改了代码。页面会重新请求。那我点击
改变的代码就会刷新，数据就没了，可以使用 module.hot 。控制，响应的模块，开启hml.  但是vue-laoder,css-loaderd都内置了这个配置。



[https://webpack.docschina.org/guides/hot-module-replacement/]