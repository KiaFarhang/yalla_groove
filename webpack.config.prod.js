var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: ['./src/index.js'],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "bundle.js"
    },
    watch: true,
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            compress: {
                unused: true,
                dead_code: true,
                warnings: false,
                drop_console: true
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new HtmlWebpackPlugin({
        	template: './src/index.html'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ],
    module: {
        loaders: [{
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            }, {
                test: /\.html$/,
                loader: "raw-loader"
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }, {
                test: /\.(jpg|png)$/,
                loader: 'file-loader'
            },
            { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/, loader: 'file-loader' }
        ]
    },
};
