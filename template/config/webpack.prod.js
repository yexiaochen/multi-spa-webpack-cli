const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const common = require('./webpack.common.js');

module.exports = merge.smart(common, {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '..', 'dist/src')
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.(png|svg|jpe?g|gif)$/,
  //       use: [
  //         {
  //           loader: 'url-loader',
  //           options: {
  //             limit: 10000
  //           }
  //         },
  //         'image-webpack-loader'
  //       ]
  //     }
  //   ]
  // },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new BundleAnalyzerPlugin(),
    new OptimizeCSSAssetsPlugin({}),
  ]
});
