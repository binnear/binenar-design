const path = require('path');
const opn = require('opn');
let config = {
  entry: {
    app: path.resolve(__dirname, '../src/index.tsx')
  },
  resolve: {
    extensions: [".js", ".json", ".tsx"],
    alias: {
      components: path.resolve(__dirname, '../src/components'),
      actions: path.resolve(__dirname, '../src/actions'),
      reducers: path.resolve(__dirname, '../src/reducers'),
      store: path.resolve(__dirname, '../src/store'),
    }
  },
  optimization: {
    // 包清单
    runtimeChunk: {
      name: "manifest"
    },
    // 拆分公共包
    splitChunks: {
      cacheGroups: {
        // 项目公共组件
        common: {
          chunks: "initial",
          name: "common",
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0
        },
        // 第三方组件
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          priority: 10,
          enforce: true
        }
      }
    }
  },
  // 设置api转发
  devServer: {
    host: '0.0.0.0',
    port: 3001,
    hot: true,
    inline: true,
    contentBase: path.resolve('dist'),
    historyApiFallback: true,
    disableHostCheck: true,
    stats: "errors-only",
    proxy: [
      {
        context: ['/v2/**', '/u/**'],
        target: 'https://api.douban.com/',
        changeOrigin: true,
        secure: false
      }
    ],
    // 打开浏览器 并打开本项目网址
    after() {
      opn('http://localhost:' + this.port);
    }
  }
};
module.exports = config;