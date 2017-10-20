const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.config.js');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')

const ExtractTextPluginConfig = new ExtractTextPlugin('css/main.min.css', {
  allChunks: true
})

module.exports = merge(common, {
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css-loader?modules&minimize!postcss-loader!sass-loader'),
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist/*']),
    new UglifyJSPlugin(),
    ExtractTextPluginConfig
  ]
});
