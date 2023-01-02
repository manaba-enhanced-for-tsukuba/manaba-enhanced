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
    "contentScript/main": path.resolve(
      __dirname,
      "src",
      "contentScript",
      "main.ts"
    ),
    "contentScript/reportTemplate": path.resolve(
      __dirname,
      "src",
      "contentScript",
      "reportTemplate.ts"
    ),
    "contentScript/showRelativeGradesPosition": path.resolve(
      __dirname,
      "src",
      "contentScript",
      "showRelativeGradesPosition.ts"
    ),
    "contentScript/unsubmittedAssignmentsOnHome": path.resolve(
      __dirname,
      "src",
      "contentScript",
      "unsubmittedAssignmentsOnHome.ts"
    ),
    background: path.resolve(__dirname, "src", "background.ts"),
    options: path.resolve(__dirname, "src", "optionsPage", "index.tsx"),
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
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        exclude: [/\.module\.scss$/, /options\.scss$/],
        use: ["css-loader", "sass-loader"],
      },
      {
        test: [/\.module\.scss$/, /options\.scss$/],
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
    extensions: [".js", ".ts", ".tsx"],
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
