webpack = require('webpack');
module.exports = {
  // context: __dirname + "/src/js",
  entry: './src/js/app.jsx',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  devtool: "eval",
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.jsx$/, loader: 'jsx-loader' }, // loaders can take parameters as a querystring
      {
        test: /\.scss$/,
        // loader: "style-loader!css-loader!sass-loader?outputStyle=expanded&includePaths[]="
        loader: "style!css!sass?"
      },
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      }
    })
  ]
};
