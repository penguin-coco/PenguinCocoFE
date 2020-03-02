module.exports = {
  publicPath: '/',
  assetsDir: 'static',
  devServer: {
    proxy: {
      '/api/*': {
        // target: 'http://163.14.68.48',
        target: 'http://penguincoco.tk',
        // target: 'http://c5493d2c.ngrok.io',
        changeOrigin: true
      }
    }
  },
  lintOnSave: false
}