const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
// const CopyPlugin = require('copy-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: {
    main: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', './src/index.jsx']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  target: 'web',
  devtool: '#source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        //   options: {
        //     presets: ['@babel/preset-env'],
        //     plugins: ["@babel/plugin-syntax-dynamic-import", "@loadable/babel-plugin"]
        //   }
        }
      },
      {
        // Loads the javacript into html template provided.
        // Entry point is set below in HtmlWebPackPlugin in Plugins 
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            //options: { minimize: true }
          }
        ]
      },
      { 
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
       test: /\.(png|svg|jpg|gif)$/,
       use: ['file-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      excludeChunks: [ 'server' ]
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // new CopyPlugin([
    //   { from: 'src/assets/js', to: 'js/' },
    //   { from: 'src/assets/css/jquery-ui.css', to: 'css/' },
    //   { from: 'src/assets/img/logo.png', to: 'img/' }
    // ]),
    new LoadablePlugin(),
    new Dotenv()
  ]
}