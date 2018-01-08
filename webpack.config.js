const path = require('path');

module.exports = {
    entry: "./js/AuthForm.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname + "public/src")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    }
};