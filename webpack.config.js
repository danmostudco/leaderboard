const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const path = require('path');
module.exports = {
    entry: {
        app: path.resolve(__dirname, './src/index.js'),
        vendor: ['react', 'react-dom']
        },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'app.bundle.js',
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.bundle.js'})
    ],
    devtool: 'sourcemap',
    devServer: {
        port: 8000,
        contentBase: 'dist' // where static files other than the bundles reside, will need to access 8000/app.html
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'env', 'stage-2']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                    }, {
                    loader: "css-loader" // translates CSS into CommonJS
                    }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            }
        ]
    }
};