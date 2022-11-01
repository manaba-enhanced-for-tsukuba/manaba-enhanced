"use strict"

const CopyWebpackPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const path = require("path")
const ZipPlugin = require("zip-webpack-plugin")

process.traceDeprecation = true

const nodeEnv = process.env.NODE_ENV
const browserEnv = process.env.BROWSER_ENV

const version = require("./package.json").version
const manifestJson = require("./src/manifest.ts")

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: nodeEnv === "development" ? "development" : "production",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
  },
  entry: {
    contentScript: path.resolve(__dirname, "src", "contentScript.ts"),
    background: path.resolve(__dirname, "src", "background.ts"),
    options: path.resolve(__dirname, "src", "options.ts"),
  },
  stats: {
    all: false,
    errors: true,
    builtAt: true,
  },
  devtool: nodeEnv === "development" ? "source-map" : false,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        exclude: /options\.scss$/,
        use: ["css-loader", "sass-loader"],
      },
      {
        test: /options\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images",
              name: "[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "**/*",
          context: "public",
        },
        {
          from: "package.json", // dummy
          to: "manifest.json",
          transform: () => manifestJson,
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    ...(nodeEnv === "production"
      ? [
          new ZipPlugin({
            path: path.resolve(__dirname, "./packaged"),
            filename: `manabaEnhanced-${version}-${
              browserEnv === "firefox" ? "firefox" : "chrome"
            }`,
          }),
        ]
      : []),
  ],
}
