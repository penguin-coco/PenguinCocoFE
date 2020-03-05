module.exports = {
  publicPath: '/',
  assetsDir: 'static',
  devServer: {
    proxy: {
      '/api/*': {
        // target: 'http://163.14.68.48',
        // target: 'http://penguincoco.tk',
        target: 'http://a97e12a5.ngrok.io',
        changeOrigin: true
      }
    }
  },
  lintOnSave: false
}