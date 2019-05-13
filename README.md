# lazy-loading 懒加载

1.Lazy Loading懒加载的概念是，通过异步引入代码，它说的异步，并不是在页面一开始就加在，而是在合适的时机进行加载。

2. 举个例子，loadsh这个外库不会在一开始就引用，而是在点击的时候才会引用。

```
async function getComponet() {
  const { default: _ }  = await import(/* webpackChunkName: 'lodash' */ 'lodash');
  var element = document.createElement('div');
  element.innerHTML = _.join(['1', '2', '3'], '**')
  return element;
}

document.addEventListener('click', () => {
  getComponet().then(element => {
    document.body.appendChild(element);
  })
})
```

3.使用import的异步，要子啊babelrc加上

```
{
  "presets":[["@babel/preset-env",{
    "targets": {
      "chrome": "67",
    },
    "useBuiltIns":"usage",
    "corejs":2
  }]],
  "plugins": ["@babel/plugin-syntax-dynamic-import"]
}
```