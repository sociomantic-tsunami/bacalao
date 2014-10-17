module.exports = {
  // context: __dirname + "/src/js",
  entry: './src/js/app.js',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.js$/, loader: 'jsx-loader' }, // loaders can take parameters as a querystring
      {
        test: /\.scss$/,
        // loader: "style-loader!css-loader!sass-loader?outputStyle=expanded&includePaths[]="
        loaders: ["style", "css", "sass"]
            // + (path.resolve(__dirname, './bower_components/bootstrap-sass-official'))
      },
    ]
  }
};
