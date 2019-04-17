### webpackDevServe 提升开发效率

1.每次修改完代码，都要重新打包才能更新蛮狠费劲

2.在package.json里面的script，新加上一行
```
script:{
  "start":"webapack-dev-serve"
}

// 在 webpack.donfig.js里面
devServe:{
  // 起服务的目录
  contentBase:'./dist'
}

npm install webpack-dev-server -D

```
再运行的时候，就会显示localhost:8080  端口运行，直接在页面运行，修改，避免修改就要重新打包

3.这就是为什么 react ,vue这些前端框架需要借用webpackd的devserver开一个web服务器的原因，如果直接用原始的打包好使用
index.html来展示页面的话，url是file。。。。。。是不能调用ajax的，调用ajax需要一个http的服务开启才能调用。

4.还有好多的属性，port host proxy 看官网的这一块进行修改补充


5总结一下

```
script:{
  "watch":"webapck --watch", // 每次有修改，都会监听自动打包，但是没办法起一个服务器，无法调用ajax
  "start":"webapack-dev-serve" // 主流都是用这个，好多属性功能
  "server":"node serve.js" // 自己使用express。监听改变，自己实现webapack-dev-serve的监听功能，耗费精力。暂时不建议使用。
}

```
链接：[https://webpack.docschina.org/configuration/dev-server/#devserver-proxy]