
//webpack 模块打包工具
// Es modules  方式   import a from './a'   export default = a;
// Commonjs  node引入方式 var  a  = require('./sasa')      moudele.exports = a
import Header from './header.js';
import Nav from './nav.js';
import imgs  from './1.png'
var img = new Image();
img.src = imgs
var root = document.getElementById('app')
root.append(img)

new Header()
new Nav()