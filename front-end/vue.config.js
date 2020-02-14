const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  },
  transpileDependencies: [
    'quasar'
  ],
  lintOnSave: true,
  outputDir: './static',
  chainWebpack: config => {
    config.plugin('extract-css')
      .use(MiniCssExtractPlugin)
  }
}
