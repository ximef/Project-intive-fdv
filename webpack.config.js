var webpack = require('webpack')

module.exports = {
  entry: ["./src/index.js"],
  output: {
    path: 
      __dirname + '/dist',
      publicPath: '/',
      filename: 'bundle.js'
  },
  devServer: {
    inline: true,
    contentBase: './public',
    port: 3000
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel",
        exclude: "/node_modules",
        query: {
          presets: ["es2015", "react"]
        }
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"],
        exclude: "/node_modules"
      }
    ]
  }
}
