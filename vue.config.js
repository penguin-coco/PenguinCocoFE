module.exports = {
  publicPath: '/',
  assetsDir: 'static',
  devServer: {
    proxy: {
      '/api/*': {
        target: 'http://163.14.68.48',
        // target: 'http://02cb14d5.ngrok.io',
        changeOrigin: true
      }
    }
  },
  lintOnSave: false
}