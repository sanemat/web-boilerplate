/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const main = ["./src/index.ts"];

module.exports = {
  context: process.cwd(), // to automatically find tsconfig.json
  entry: {
    main: main,
  },
  output: {
    path: path.join(process.cwd(), "dist"),
    filename: "[name].js",
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
      typescript: {
        enabled: true,
        memoryLimit: 4096,
      },
    }),
    new HtmlWebpackPlugin({
      hash: true,
      inject: true,
      template: "src/index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: [{ loader: "ts-loader", options: { transpileOnly: true } }],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
