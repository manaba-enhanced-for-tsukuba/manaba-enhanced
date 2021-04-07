"use strict"

const merge = require("webpack-merge")
const path = require("path")

const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")
const ZipPlugin = require("zip-webpack-plugin")

const common = require("./webpack.common.js")

const version = require("../package.json").version

const config = merge(common, {
  plugins: [
    new BundleAnalyzerPlugin({ analyzerMode: "static" }),
    new ZipPlugin({
      path: path.resolve(__dirname, "../"),
      filename: `manabaEnhanced-${version}`,
    }),
  ],
})

module.exports = config
