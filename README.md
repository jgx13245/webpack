#打包分析，preloading,prefetching

1.打包分析，主要是看页面的webpack的打包性能，比如打好包以后的js利用率。
打开任何页面的控制台输入command+shift+p  弹出一个小弹框，在小弹框里面输入 cove。然后
底部会出现一个菜单栏。把最左面的小点点成红点。就可以看到每个打包好的js文件的利用率。也可以
在官网打开

https://www.webpackjs.com/guides/code-splitting/#bundle-%E5%88%86%E6%9E%90-bundle-analysis-


2.现在提升性能，不要单纯的靠缓存提升，而是要提升打包的js文件利用率来提高，利用率越高，打开页面速度越快，
代码分割里面，chunk默认值是async，异步优先。

**因为同步代码，都是先加载。后面操作很快，现在流行是首页打开很快，提高性能**

3.只有当我们在页面点击时才会加载lodash，也有一些模块虽然是异步导入的，但我们希望能提前进行加载，PreLoading和Prefetching
可以帮助我们实现这一点，但它们还有一个区别在于：

> Prefetching不会跟随主进程一些下载，而是等到主进程加载完毕，带宽释放后才进行加载(推荐)，PreLoading会随主进程一起加载。


4.实际操作

新建立一个click.js的文件

```
// click.js
export default function handleClick() {
  var element = document.createElement('div');
  element.innerHTML = 'xin';
  document.body.appendChild(element);
}
```

在index.js里面

```
// Prefetching代码预加载    方法里面的注释是魔法注释，生效的。
document.addEventListener('click', () => {
 import(/* webpackPrefetch: true */ './click.js').then(({default:func}) => {
   func()
 }) 
})
```

魔法注释可以更改。一般建议使用webpackPrefetch: true