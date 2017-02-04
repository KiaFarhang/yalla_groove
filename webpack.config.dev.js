var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    devtool: 'cheap-eval-source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/dev-server',
        './src/index.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "bundle.js"
    },
    watch: true,
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
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
    devServer: {
        contentBase: './dist',
        hot: true
    }
};
