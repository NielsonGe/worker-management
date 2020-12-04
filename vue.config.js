module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './test2' : '.',
  devServer: {
    port: 9528,
    proxy: {
      '/v1/service/v1/ocr/idcard': {
        target: 'https://webapi.xfyun.cn',
        changeOrigin: true
      }
    }
  },
  transpileDependencies: [
    'vue-router',
    '@ionic/vue',
    'cache-loader',
    'vue-i18n'
  ]
}