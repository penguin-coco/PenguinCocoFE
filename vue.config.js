module.exports = {
  publicPath: '/',
  assetsDir: 'static',
  devServer: {
    proxy: {
      '/api/*': {
        target: 'http://163.14.68.48',
        // target: 'https://eb19ab36.ngrok.io',
        changeOrigin: true
      }
    }
  },
  lintOnSave: false
}