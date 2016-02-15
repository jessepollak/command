import fs from "fs";
import path from "path"
import { execSync } from "child_process";
import webpack from 'webpack';
import _ from 'lodash';
import * as Remove from '../util/remove'
import * as paths from '../paths'
import ManifestPlugin from '../manifest/plugin'

// NOTE Style preprocessors
// If you want to use any of style preprocessor, add related npm package + loader and uncomment following line
var styleLoaders = {
  'css': '',
  // 'less': '!less-loader',
  'scss|sass': '!sass-loader',
  // 'styl': '!stylus-loader'
};

function makeStyleLoaders() {
  return Object.keys(styleLoaders).map(function(ext) {
    // NOTE Enable autoprefixer loader
    var prefix = 'css-loader?modules&sourceMap'//!autoprefixer-loader?browsers=last 2 version';
    var extLoaders = prefix + styleLoaders[ext];
    var loader = 'style-loader!' + extLoaders;

    return {
      loader: loader,
      test: new RegExp('\\.(' + ext + ')$'),
      exclude: /node_modules/
    };
  });
}

function configGenerator(Manifest) {

  var isDevelopment = process.env.NODE_ENV != "production"

  return {
    ///// Lowlevel config
    cache: isDevelopment,
    debug: isDevelopment,
    devtool: isDevelopment ? 'cheap-module-eval-source-map' : '',
    context: __dirname,
    node: {__dirname: true},

    ///// App config

    // Entry points in your app
    // There we use scripts from your manifest.json
    entry: {},

    // Output
    output: (function() {
      var output = {
        path: paths.build,
        filename: '[name].js'
      }

      if(isDevelopment) {
        output.chunkFilename = '[name]-[chunkhash].js'
        output.publicPath = 'https://localhost:3001/'
      }

      return output
    })(),

    // Plugins
    plugins: (function() {
      let plugins = [
        new webpack.optimize.OccurenceOrderPlugin(),
        new ManifestPlugin(Manifest),
        new webpack.DefinePlugin({
          "global.GENTLY": false,
          "process.env": {
            NODE_ENV: JSON.stringify(isDevelopment ? 'development' : 'production'),
            IS_BROWSER: true
          }
        })
      ];

      if(isDevelopment) {
        // Development plugins for hot reload
        plugins = plugins.concat([
          // NotifyPlugin,
          new webpack.HotModuleReplacementPlugin(),
          // Tell reloader to not reload if there is an error.
          new webpack.NoErrorsPlugin()
        ])
      } else {
        // Production plugins for optimizing code
        plugins = plugins.concat([
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              // Because uglify reports so many irrelevant warnings.
              warnings: false
            }
          }),
          new webpack.optimize.DedupePlugin(),
          // new webpack.optimize.LimitChunkCountPlugin({maxChunks: 15}),
          // new webpack.optimize.MinChunkSizePlugin({minChunkSize: 10000}),
          function() {
            this.plugin("done", function(stats) {
              if (stats.compilation.errors && stats.compilation.errors.length) {
                console.log(stats.compilation.errors)
                process.exit(1)
              }
            })
          }
        ])
      }

      // NOTE Custom plugins
      // if you need to exclude anything pro loading
      // plugins.push(new webpack.IgnorePlugin(/^(vertx|somethingelse)$/))

      return plugins;
    })(),

    // NOTE Override external requires
    // If you need to change value of required (imported) module
    // for example if you dont want any module import 'net' for various reason like code only for non browser envirinment
    externals: {
      // net: function() {}
    },

    resolve: {
      extensions: [
        '',
        '.js',
        '.jsx',
        '.json'
      ],

      // NOTE where webpack resolve modules
      modulesDirectories: [
        'src',
        'node_modules'
      ],

      root: [
        path.join(__dirname, "../src")
      ],

      // NOTE Aliasing
      // If you want to override some path with another. Good for importing same version of React across different libraries
      alias: {
        // "react$": require.resolve(path.join(__dirname, '../../node_modules/react'))
      }
    },

    // Loaders
    module: {
      loaders: (function() {
        var loaders = []

        // Assets

        // Inline all assets with base64 into javascripts
        // TODO make and test requiring assets with url
        loaders = loaders.concat([
          {
            test: /\.(png|jpg|jpeg|gif|svg)/,
            loader: "url-loader?limit=1000000&name=[name]-[hash].[ext]",
            exclude: /node_modules/
          },
          {
            test: /\.(woff|woff2)/,
            loader: "url-loader?limit=1000000&name=[name]-[hash].[ext]",
            exclude: /node_modules/
          },
          {
            test: /\.(ttf|eot)/,
            loader: "url-loader?limit=1000000?name=[name]-[hash].[ext]",
            exclude: /node_modules/
          }
        ])

        // Styles
        loaders = loaders.concat(makeStyleLoaders())

        // Scripts
        loaders = loaders.concat([
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: "babel-loader"
          }
        ])

        loaders = loaders.concat([
        {
          test: /textarea\-helper\/.+\.(jsx|js)$/,
          loader: 'imports?jQuery=jquery,$=jquery,this=>window'
        }
        ])

        // Json
        loaders = loaders.concat([
          {
            test: /\.json/,
            exclude: /node_modules/,
            loader: "json-loader"
          }
        ])

        // NOTE Custom loaders
        // loaders = loaders.concat([...])

        return loaders
      })()
    }
  }
}

module.exports = configGenerator
