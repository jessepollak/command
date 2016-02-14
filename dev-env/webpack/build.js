'use strict';

var webpack = require('webpack');

module.exports = function(webpackConfig) {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig, function(fatalError, stats) {
      var jsonStats = stats.toJson();

      // We can save jsonStats to be analyzed with
      // http://webpack.github.io/analyse or
      // https://github.com/robertknight/webpack-bundle-size-analyzer.
      // var fs = require('fs');
      // fs.writeFileSync('./bundle-stats.json', JSON.stringify(jsonStats));

      var buildError = fatalError || jsonStats.errors[0] || jsonStats.warnings[0];

      if (buildError) {
        reject(buildError)
      } else {
        resolve(jsonStats)
      }
    })
  })
}
