/* eslint-disable no-undef */
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

const PATHS = {
  assets: "assets",
  dist: path.resolve(__dirname, "../dist"),
  src: path.resolve(__dirname, "../src"),
  components: path.resolve(__dirname, "../src/components"),
  UI: path.resolve(__dirname, "../src/components/UI"),
};

const plugins = [
  new VueLoaderPlugin(),
  new HTMLWebpackPlugin({ template: `${PATHS.src}/index.html` }),
  new CleanWebpackPlugin(),
  // new CopyWebpackPlugin({
  //     patterns: [
  //         // { from: `${PATHS.assets}/img`, to: `${PATHS.assets}/img` },
  //         { from: `${PATHS.assets}/fonts`, to: `${PATHS.assets}/fonts` },
  //     ],
  // }),
];

module.exports = {
  context: PATHS.src,
  entry: {
    project: "./index.js",
  },
  module: {
    rules: [
      {
        exclude: /(node_modules|bower_components)/u,
        test: /\.m?[tj]s$/u,
        use: ["babel-loader"],
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "all",
          enforce: true,
          name: "vendors",
          test: /node_modules/u,
        },
      },
    },
  },
  output: {
    path: PATHS.dist,
  },
  plugins,
  resolve: {
    extensions: [".js"],
    alias: {
      "@": PATHS.src,
      "@components": PATHS.components,
      "@ui": PATHS.UI,
    },
  },
};
