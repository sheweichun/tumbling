const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = Object.assign;
const CSS_LOADER = {
    loader: 'css-loader',
    options: {
      modules: false,
      minimize: true,
      localIdentName:'[name][local]-[hash:base64:5]',
    },
  };
  const POSTCSS_LOADER = {
      loader: 'postcss-loader',
      options: {
        config: {
          path: path.resolve(__dirname, 'postcss.config.js'),
        },
      },
    },
    LESS_LOADER = { loader: 'less-loader' }
module.exports = {
    "context": path.resolve(__dirname,'../'),
    "module": {
        rules:[
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        presets: [['es2015', { modules: false }], 'stage-0'],
                        plugins: [
                          'transform-decorators-legacy',
                          ["inferno", {
                                "imports": true,
                                "pragma": ""
                            }]
                        ]
                    },
                }]
            },{
                test: /\.less$/,
                exclude: /node_module/,
                use:ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [CSS_LOADER, POSTCSS_LOADER, LESS_LOADER]
                })
                
            },{
                test: /\.css$/,
                use:ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [CSS_LOADER]
                })
            }
        ]
    },
    "plugins":[
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'simple/index.html',
            template: path.resolve(__dirname,'../demos/simple/index.html'),
            data: {
              lib: ''
            },
            inject: 'body',
            chunks: [].concat(['simple/app']),
        }),
        new ExtractTextPlugin('[name].bundle.css', {
            allChunks: true,
          }),
        new webpack.NamedModulesPlugin(),
        new ProgressBarPlugin(),
    ],
    "entry": {
      "simple/app": [
          path.resolve(__dirname,'../demos/simple/app.js')
      ]
    },
    "output": {
      "path": path.resolve(__dirname,'../build'),
      "publicPath": "/",
      "filename": "[name].js",
      "chunkFilename": "[name].js"
    },
    "devtool": "inline-source-map"
  }