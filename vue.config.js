const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // transpileDependencies: true,
  // 处理map文件
  productionSourceMap:false,
  // 关闭语法校验
  lintOnSave:false,
  // 配置代理跨域
  devServer:{
    proxy:{
      "/api":{
        target: "http://gmall-h5-api.atguigu.cn",
      }
    }
  }
})
