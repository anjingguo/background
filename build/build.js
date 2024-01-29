//执行版本检查
require('./check-versions')()
//设置环境变量为生产环境
process.env.NODE_ENV = 'production'

var ora = require('ora') //loading模块
var rm = require('rimraf') //删除文件
var path = require('path')
var chalk = require('chalk') //美化你控制台输出的语句
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')

//初始化并设置加载中时的文本信息
var spinner = ora('building for production...')
spinner.start()

//删除打包后的文件和资源包
rm(
  path.join(config.build.assetsRoot, config.build.assetsSubDirectory),
  (err) => {
    if (err) throw err
    //若没有错误则继续执行，构建webpack
    webpack(webpackConfig, function (err, stats) {
      spinner.stop() //结束loading动画
      if (err) throw err
      process.stdout.write(
        //标准输出流，类似于console.log
        stats.toString({
          colors: true, // 增加控制台颜色开关
          modules: false, // 是否增加内置模块信息
          children: false,
          chunks: false, // 允许较少的输出
          chunkModules: false // 编译过程持续打印
        }) + '\n\n'
      )
      //编译成功的信息
      console.log(chalk.cyan('  Build complete.\n'))
      console.log(
        chalk.yellow(
          '  Tip: built files are meant to be served over an HTTP server.\n' +
            "  Opening index.html over file:// won't work.\n"
        )
      )
    })
  }
)
