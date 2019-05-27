class copyrightWebpackPlugin {
  
  apply(compiler) {
    compiler.hooks.emit.tapAsync('copyrightWebpackPlugin', (compilation,cb) => {
      debugger;
      compilation.assets['copyright.txt'] = {
        source:function() {
          return 'copyright by ji'
        },
        size:function(){
          return 15
        } 
      }
      cb()
    })
  }
}

module.exports = copyrightWebpackPlugin