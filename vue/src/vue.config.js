module.exports = {
    css: {
        loaderOptions: {
          less: {
            use: [require('less-plugin-glob')()]
          },
        }
      }
}