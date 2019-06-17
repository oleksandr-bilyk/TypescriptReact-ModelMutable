var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require("path");

var config = {
  entry: ["./src/index.tsx"],
  mode: "development",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      }
      // {
      //   test: /\.css$/,
      //   use: [
      //     'style-loader',
      //     {
      //       loader: 'typings-for-css-modules-loader',
      //       options: {
      //         modules: true,
      //         namedExport: true
      //       }
      //     }
      //   ]
      // }
    ]
  }
};

module.exports = config;