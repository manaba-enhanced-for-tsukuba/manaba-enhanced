"use strict"

const path = require("path")
const merge = require("webpack-merge")
const glob = require("glob")

const common = require("./webpack.common.js")

const entries = glob.sync("./src/*.js").reduce((acc, cur) => {
  const key = path.basename(cur, ".js")
  acc[key] = cur
  return acc
}, {})

// Merge webpack configuration files
const config = merge(common, {
  entry: entries,
})

module.exports = config
