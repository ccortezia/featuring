var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');


var NODE_ENV = process.env.NODE_ENV;
var API_HOST = process.env.API_HOST || (NODE_ENV == 'development' ? 'http://localhost:8090' : '');


module.exports = {

    entry: {
      app: path.resolve(__dirname, 'src/main.js'),
      test: 'babel!mocha!' + path.resolve(__dirname, 'tests.bundle.js'),
    },

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
        publicPath: '/',
    },

    module: {
      loaders: [
        // Loads ES6 js files.
        // requires: babel-loader, babel-preset-es2015
        {
          test: /\.js$/,
          loader: 'babel',
          exclude: /(node_modules)/,
        },

        // Allow import of css files
        // requires: style-loader, css-loader
        {
          test: /\.css$/,
          loader: 'style!css'
        },

        // Allow import of less files.
        // requires: less, less-loader
        {
          test: /\.less$/,
          loader: 'style!css!less'
        },

        // Causes fonts referenced in stylesheets to be bundled inline.
        // requires: url-loader, file-loader
        {
          test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url?limit=10000&mimetype=application/font-woff"
        },
        {
          test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url?limit=10000&mimetype=application/font-woff"
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url?limit=10000&mimetype=application/octet-stream"
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: "file-loader"
        },
        {
          test: /\.png$/,
          loader: "file-loader"
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url?limit=10000&mimetype=image/svg+xml"
        }
      ]
    },

    plugins: [
      // This plugin instance generates an index.html that loads the bundle
      //  under the destination build directory, so we don't have to
      //  manually maintain the index.html file.
      new HtmlWebpackPlugin({chunks: ['app'],
        chunks: ['app'],
        template: 'src/index.tpl.html',
        inject: 'body',
        title: 'Featuring: todo-mvc nice brother'
      }),
      // This plugin instance generates an test.html that runs the test on
      //  the browser used to open it. Useful to distribute the test suite.
      new HtmlWebpackPlugin({
        chunks: ['test'],
        filename: 'test.html'
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"' + NODE_ENV + '"',
        'process.env.API_HOST': '"' + API_HOST + '"'
      })
    ]
};
