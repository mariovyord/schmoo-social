const path = require("path");
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(
	common, {
	entry: {
		main: "./src/app.js",
		// vendor: "./vendor.js"
	},
	mode: "production",
	output: {
		filename: "[name].[contenthash].bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"]
			},
		]
	},
	optimization: {
		minimizer: [
			// new CssMinimizerPlugin(), /* Can't compile with it for some reason*/
			new TerserPlugin(),
			new HtmlWebpackPlugin({
				template: "./index.html",
				minify: {
					removeAttributeQuotes: true,
					collapseWhitespace: true,
					removeComments: true,
				}
			}),
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
	]
})
