const path = require('path')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')

const dist = path.resolve(__dirname, 'docs')

module.exports = {
  mode: 'development',
  entry: './src/dom.js',
  output: {
    filename: 'main.js',
    path: dist
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/env',
            '@babel/preset-react'
          ]
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src/index.html'), to: dist }
      ]
    })
  ]
}
