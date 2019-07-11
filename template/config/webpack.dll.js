
'use strict'

const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: {
    react_antd: ['react', 'react-dom', 'antd', 'react-redux', 'react-router-dom', 'redux'],
  },

  output: {
    path: path.resolve(__dirname, '..', 'dist/dll'),
    publicPath: '/dll',
    filename: '[name].dll.js',
    library: '[name]_[hash]',
    libraryTarget: 'this'
  },

  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      context: process.cwd(),
      path: path.join(__dirname, '..', 'dist', 'dll', '[name]-manifest.json'),
      name: '[name]_[hash]'
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, '..', 'dist/dll/index.html'),
      template: path.resolve(__dirname, '..', 'index.html'),
    })
  ]
}