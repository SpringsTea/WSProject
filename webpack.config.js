const path = require("path");
const crypto = require('crypto');
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const outputDirectory = "dist";
const theme = {
  'layout-header-height': '44px',
  'layout-header-background': '#5f5f5f',
  'layout-header-color': '#f1f1f1',
  'layout-trigger-height': '44px',
  'layout-header-padding': '0'
}

const crypto_orig_createHash = crypto.createHash;
crypto.createHash = algorithm => crypto_orig_createHash(algorithm == "md4" ? "sha256" : algorithm);

module.exports = {
  entry: {
    builder: "./src/client/js/builderRouter.js",
    deckview: "./src/client/js/deckviewRouter.js",
    descksearch: "./src/client/js/decksearchRouter.js",
    login: "./src/client/js/loginRouter.js",
    user: "./src/client/js/userRouter.js",
    translations: "./src/client/js/translationsRouter.js",
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
    }
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
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [{
            loader: 'file-loader',
        }]
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
            lessOptions: {
              modifyVars: theme,
              javascriptEnabled: true,
            },
          },
        }]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      'React': 'react',
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'dist/header.mustache'),
      template: path.resolve(__dirname, "./public/header.mustache"),
    }),
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
      filename: path.resolve(__dirname, 'dist/user.mustache'),
      template: path.resolve(__dirname, "./public/user.mustache"),
      chunks: ['user', 'commons'],
      favicon: "./public/favicon.ico"
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'dist/translations.mustache'),
      template: path.resolve(__dirname, "./public/translations.mustache"),
      chunks: ['translations', 'commons'],
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
      Constants: path.resolve(__dirname, 'src/client/js/constants'),
      Components: path.resolve(__dirname, 'src/client/js/components'),
      Partials: path.resolve(__dirname, 'src/client/js/components/partials'),
      Stores: path.resolve(__dirname, 'src/client/js/stores'),
      Public: path.resolve(__dirname, 'public'),
    }
  }
}