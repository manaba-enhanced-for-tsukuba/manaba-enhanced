"use strict"

const merge = require("webpack-merge")

const common = require("./webpack.common.js")
const PATHS = require("./paths")

// Merge webpack configuration files
const config = merge(common, {
  entry: {
    manabaDocumentStart: PATHS.src + "/manabaDocumentStart.js",
    manabaDocumentEnd: PATHS.src + "/manabaDocumentEnd.js",
    listenShortcuts: PATHS.src + "/listenShortcuts.js",
    background: PATHS.src + "/background.js",
    options: PATHS.src + "/options.js",
  },
})

module.exports = config
