var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
//导入 copy-webpack-plugin 用来复制
var CopyWebpackPlugin = require('copy-webpack-plugin')
//导入 html-webpack-plugin 用来自动生成 html
var HtmlWebpackPlugin = require('html-webpack-plugin')
//导入 extract-text-webpack-plugin 用来抽离 css 防止 css打包压缩到 js 中
var ExtractTextPlugin = require('extract-text-webpack-plugin')
//导入 optimize-css-assets-webpack-plugin 用来压缩单独的 css 文件
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

//区分环境
var env =
  process.env.NODE_ENV === 'testing'
    ? require('../config/test.env')
    : config.build.env

//合并配置
var webpackConfig = merge(baseWebpackConfig, {
  module: {
    //配置独立的css文件解析规则
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true // 生成独立的文件
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot, // 打包后的文件放在 dist 目录下面
    filename: utils.assetsPath('js/[name].[chunkhash].js'), // 编译生成的 js 文件存放在根目录下的 js 目录下，如果 js 文件夹不存在就自动创建
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js') // 用来打包 require.ensure 方法中引入的模块，如果该方法中没有引入任何模块，就不会生成 chunk 文件
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    //自定义一个 plugin 生成当前环境下的一个变量
    new webpack.DefinePlugin({
      'process.env': env
    }),
    //压缩
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false //禁止压缩警告信息
      },
      sourceMap: true //开启 sourceMap用来调试
    }),
    //独立的 css 文件夹插件
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // 来自不同组件的重复CSS可以被删除。
    //压缩提取css
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    //编辑index.html实现自定义输出
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename:
        process.env.NODE_ENV === 'testing' ? 'index.html' : config.build.index,
      template: 'index.html',
      inject: true, //制定webpack打包的js css静态资源插入到html的位置，为true或者body时，将会把js文件放到body的底部，为head时，将js脚本放到head元素中
      //设置静态资源的压缩情况
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      //必须通过CommonsChunkPlugin一致地处理多个块
      chunksSortMode: 'dependency'
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // 提取公共模块
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0
        )
      }
    }),
    // 抽离webpack运行文件
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // 复制自定义静态资源到生产环境
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

// 压缩
if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin') //压缩插件

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      //目标资源名称 [path]会被替换成原始资源的路径 [query]会被替换成查询字符串
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      // 所有匹配该正则的资源都会被处理 默认值是全部资源
      test: new RegExp(
        '\\.(' + config.build.productionGzipExtensions.join('|') + ')$'
      ),
      threshold: 10240, //只有大小大于该值得资源会被处理，单位是 bytes
      minRatio: 0.8 //压缩率小于这个值得资源才会被处理 默认值是 .8
    })
  )
}

// 打包文件分析工具
if (config.build.bundleAnalyzerReport) {
  //优化工具
  var BundleAnalyzerPlugin =
    require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  //将提供的数据添加进来
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
