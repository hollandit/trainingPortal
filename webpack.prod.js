const merge = require('webpack-merge'),
    common = require('./webpack.common'),
    webpack = require('webpack');

module.exports = merge(common, {
    devtool: "source-map",
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        }),
    ]
});