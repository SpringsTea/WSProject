const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const outputDirectory = "dist";

module.exports = {
  entry: "./src/client/js/router.js",
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: "bundle.js",
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
      test: /\.less$/,
      use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader' // translates CSS into CommonJS
        }, {
          loader: 'less-loader', // compiles Less to CSS
          options: {
            javascriptEnabled: true
          }
        }]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'dist/index.html'),
      template: path.resolve(__dirname, "./public/index.html"),
      //favicon: "./public/favicon.ico"
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'dist/deck.mustache'),
      template: path.resolve(__dirname, "./public/deck.mustache"),
      //favicon: "./public/favicon.ico"
    })
  ],
  resolve: {
    alias: {
      Actions: path.resolve(__dirname, 'src/client/js/actions'),
      Utils: path.resolve(__dirname, 'src/client/js/utils'),
      Constants: path.resolve(__dirname, 'src/client/js/constants')
    }
  }
}