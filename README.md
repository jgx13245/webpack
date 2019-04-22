### 使用Bable处理ES6语法

1、目的是使用低版本的IE浏览器可以正常的解析ES6的语法。

2.打开bable的官网https://babeljs.io/setup#installation

（1）setup  找到webapck的配置，按照步骤下载，引用，

（2）基本配置和解析
```
rules: [
      { test: /\.js$/, 
        exclude: /node_modules/, //如果js代码在nodule文件下，就不转译
        loader: "babel-loader" 
      }, 
```

(3)babel-loader只是和webapck建立一个沟通的桥梁，@babel/preset-env是吧es6远方转化成es5语法的根本

```
{ test: /\.js$/, 
        exclude: /node_modules/,
        loader: "babel-loader",
        options:{
          presets:['@babel/preset-env']
        }
      }, 
```

3.转换好以后查看 压缩好的文件，里面的es6 抓换为 es5 语言，但是。只是吧语法转换为es5了。promise,mpa等这些
  es6的方法并没有转换，所以还需继续配置，

  (1)打开bable官网，找到 polyfill    npm install --save @babel/polyfill 

  (2)在js文件里面引入import "@babel/polyfill";  在重新打包，bundle.js文件就会很大

 （3）babel/polyfill填充会把所有的es6语法转换加上，这样文件太大，我只需我运用了那些方法就填充那些方法。
      可以用bable的useBuiltIns方法
      
     ```
     { test: /\.js$/, 
        exclude: /node_modules/,
        loader: "babel-loader",
        options:{
          presets:[['@babel/preset-env',{
            targets: {
              chrome: "67",  // 目的是只要浏览器版本大于67的，就不要使用bable转换了
            },
            'useBuiltIns':'usage'  //加上这个就不会所有es6语法都填充,会根据代码业务需求来响应的转换填充
          }]]
        }
      }, 
     ``` 