
//webpack 模块打包工具
// Es modules  方式   import a from './a'   export default = a;
// Commonjs  node引入方式 var  a  = require('./sasa')      moudele.exports = a
import './style.css'

var btn  = document.createElement('Button')
btn.innerHTML = "点击"
document.body.append(btn)

btn.onclick = function () {
  var div = document.createElement('div')
  div.innerHTML = "你好"
  document.body.append(div)
}