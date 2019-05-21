# webpackDevServe  转发请求

在这一小节中，我们要学到的技能有：

如何进行接口代理配置
如何使用接口路径重写
其他常见配置的含义

**假设我们现在有这样一个需求：我有一个URL地址(http://www.dell-lee.com/react/api/header.json)，我希望我请求的时候，请求的地址是/react/api/header.json，能有一个什么东西能自动帮我把请求转发到http://www.dell-lee.com域名下，那么这个问题该如何解决呢？**

解决办法

可以使用 Webpack 的webpack-dev-server这个插件来解决，其中需要配置proxy属性。

# 如何进行接口代理配置

既然我们要做请求，那么安装axios来发请求再合适不过了，使用如下命令安装axios:

$ npm install axios --save-dev

webpack.dev.js代码： 因为我们的请求代理只能在开发环境下使用，线上的生产环境，需要走其他的代理配置，所以我们需要在webpack.dev.js中进行代理配置

```
const devConfig = {
  // ... 其他配置
  devServer: {
    // 启动bundle文件夹
    contentBase: './dist',
    // 自动打开浏览器
    open: false,
    // 端口3000
    port: 3000,
    // 模块热更新
    hot: true,
    hotOnly: true,
    // 请求代理
    proxy: {
      '/react/api': {
        target: 'http://www.dell-lee.com'
      }
    }
  }
}

```
改写index.js代码： 在index.js文件中，引入axios模块，再做请求转发。

```
import axios from 'axios';

axios.get('/react/api/header.json').then((res) => {
  let {data,status} = res;
  console.log(data);
})
```

请求的结果： 可以看到，我们已经成功请求到了我们的数据。 请求的结果

# 如何使用接口路径重写
现在依然假设有这样一个场景：http://www.dell-lee.com/react/api/header.json这个后端接口还没有开发完毕，但后端告诉我们可以先使用http://www.dell-lee.com/react/api/demo.json 这个测试接口，等接口开发完毕后，我们再改回来。

解决办法

解决这个问题最佳办法是，代码中的地址不能变动，我们只在proxy代理中处理即可，使用pathRewrite属性进行配置。

```
const devConfig = {
  // ... 其他配置
  devServer: {
    // 启动bundle文件夹
    contentBase: './dist',
    // 自动打开浏览器
    open: false,
    // 端口3000
    port: 3000,
    // 模块热更新
    hot: true,
    hotOnly: true,
    // 请求代理
    proxy: {
      '/react/api': {
        target: 'http://www.dell-lee.com',
        pathRewrite: {
          'header.json': 'demo.json'
        }
      }
    }
  }
}
```

请求结果： 我们可以看到，我们的测试接口的数据已经成功拿到了。 请求结果

# 其他常见配置的含义

转发到https： 一般情况下，不接受运行在https上，如果要转发到https上，可以使用如下配置

```
module.exports = {
  //... 其他配置
  devServer: {
    proxy: {
      '/react/api': {
        target: 'https://www.dell-lee.com',
        secure: false
      }
    }
  }
}
```

跨域： 有时候，在请求的过程中，由于同源策略的影响，存在跨域问题，我们需要处理这种情况，可以如下进行配置。

```
module.exports = {
  //... 其他配置
  devServer: {
    proxy: {
      '/react/api': {
        target: 'https://www.dell-lee.com',
        changeOrigin: true,
      }
    }
  }
}
```

代理多个路径到同一个target： 代理多个路径到同一个target，可以如下进行配置

```
module.exports = {
  //... 其他配置
  devServer: {
    proxy: [{
      context: ['/vue/api', '/react/api'],
      target: 'http://www.dell-lee.com'
    }]
  }
}
```