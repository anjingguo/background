// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    //对应生产环境
    env: require('./prod.env'), //生产环境
    index: path.resolve(__dirname, '../manage/index.html'), //打包后的主体html文件
    assetsRoot: path.resolve(__dirname, '../manage'), //打包后的主文件夹
    assetsSubDirectory: 'static', //把所有的静态资源打包到manage下的static文件夹下
    assetsPublicPath: '/manage/', //代表生成的index.html文件，里面引入资源时，路径前面要加上./manage/,也就是assetsPublicPath的值，即在index.html代码中引用静态文件：
    productionSourceMap: false, //打包好是否生成map文件(映射打包前文件方便找出错误)
    productionGzip: false, //是否压缩代码
    productionGzipExtensions: ['js', 'css'], //定义压缩文件类型
    bundleAnalyzerReport: process.env.npm_config_report //undefined
  },
  dev: {
    //对应开发环境
    env: require('./dev.env'), //开发环境
    port: 8002, //端口
    autoOpenBrowser: true, //启动项目自动打开浏览器
    assetsSubDirectory: 'static', //除了 index.html 之外的静态资源要存放的路径，
    assetsPublicPath: '/', //代表打包后，index.html里面引用资源的的相对地址
    proxyTable: {}, // 代理配置表，在这里可以配置特定的请求代理到对应的API接口;例如将'localhost:8080/api/xxx'代理到'www.example.com/api/xxx'
    context: [
      //代理路径
      '/shopping',
      '/ugc',
      '/v1',
      '/v2',
      '/v3',
      '/v4',
      '/bos',
      '/member',
      '/promotion',
      '/eus',
      '/payapi',
      '/admin',
      '/statis',
      '/img'
    ],
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false //css文件是否映射
  }
}
