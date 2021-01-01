"use strict"

const merge = require("webpack-merge")

const common = require("./webpack.common.js")

const config = merge(common, {})

module.exports = config
