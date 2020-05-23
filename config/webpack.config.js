'use strict';

const merge = require('webpack-merge');

const common = require('./webpack.common.js');
const PATHS = require('./paths');

// Merge webpack configuration files
const config = merge(common, {
  entry: {
    manaba: PATHS.src + '/manaba.js',
  },
});

module.exports = config;
