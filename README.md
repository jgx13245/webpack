### entry 和 output的基础配置

1、entry 可以是一个字符串，也可以是一个对象。
（1）假如entry 不设置名字的话，打包就以output的filename的输出为主
  ```
  entry: './src/index.js', // 入口文件
  output: { //输出文件
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist') // path 会在根目录生成一个dist的文件
  },
  ```
 > 这种情形打包出来的是 app.js

 (2)如果filename不设置名字，就医entry的名字为主
  ```
  entry: {
    main:'./src/index.js', // 入口文件
  }
  output: { //输出文件
    path: path.resolve(__dirname, 'dist') // path 会在根目录生成一个dist的文件
  },
  ```
  > 这种情形打包出来的是 main.js

2、有这个需求，需要把打包文件里面的js文件生成两个，
  修改entry和output的配置,让output的输出变成一个占位符。这样就能生成两个js
  ```
  entry: {
    main:'./src/index.js',
    sub:'./src/index.js'
  }, // 入口文件
  output: { //输出文件
    filename: '[name].js',  
    path: path.resolve(__dirname, 'dist') // path 会在根目录生成一个dist的文件
  },
  ```
  3.有时候我们需要打包好吧index.html给后端座位入口文件，里面引入的js文件前面加上域名，比如cdn什么的，这时候在output里面添加
  publicPath:域名，

  看官网的guide  outputMange(管理输出)