nst path = require('path');
const merge = require('webpack-merge');
const TARGET = process.env.npm_lifecycle_event;
const webpack = require('webpack');

var ExtractTextPlugin = require("extract-text-webpack-plugin");
const precss = require('precss');
const autoprefixer = require('autoprefixer');

const PATHS = {
  app: path.join(__dirname, 'public'),
  build: path.join(__dirname, 'build')
};

const common = {
  entry: {
    app: PATHS.app
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', ['css-loader', 'postcss-loader', 'sass-loader'])
      },
      {
        test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader : 'file-loader'
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
// Include accepts either a path or an array of paths.
        include: PATHS.app
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      {
          test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/, // Include `v=` for Font Awesome support
          loader: 'url?limit=10000&minetype=application/font-woff'
        },
        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, // Include `v=` for Font Awesome support
          loader: 'file'
        }

    ]
  },
  postcss: function() {
    return [autoprefixer, precss];
  },

  sassLoader: {
    includePaths: [path.join(__dirname, 'scss')]
  },

  plugins: [
    new ExtractTextPlugin('styles.css')
  ]
};

//Default configuration
if(TARGET === 'start' || !TARGET){
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      contentBase: PATHS.build,

// Enable history API fallback so HTML5 History API
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,

// Display only errors to reduce the amount of output.
      stats: 'errors-only',

// Parse host and port from env so this is easy to customize.
      host: process.env.HOST,
      port: process.env.PORT
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}

if(TARGET === 'build') {
  module.exports = merge(common, {});
}
