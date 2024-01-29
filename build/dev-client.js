/* eslint-disable */
require('eventsource-polyfill') //解决EventSource(事件流)兼容问题
var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true') //热替换插件(当我们编写的代码变化的时候，变化的代码会同步到浏览器，且浏览器不用重新刷新，之前的状态都保留)
//noInfo设置为禁用信息控制台日志记录
//reload设置为在webpack卡住时自动重新加载页面
hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})
