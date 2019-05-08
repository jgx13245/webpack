const merge  = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

const prodConfig= {
  mode: 'production', // 区分是什么环境，，避免报错
  devtool:'cheap-module-source-map',
}

module.exports = merge(commonConfig,prodConfig)
