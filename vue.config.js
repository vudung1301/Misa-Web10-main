const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
}),

module.exports = {
  devServer:{
    proxy: 'http://localhost:5168/api/v1/Employees/'
  }
}
