// 这个文件是vue-cli创建出来的项目的配置文件
// 在vue.config.js这个配置文件中，可以对整个项目的打包、构建进行全局性的配置
// webpack在进行打包的时候，底层用到了 node.js
// 因此，在vue.config.js配置文件中，可以导入并使用node.js中的核心模块
const path = require('path')
const themePath = path.join(__dirname, './src/theme.less')

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  publicPath: './',
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            // 'nav-bar-background-color': 'orange'

            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "${themePath}";`
          }
        }
      }
    }
  }
}
