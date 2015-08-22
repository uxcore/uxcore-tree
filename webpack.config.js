/**
 * @author: vincent
 * @date: 15/5/19
 */
var webpack = require('webpack');
var loaders = require('./loader.config');

module.exports = {
    entry: {
        index: './example/index.jsx'
    },
    output: {
        publicPath: '/example',
        filename: '[name].bundle.js',
        chunkFilename: '[name].[id].bundle.js'
    },
    module: {
        loaders: loaders
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            'react': 'react/dist/react.js'
        }
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vender',
            filename: 'vender.js'
        })
    ],
    debug: true,
    devtool: 'eval',
    devServer: {
        info: true,
        quiet: false,

        stats: {
            colors: true,
            progress: true
        }
    }
};
