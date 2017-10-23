const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
})



module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'js/index_bundle.js'
  },
  module: {
    loaders: [{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg|otf)(\?.*$|$)/,
        loader: [{
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
            outputPath: './',
            publicPath: '../'
          }
        }]

      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader'
        ]
      },


    ]
  },
  plugins: [

    HtmlWebpackPluginConfig

  ]

}
