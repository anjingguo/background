var chalk = require('chalk')
var semver = require('semver') //npm的语义版本器;帮助检查和修改版本号
var packageConfig = require('../package.json')
var shell = require('shelljs') //shell.js插件，执行unix系统命令
function exec(cmd) {
  // 脚本可以通过child_process模块新建子进程，从而执行unix系统命令
  // 将cmd参数传递的值转换成前后没有空格的字符串，也就是版本号
  return require('child_process').execSync(cmd).toString().trim()
}

//声明常量数组，数组内容为有关node相关信息的对象
var versionRequirements = [
  {
    name: 'node', //对象名称为node
    currentVersion: semver.clean(process.version), //使用semver插件，把版本信息转换成规定格式
    versionRequirement: packageConfig.engines.node //规定package.json中engines选项的node版本信息
  }
]

//which为linux指令，在$path规定的路径下查找符合条件的文件
if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'), //调用npm --version命令，并且把参数返回给exec函数获取纯净版本
    versionRequirement: packageConfig.engines.npm //规定package.json中engines选项的node版本信息
  })
}

module.exports = function () {
  var warnings = []
  for (var i = 0; i < versionRequirements.length; i++) {
    var mod = versionRequirements[i]
    // 如果版本号不符合package.json文件中指定的版本号，就执行warning.push...
    // 当前版本号用红色标识，要求版本号用绿色标识
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(
        mod.name +
          ': ' +
          chalk.red(mod.currentVersion) +
          ' should be ' +
          chalk.green(mod.versionRequirement)
      )
    }
  }

  //如果为真，则打印提示用户升级新版本
  if (warnings.length) {
    console.log('')
    console.log(
      chalk.yellow(
        'To use this template, you must update following to modules:'
      )
    )
    console.log()
    for (var i = 0; i < warnings.length; i++) {
      var warning = warnings[i]
      console.log('  ' + warning)
    }
    console.log()
    process.exit(1)
  }
}
