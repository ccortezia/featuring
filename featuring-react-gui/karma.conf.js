
module.exports = function (config) {

  config.set({
    browsers: ['Chrome'],
    frameworks: ['mocha'],
    preprocessors: {'tests.bundle.js': ['webpack']},
    reporters: ['dots'],
    singleRun: true,

    // Dynamic webpack bundler .
    files: ['tests.bundle.js'],

    plugins: [
      'karma-chrome-launcher',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack',
    ],

    webpack: {
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
          },
          {
            test: /\.css$/,
            loader: 'style!css'
          },
          {
            test: /\.less$/,
            loader: 'style!css!less'
          },
          {
            test: /\.(eot|ttf|otf|woff)$/,
            loader: 'url?limit=100000'
          }
        ]
      }
    },
    webpackMiddleware: {
      noInfo: true,
    }
  });
};
