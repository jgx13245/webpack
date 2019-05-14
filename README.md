# Webpack和浏览器缓存(Caching)

在讲这一小节之前，让我们清理下项目目录，改写下我们的index.js，删除掉一些没用的文件

```
import _ from 'lodash';

var dom = document.createElement('div');
dom.innerHTML = _.join(['Dell', 'Lee'], '---');
document.body.append(dom);
```

清理后的项目目录可能是这样的：

```
|-- build
|   |-- webpack.common.js
|   |-- webpack.dev.js
|   |-- webpack.prod.js
|-- package-lock.json
|-- package.json
|-- postcss.config.js
|-- src
    |-- index.html
    |-- index.js

```
我们使用npm run build打包命令，打包我们的代码，可能会生成如下的文件

```
|-- build
|   |-- webpack.common.js
|   |-- webpack.dev.js
|   |-- webpack.prod.js
|-- dist
|   |-- index.html
|   |-- main.js
|   |-- vendors~main.chunk.js
|-- package-lock.json
|-- package.json
|-- postcss.config.js
|-- src
    |-- index.html
    |-- index.js
 ```

**我们可以看到，打包生成的dist目录下，文件名是main.js和vendors~main.chunk.js，如果我们把dist目录放在服务器部署的话，当用户第一次访问页面时，浏览器会自动把这两个.js文件缓存起来，下一次非强制性刷新页面时，会直接使用缓存起来的文件。**
**假如，我们在用户第一次刷新页面和第二次刷新页面之间，我们修改了我们的代码，并再一次部署，这个时候由于浏览器缓存了这两个.js文件，所以用户界面无法获取最新的代**
**那么，我们有办法能解决这个问题呢，答案是[contenthash]占位符，它能根据文件的内容，在每一次打包时生成一个唯一的hash值，只要我们文件发生了变动，就重新生成一个hash值，没有改动的话，[contenthash]则不会发生变动，可以在output中进行配置，如下所示**

```
// 开发环境下的output配置还是原来的那样，因为开发环境下，我们不用考虑缓存问题
output: {
  filename: '[name].js',
  chunkFileName: '[name].chunk.js',
  path: path.resolve(__dirname,'../dist')
}

// 生产环境下的output配置
output: {
  filename: '[name].[contenthash].js',
  chunkFilename: '[name].[contenthash].chunk.js',
  path: path.resolve(__dirname,'../dist')
}
```

打包结果： 使用npm install build进行打包，结果如下所示，可以看到每一个.js文件都有一个唯一的hash值，这样配置后就能有效解决浏览器缓存的问题。

```
|-- build
|   |-- webpack.common.js
|   |-- webpack.dev.js
|   |-- webpack.prod.js
|-- dist
|   |-- index.html
|   |-- main.8bef05e11ca1dc804836.js
|   |-- vendors~main.20137a4ad072bc0461a8.chunk.js
|-- package-lock.json
|-- package.json
|-- postcss.config.js
|-- src
    |-- index.html
    |-- index.js
```