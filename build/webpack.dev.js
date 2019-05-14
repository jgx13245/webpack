const webapck = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

const devConfig = {
  mode: 'development', // 区分是什么环境，，避免报错
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    port: 8081,
    contentBase: './dist',
    hot: true,
    // hotOnly:true
  },
  module:{
    rules:[
      {
        test: /\.scss$/,
        use: ['style-loader',
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
        use: ['style-loader',
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
  // 插件部分
  plugins: [
    new webapck.HotModuleReplacementPlugin(),
  ],
  // 加上这个，代表只打包使用的模块。没有引入的就不用了
  //...其它配置项
  optimization: {
    splitChunks: {
      chunks: 'all',
    }
  },
  output: { //输出文件
    filename: '[name].js',
    chunkFilename:'[name].chunk.js',
  },
}
module.exports = merge(commonConfig, devConfig)