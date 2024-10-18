const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack'); // Webpackをインポート

module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/login/' : '/',
    configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: JSON.stringify(true),  // Vue 3のオプションAPIを有効にする
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false), // プロダクションでのデベロッパーツールを無効化
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false) // このフラグを明示的に定義
      })
    ]
  },
  transpileDependencies: true
});
