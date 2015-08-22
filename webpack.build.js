/**
 * @author: vincent
 * @date: 15/5/19
 */
var webpack = require('webpack');
var loaders = require('./loader.config');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './example/index.jsx'
    },
    output: {
		path: './build',
        publicPath: '/',
        filename: '[name].bundle.js',
        chunkFilename: '[name].[id].bundle.js'
    },
	plugins:
        ['index'].map(function(name){
			return new HtmlWebpackPlugin({
				filename: name + '.html',
	      		template: './example/' + name + '.html'
			});
		}).concat([
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vender',
                filename: 'vender.js'
            })
        ]),

    module: {
        loaders: loaders
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            'react': 'react/dist/react.min.js'
        }
    },
    debug: false,
    devtool: 'cheap-module-eval-source-map'
};
