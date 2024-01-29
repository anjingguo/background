module.exports = {
  root: true, //告诉eslint找当前配置文件不能往父级查找
  parser: 'babel-eslint', //用来指定eslint解析器的，解析器必须符合规则，babel-eslint解析器是对babel解析器的包装使其与ESLint解析
  parserOptions: {
    sourceType: 'module'
  }, //指定javaScript语言类型和风格，sourceType用来指定js导入的方式，默认是script，此处设置为module，指某块导入方式
  env: {
    browser: true,
    node: true
  }, //指定环境的全局变量
  extends: 'eslint:recommended', //此项是用来配置标准的js风格，就是说写代码的时候要规范的写
  plugins: ['html'], //此项是用来提供插件的，插件名称省略了eslint-plugin-，下面这个配置是用来规范html的
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  rules: {
    'arrow-parens': 0, //强制在箭头函数中一致使用括号
    'generator-star-spacing': 0, //生成器函数前后空格
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0, //不允许出现debugger语句
    indent: ['error', 'tab']
  }
}
