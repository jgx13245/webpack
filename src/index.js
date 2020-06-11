
//webpack 模块打包工具
// Es modules  方式   import a from './a'   export default = a;
// Commonjs  node引入方式 var  a  = require('./sasa')      moudele.exports = a
import './a.scss'

var div = document.createElement('div');
div.classList.add('m')
var root = document.getElementById('app')
root.append(div)

