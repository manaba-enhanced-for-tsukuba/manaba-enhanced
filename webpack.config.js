"use strict"

const path = require("path")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const ZipPlugin = require("zip-webpack-plugin")

process.traceDeprecation = true

const nodeEnv = process.env.NODE_ENV

const manifestJson = require("./src/manifest.ts")
const version = require("./package.json").version

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: nodeEnv === "development" ? "development" : "production",
  output: {
    path: path.resolve(__dirname, "./build"),
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
        test: /\.sass$/,
        exclude: /options\.sass$/,
        use: ["css-loader", "sass-loader"],
      },
      {
        test: /options\.sass$/,
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
            path: path.resolve(__dirname, "./build"),
            filename: `manabaEnhanced-${version}`,
          }),
        ]
      : []),
  ],
}
