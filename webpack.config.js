const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

const dist = path.resolve(__dirname, 'dist');

module.exports = {
    mode: 'development',
    entry: {
        main: [
            './src/dom.js'
        ]
    },
    output: {
        filename: '[name].js',
        path: dist
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
        new CopyPlugin({
            patterns: [
                {from: path.resolve(__dirname, 'src/index.html'), to: dist}
            ]
        })
    ]
};