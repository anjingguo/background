var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  //配置webpack编译入口
  entry: {
    app: './src/main.js'
  },
  //配置webpack输出路径和命名规则
  output: {
    path: config.build.assetsRoot, // 打包后文件输出路径
    filename: '[name].js', // 输出文件名称默认使用原名
    publicPath:
      process.env.NODE_ENV === 'production'
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath // 文件引用路径
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'], // 省略扩展名，也就是说当使用.js .vue .json文件导入可以省略后缀名
    alias: {
      vue$: 'vue/dist/vue.esm.js', // $符号指精确匹配，路径和文件名要详细
      '@': resolve('src') // resolve('src') 指的是项目根目录中的src文件夹目录，使用@符号代替
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader', // 解析.vue文件
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader', // 对js文件使用babel-loader转码，用于解析es6等代码
        include: [resolve('src'), resolve('test')] // 指明那些文件夹下的js文件需要使用该loader
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader', // 使用url-loader插件，将图片转为base64格式字符串
        options: {
          limit: 10000, // 10000个字节以下的文件才用来转为dataUrl
          name: utils.assetsPath('img/[name].[hash:7].[ext]') //超过10000字节的图片，就按照制定规则设置生成的图片名称，可以看到用了7位hash码来标记，.ext文件是一种索引式文件系统
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
