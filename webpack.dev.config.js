// const path = require('path')
// const webpack = require('webpack')
// const HtmlWebPackPlugin = require('html-webpack-plugin')
// module.exports = {
//   entry: {
//     main: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', './src/index.js']
//   },
//   output: {
//     path: path.join(__dirname, 'dist'),
//     publicPath: '/',
//     filename: '[name].js'
//   },
//   mode: 'development',
//   target: 'web',
//   devtool: '#source-map',
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         loader: "babel-loader",
//       },
//       {
//         // Loads the javacript into html template provided.
//         // Entry point is set below in HtmlWebPackPlugin in Plugins 
//         test: /\.html$/,
//         use: [
//           {
//             loader: "html-loader",
//             //options: { minimize: true }
//           }
//         ]
//       },
//       { 
//         test: /\.css$/,
//         use: [ 'style-loader', 'css-loader' ]
//       },
//       {
//        test: /\.(png|svg|jpg|gif)$/,
//        use: ['file-loader']
//       }
//     ]
//   },
//   plugins: [
//     new HtmlWebPackPlugin({
//       template: "./src/html/index.html",
//       filename: "./index.html",
//       excludeChunks: [ 'server' ]
//     }),
//     new webpack.HotModuleReplacementPlugin(),
//     new webpack.NoEmitOnErrorsPlugin()
//   ]
// }

const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')

const devConfig = {
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    port: 8000,
    contentBase: path.join(__dirname, '../dist'),
    historyApiFallback: true,
    host: 'localhost',
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://api-t.udty.tech',
        secure: false,
        changeOrigin: true 
      }
    }
  },
}

module.exports = merge({
  customizeArray(a, b, key) {
    if (key === 'entry.app') {
      return b
    }
    return undefined
  }
})(baseConfig, devConfig)