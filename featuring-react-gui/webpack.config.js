var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {

    entry: {
      app: path.resolve(__dirname, 'src/main.js')
    },

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },

    module: {
      loaders: [
        // Loads ES6 js files.
        // requires: babel-loader, babel-preset-es2015
        {
          test: /\.js$/,
          loader: 'babel',
          exclude: /(node_modules)/,
        }
      ]
    },

    plugins: [
      // This plugin generates an index.html that loads the bundle
      //  under the destination build directory, so we don't have to
      //  manually maintain the index.html file.
      new HtmlWebpackPlugin({chunks: ['app'],
        chunks: ['app'],
        template: 'src/index.tpl.html',
        inject: 'body'
      })
    ]
};
