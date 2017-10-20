 const merge = require('webpack-merge');
 const common = require('./webpack.common.config.js');
 const ExtractTextPlugin = require('extract-text-webpack-plugin')
 const autoprefixer = require('autoprefixer')

 const ExtractTextPluginConfig = new ExtractTextPlugin('css/main.css', {
   allChunks: true
 })

 module.exports = merge(common, {
   devtool: 'inline-source-map',
   devServer: {
     contentBase: './dist'
   },
   module: {
     loaders: [
       {
         test: /\.scss$/,
         loader: ExtractTextPlugin.extract('css-loader?modules!postcss-loader!sass-loader'),
         exclude: /node_modules/
       }
     ]
   },
   plugins: [
     ExtractTextPluginConfig
   ]
 });
