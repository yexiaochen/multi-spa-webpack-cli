const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const APP_CONFIG = require('../env-config.json');

module.exports = merge.smart(common, {
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    publicPath: '/',
    path: path.resolve(__dirname, '..', 'dist')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: "eval-source-map",
  devServer: {
    publicPath: '/',
    contentBase: path.resolve(__dirname, '..', 'dist'),
    port: APP_CONFIG.port,
    // 使用 docker
    // host: '0.0.0.0',
    hot: true,
    historyApiFallback: {
      index: '/'
    }
    // open: true
  },
});
