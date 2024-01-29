//

var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseConfig = require('./webpack.base.conf')

//合并基础webpack配置
var webpackConfig = merge(baseConfig, {
  // use inline sourcemap for karma-sourcemap-loader
  module: {
    rules: utils.styleLoaders()
  },
  devtool: '#inline-source-map',
  resolveLoader: {
    alias: {
      // 当使用vue-loader的inject选项时，必须使lang="scss"在测试中工作
      // see discussion at https://github.com/vuejs/vue-loader/issues/724
      'scss-loader': 'sass-loader'
    }
  },
  plugins: [
    //定义全局变量,在webpack打包时对这些变量做替换(处理开发环境与生产环境的不同)
    new webpack.DefinePlugin({
      'process.env': require('../config/test.env')
    })
  ]
})

//无需在测试期间进入应用程序
delete webpackConfig.entry

module.exports = webpackConfig
