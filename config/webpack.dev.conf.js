const path = require("path");
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackFile = require("./webpack.file.conf");
const baseWebpackConfig = require("./webpack.base.conf");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

let config = merge(baseWebpackConfig, {
  mode: 'development',
  output: {
    path: path.resolve('dist'),
    filename: '[name].js',
    chunkFilename: "[name].js",
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          'cache-loader',
          'babel-loader'
        ],
        include: [
          path.resolve(__dirname, "../index")
        ],
        exclude: [
          path.resolve(__dirname, "../node_modules")
        ],
      },
      {
        test: /\.pcss$/,
        use: ['style-loader?sourceMap',
          'css-loader?modules&importLoaders=1&localIdentName=[name]-[local]-[hash:base64:5]',
          'postcss-loader?sourceMap']
      },
      {
        test: /\.less$/,
        use: [{ loader: 'style-loader' },
        { loader: 'css-loader' },
        { loader: 'less-loader', options: { javascriptEnabled: true } }]
      },
      {
        test: /\.(png|jpg|gif|ttf|eot|woff|woff2|svg)$/,
        loader: 'url-loader?limit=8192&name=[name].[hash:8].[ext]&outputPath=' + webpackFile.resource + '/'
      },
      {
        test: /\.swf$/,
        loader: 'file?name=js/[name].[ext]'
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin({
      format: 'build [:bar] :percent (:elapsed seconds)',
      clear: false,
      width: 60
    }),
    new LodashModuleReplacementPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunks: ['manifest', 'vendor', 'common','app'],
      extra: [],
      hash: false,
      chunksSortMode: 'dependency'
    })
  ],
  externals: {
    'BMap': 'BMap'
  }
});

module.exports = config;