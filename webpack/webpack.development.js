/* eslint-disable no-undef */
const path = require("path");

const PATHS = {
  assets: "assets",
  src: path.resolve(__dirname, "../src"),
};
const webpack = require("webpack");

const filename = (extension) => {
  return `[name]${extension}`;
};

const plugins = [
  new webpack.SourceMapDevToolPlugin({ filename: "[file].map" }),
];

module.exports = {
  devServer: {
    historyApiFallback: true,
    host: "localhost",
    hot: true,
    port: 8_281,
  },
  devtool: "eval-cheap-module-source-map",
  mode: "development",
  module: {
    rules: [
      {
        generator: { filename: `${PATHS.assets}/img/${filename("[ext]")}` },
        test: /\.(png|jpe?g|gif|svg)$/iu,
      },
      {
        dependency: { not: ["url"] },
        test: /\.(s[ac]|c)ss$/iu,
        use: [
          {
            loader: "style-loader",
          },
          "css-loader",
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              additionalData: "@import 'variables';",
              sassOptions: {
                includePaths: [`${PATHS.src}/sass`],
              },
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: filename(".js"),
    publicPath: process.env.SERV ? "/" : "",
  },
  plugins,
  target: "web",
};
