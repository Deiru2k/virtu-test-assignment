const path        = require('path');
const express     = require('express');
const webpack     = require('webpack');
const config      = require('./webpack.config.dev');

const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: false,
  publicPath: config.output.publicPath,
  contentBase: './src',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.listen(process.env.PORT, '0.0.0.0', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:%s', process.env.PORT);
});
