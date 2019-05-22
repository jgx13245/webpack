# webpackDevServe  解决单页面应用路由问题

react页面配置路由的时候，发现home就跳转到home页面，但是路径写list的时候，显示找不到list页面，原因是，webpackdevserve,认为你路径是
/list的时候，会在寻找list.html的页面，可是单页应用是找不到，所以报错，加上historyApiFallback: true,会默认吧所有的路径请求全部自动
默认找到根路径的inde.html.当然只适合开发环境
这个时候需要配置

```
devServer: {
		contentBase: './dist',
		port: 8080,
		hot: true,
		historyApiFallback: true,
		hotOnly: true,
		proxy:{
			'/mock':{
				target:'https://www.easy-mock.com',
				secure:false,
				pathRewrite:{
					'header.json':'demo.json'
				}
			}
		}
	},
```