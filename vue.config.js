const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    // disable pwa
    config.plugins.delete('pwa')
    config.plugins.delete('workbox')
  },
})
