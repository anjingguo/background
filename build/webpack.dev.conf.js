var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin') //自动帮我们将 webpack 打包生成的文件（比如 js 文件、css 文件）嵌入到 html 文件中
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin') //帮助开发人员更快地定位和解决打包过程中的错误

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(
    baseWebpackConfig.entry[name]
  )
})

//合并基础的webpack配置
module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map', //控制是否生成如何生成source map
  plugins: [
    //定义全局变量,在webpack打包时对这些变量做替换(处理开发环境与生产环境的不同)
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    //热更新插件
    new webpack.HotModuleReplacementPlugin(),
    //在编译出现错误时，跳过输出阶段
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    //生成一个html文件(会将打包好的js文件自动嵌入)
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    //在Webpack打包过程中生成友好的错误消息
    new FriendlyErrorsPlugin()
  ]
})
