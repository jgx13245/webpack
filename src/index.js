
//webpack 模块打包工具
// Es modules  方式   import a from './a'   export default = a;
// Commonjs  node引入方式 var  a  = require('./sasa')      moudele.exports = a
import "@babel/polyfill"

const arr = [
  new  Promise(() => {}),
  new  Promise(() => {})
]

console.log(arr)