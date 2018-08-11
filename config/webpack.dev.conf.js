const path = require("path");
const webpack = require('webpack');
const merge = require('webpack-merge');
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
        test: /\.js$/,
        use: [
          "babel-loader",
          "source-map-loader"
        ],
        exclude: [
          path.resolve(__dirname, "../node_modules")
        ],
      },
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        include: [
          path.resolve(__dirname, "../src")
        ],
        exclude: [
          path.resolve(__dirname, "../node_modules")
        ],
      },
      {
        test: /\.pcss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: require.resolve('typings-for-css-modules-loader'),    // 该插件用于生成 CSS 文件的 d.ts 文件，便于 TS 使用
            options: {
              importLoaders: 1,
              modules: true,
              namedExport: true,
              camelCase: true,
              minimize: true,
              localIdentName: '[name]-[local]-[hash:base64:5]',
            },
          },
          {
            loader: require.resolve('postcss-loader'),
          },
        ],
      },
      {
        test: /\.less$/,
        use: [{ loader: 'style-loader' },
        { loader: 'css-loader' },
        { loader: 'less-loader', options: { javascriptEnabled: true } }]
      },
      {
        test: /\.(png|jpg|gif|ttf|eot|woff|woff2|svg)$/,
        loader: 'url-loader?limit=8192&name=[name].[hash:8].[ext]&outputPath=dist/imgs/'
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
      chunks: ['manifest', 'vendor', 'common', 'app'],
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