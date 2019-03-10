const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const outputDirectory = "dist";

module.exports = {
  entry: {
    builder: "./src/client/js/builderRouter.js",
    deckview: "./src/client/js/deckviewRouter.js",
    descksearch: "./src/client/js/decksearchRouter.js",
    login: "./src/client/js/loginRouter.js",
    pagenotfound: "./src/client/js/pagenotfoundRouter.js",
  },  
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: "[name].js",
    chunkFilename:'[name].[chunkhash].js',
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
        cacheGroups: {
            commons: {
                name: "commons",
                chunks: "initial",
                minChunks: 2,
                minSize: 0
            }
        }
    },
    occurrenceOrder: true
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
    new webpack.ProvidePlugin({
      'React': 'react',
    }),
    new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: path.resolve(__dirname, 'dist/builder.mustache'),
      template: path.resolve(__dirname, "./public/builder.mustache"),
      chunks: ['builder', 'commons'],
      favicon: "./public/favicon.ico"
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: path.resolve(__dirname, 'dist/deck.mustache'),
      template: path.resolve(__dirname, "./public/deck.mustache"),
      chunks: ['deckview', 'commons'],
      favicon: "./public/favicon.ico"
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'dist/decksearch.mustache'),
      template: path.resolve(__dirname, "./public/decksearch.mustache"),
      chunks: ['descksearch', 'commons'],
      favicon: "./public/favicon.ico"
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'dist/login.mustache'),
      template: path.resolve(__dirname, "./public/login.mustache"),
      chunks: ['login', 'commons'],
      favicon: "./public/favicon.ico"
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'dist/pagenotfound.mustache'),
      template: path.resolve(__dirname, "./public/pagenotfound.mustache"),
      chunks: ['pagenotfound', 'commons'],
      favicon: "./public/favicon.ico"
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