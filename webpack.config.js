/* eslint-disable no-undef */
const path = require("path");

module.exports = {
	entry: __dirname + "/public/js/AuthForm.js",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname + "/public/client")
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