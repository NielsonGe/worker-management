module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './test2' : '.',
  devServer: {
    port: 9528,
    https: true,
    proxy: {
      '/v1/service/v1/ocr/idcard': {
        target: 'https://webapi.xfyun.cn',
        changeOrigin: true,
        secure: false
      },
      '/api/v1.0/':{
        target: 'https://ics.scgecloud.com:28028',
        changeOrigin: true,
        secure: false
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