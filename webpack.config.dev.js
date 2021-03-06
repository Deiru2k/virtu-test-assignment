const webpack = require('webpack');
const path    = require('path');

const config = {
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, 'src'),
  ],
  output: {
    path: path.join(__dirname, 'src'),
    filename: 'app.js',
    publicPath: '/',
  },
  module: {
    noParse: ['node_modules/react'],
    loaders: [
      { test: /(.js|.jsx)/, exclude: /node_modules/, loaders: ['babel?cacheDirectory=true'] },
      { test: /src\/assets\/icons\/[^\.]+\.svg/, loader: 'svg-sprite!svgo?useConfig=svgoIcons' },
      { test: /\.css/, loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss' },
    ],
  },
  resolve: {
    root: path.join(__dirname, 'src'),
    extensions: ['', '.js', '.json', '.jsx', '.css', '.svg'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
  ],
  postcss: [
    require('postcss-import'),
    require('postcss-sassy-mixins'),
    require('postcss-for'),
    require('postcss-conditionals'),
    require('postcss-simple-vars'),
    require('postcss-color-function'),
    require('postcss-mathjs'),
    require('postcss-nested'),
    require('autoprefixer')({ browsers: ['last 2 versions'] }),
  ],
  svgoIcons: {
    plugins: [
      {
        removeAttrs: {
          attrs: [ 'fill', 'fill-rule' ]
        }
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map',
};

module.exports = config;
