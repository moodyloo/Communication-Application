module.exports = {
  entry: './_src/index.js',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  node: {
    fs: 'empty',
    tls: 'empty',
    net: 'empty',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
    ]
  }
};
