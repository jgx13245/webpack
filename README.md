- webpack 里面使用loader可以完成不同类型文件的打包
### plugins 更加快捷的打包
1.场景一，打包生成的dist的目录下本来应该有个index.html的文件，但是是手动添加的。怎么解决这个东西呢？ 
HtmlWebpackPlugin：插件就可以解决这个问题
(1)可以在webpack打完包以后自动生成一个index.html的文件，但是每次打包都是改变的，会自动引入打包生成的bundle.js的文件，

(2)假如我们可能需要模板里面有个root的标签，我们就可以使用这个插件的配置选项，
   ```
   plugins: [new HtmlWebpackPlugin({
    template:'./src/index.html'
  })]
   ```
   我们可以在其他目录提前设置好一个模板，添加上这个标签，这样，自动打包生成的index.html的文件就会带有这个标签的

(3)plugins 可以在你webpack运行到某个时候的帮你做一些事，类似生命周期函数

(4)clean-webpack-plugin：有时候我们打包好的js文件想改改名字，但是重新打包，dist的文件夹不会丢失，会冗余，所以打包前先把dist的文件夹删除，再重新打包，
   这个插件可以实现这个功能
   ```
   plugins: [
    new HtmlWebpackPlugin({
    template: './src/index.html'
    }),
   new CleanWebpackPlugin() //  版本不同，参数不同，这个不用传参
  ]
   ```