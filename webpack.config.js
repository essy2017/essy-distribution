'use strict';

var webpack   = require('webpack');
var externals = require('webpack-node-externals');
var path      = require('path');

module.exports = [
  {
    resolve: {
      extensions: ['.js']
    },

    entry: path.join(__dirname, 'index.js'),

    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.js',
      library: '',
      libraryTarget: 'commonjs'
    },

    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: [/node_modules/, /test/],
          loader: 'babel-loader',
          query: {
            presets: ['env', 'stage-1'],
            plugins: ['add-module-exports']
          }
        }
      ]
    },

    externals: [externals()],

    stats: {
      colors: true
    },

    target: 'node'
  }
];
