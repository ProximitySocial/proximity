const path = require('path');
const merge = require('webpack-merge');
const TARGET = process.argv[2] ? process.argv[2].toString() : process.env.npm_lifecycle_event;
// console.log(TARGET)
const webpack = require('webpack');
const jsxloader = require('jsx-loader');

var ExtractTextPlugin = require("extract-text-webpack-plugin");
const precss = require('precss');
const autoprefixer = require('autoprefixer');

const PATHS = {
  app: path.join(__dirname, 'public'),
  build: path.join(__dirname, 'build')
};

const common = {
  entry: './public/main.jsx',
  resolve: {extentions: ['', '.js', '.jsx']},
  output: { path: __dirname + '/build', filename: 'bundle.js'},
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: ['babel-loader'],
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}
//
//   postcss: function() {
//     return [autoprefixer, precss];
//   },
//
//   sassLoader: {
//     includePaths: [path.join(__dirname, 'scss')]
//   },
//
//   plugins: [
//     new ExtractTextPlugin('styles.css')
//   ]
// }
//
//
//
// // const common = {
// //   entry: {
// //     app: './public/main.jsx'
// //   },
// //   resolve: {
// //     extensions: ['', '.js', '.jsx']
// //   },
// //   output: {
// //     path: PATHS.build,
// //     filename: 'bundle.js'
// //   },
// //   module: {
// //     loaders: [
// //       // {
// //       //   test: /\.css$/,
// //       //   loaders: ['style', 'css'],
// //       // },
// //       // {
// //       //   test: /\.scss$/,
// //       //   loader: ExtractTextPlugin.extract('style-loader', ['css-loader', 'postcss-loader', 'sass-loader'])
// //       // },
// //       {
// //         test   : /\.html$/,
// //         loader : 'file-loader'
// //       },
// //       {
// //         test: /\.jsx?$/,
// //         loaders: ['babel?cacheDirectory', 'jsx-loader'],
// // // Include accepts either a path or an array of paths.
// //         include: ['./public/components', './public/main.jsx']
// //       }
// //       // ,{
// //       //   test: /\.(jpe?g|png|gif|svg)$/i,
// //       //   loaders: [
// //       //       'file?hash=sha512&digest=hex&name=[hash].[ext]',
// //       //       'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
// //       //   ]
// //       // }
// //     ]
// //   }
// //   // postcss: function() {
// //   //   return [autoprefixer, precss];
// //   // },
//
// //   // sassLoader: {
// //   //   includePaths: [path.join(__dirname, 'scss')]
// //   // },
//
// //   // plugins: [
// //   //   new ExtractTextPlugin('styles.css')
// //   // ]
// // };
//
// //Default configuration
// if(TARGET === 'start' || !TARGET){
//   module.exports = merge(common, {
//     devtool: 'eval-source-map',
//     devServer: {
//       contentBase: PATHS.build,
//
// // Enable history API fallback so HTML5 History API
//       historyApiFallback: true,
//       hot: true,
//       inline: true,
//       progress: true,
//
// // Display only errors to reduce the amount of output.
//       stats: 'errors-only',
//
// // Parse host and port from env so this is easy to customize.
//       host: process.env.HOST,
//       port: process.env.PORT
//     },
//     plugins: [
//       new webpack.HotModuleReplacementPlugin()
//     ]
//   });
// }
//
// if(TARGET === 'build') {
//   module.exports = merge(common, {});
// }
