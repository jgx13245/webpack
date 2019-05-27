const path = require('path')
const copyRightWebpackPlugin = require('./pluginTest/copyright-webpack-plugin')


module.exports={
  mode:'development',
  entry:{
    main:'./src/index.js'
  },
  output:{
    filename:'[name].js',
    path:path.resolve(__dirname,'dist')
  },
  plugins:[
    new copyRightWebpackPlugin()
  ]
}