require('./check-versions')()

var config = require('../config')

//设置环境
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn') //打开URL、文件、可执行文件等内容
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware') //用于把请求代理转发到其他服务器的中间件
var webpackConfig =
  process.env.NODE_ENV === 'testing'
    ? require('./webpack.prod.conf')
    : require('./webpack.dev.conf')

//开发服务器监听传入的默认端口
var port = process.env.PORT || config.dev.port

//自动打开浏览器，如果未设置为false
var autoOpenBrowser = !!config.dev.autoOpenBrowser

//为自定义API后端定义HTTP代理
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable //代理配置表

var app = express() //实例化
var compiler = webpack(webpackConfig)

//监听资源变化,自动打包
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath, //资源在内存中存放的路径
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// 当html-webpack-plugin模板改变时，强制重新加载页面
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
// Object.keys(proxyTable).forEach(function (context) {
//   var options = proxyTable[context]
//   if (typeof options === 'string') {
//     options = { target: options }
//   }
//   app.use(proxyMiddleware(options.filter || context, options))
// })

//代理请求
var context = config.dev.context

switch (process.env.NODE_ENV) {
  case 'local':
    var proxypath = 'http://elm.cangdu.org'
    break
  case 'online':
    var proxypath = 'http://elm.cangdu.org'
    break
}
var options = {
  target: proxypath,
  changeOrigin: true
}
if (context.length) {
  app.use(proxyMiddleware(context, options))
}
// 处理HTML5历史API的回退
app.use(require('connect-history-api-fallback')())

// 提供webpack包输出
app.use(devMiddleware)

// 启用热加载和状态保持
app.use(hotMiddleware)

// 服务纯静态资源
var staticPath = path.posix.join(
  config.dev.assetsPublicPath,
  config.dev.assetsSubDirectory
)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise((resolve) => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // 当env在测试时，不需要打开它
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
