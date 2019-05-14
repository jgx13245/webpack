const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge  = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const prodConfig= {
  mode: 'production', // 区分是什么环境，，避免报错
  devtool:'cheap-module-source-map',
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
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})],
  },
  plugins:[new MiniCssExtractPlugin({})]
}

module.exports = merge(commonConfig,prodConfig)
