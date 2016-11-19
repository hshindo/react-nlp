module.exports = {
  context: __dirname,
  entry: {
    jsx: "./src/index.jsx",
    css: "./src/main.css",
    html: "./src/index.html"
  },

  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },
  module: {
    preLoaders: [
      // { test: /\.jsx?$/, exclude: /node_modules/, loader: "eslint-loader"}
    ],
    loaders: [
      { test: /\.html$/, loader: "file?name=[name].[ext]" },
      { test: /\.css$/, loader: "file?name=[name].[ext]" },
      { test: /\.jsx?$/, exclude: /node_modules/,  loader: "babel" }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  eslint: {
    configFile: './.eslintrc'
  }
};
