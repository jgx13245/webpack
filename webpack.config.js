const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webapck = require('webpack')
module.exports = {
  mode: 'development', // 区分是什么环境，，避免报错
  devtool:'source-map',
  devServer:{
    port: 8888,
    contentBase:'./dist',
    hot:true,
  },
  entry: {
    main:'./src/index.js',
  }, // 入口文件
  output: { //输出文件
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist') // path 会在根目录生成一个dist的文件
  },
  // 添加各种laoder 
  module: {
    /* url-loader和file-laoder差不多，但是url-loader不会把所有的图片打包到dist里面。会自动转成base64合成到app.js里面，有个属性，limit 
     */
    rules: [{
        test: /\.(png|jpg)$/,
        use: {
          loader: 'url-loader', // 解析不同的后缀名。图片的和后缀名，vue的是vue-loader
          options: {
            name: '[name].[ext]', // 占位符配置，不配置的话，dist里面的名字会有问题，这样就可以使其名字个后缀都是原来的配置，
            outputPath: 'images/', // 可以子啊dist里面生成文件夹，区分不同的文件
            limit: 2048 // 如果大于limit设置的大小，就单独生成图片，否则就直接加在js里面，减少http的请求
          }
        }
      },
      // css-loader部分解析
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
      }
    ]
  },
  // 插件部分
  plugins: [
    new HtmlWebpackPlugin({
    template: './src/index.html'
    }),
   new CleanWebpackPlugin(),
   new webapck.HotModuleReplacementPlugin()
  ]
}


