### sourceMap的基础配置

1.什么是sourcemap，
当你文件里面的代码出错了，如果不配置sourceMap，会把报错的信息体现在，压缩完的代码里，这样就很不好，找不到错在哪里了。
但是配置以后，会提示你错在哪个文件夹的哪一行，方便快速找到错误，映射错误文件

2.在module.exports里面直接加上devtools:'sourceMap'，可以开启这个功能，如果配置了sourcemap.打包的速度会变慢的。

3.使用sourcemap以后，你会发现，打包好的文件里面，有个.js.map的映射文件

4.官方文档 配置 里面， 有个选项 devtool.里面有很详细的使用方法，
（1）sourceMap.打包出一个xx.js.map的文件
（2）inline-source-map，会把map的文件取消，转换成一个base64的行字符串加在打包的js文件里面，
（3）inline-cheap-source-map，上面的两个会把哪一行，那一列错的位置告诉我们，但是这个会把那一列去到，提高性能。
（4）cheap-module-eval-source-map,开发使用这个最好，全面，速度还快一点    **开发环境**
（5）cheap-module-source-map，生产使用这个比较好，mode：producton   **生产环境**