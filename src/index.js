
//webpack 模块打包工具
// Es modules  方式   import a from './a'   export default = a;
// Commonjs  node引入方式 var  a  = require('./sasa')      moudele.exports = a
/*
第一种打包方式，
外部的库和业务的逻辑代码全部加载到一个bundle.js文件中，假如外部库1mb,业务逻辑也是1mb，那打好包就是2mb,
如果，我们修改了业务逻辑，用户就需要重新加载2mb的文件，性能不好，

第二种打包方式，将外部库和业务代码，分成两个js的文件，这样就是两个1mb的文件。修改业务时候，用户不需要重新加载两mb的
文件，
*/

console.log(1234)

if('serviceWorker' in navigator) {
  window.addEventListener('load',() => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('pwa 成功')
      })
      .catch(error => {
        console.log('pwa 失败')
      })
  })
}