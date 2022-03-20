const path = require("path");
const common = require('./webpack.common');
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
	entry: {
		main: "./src/app.js",
		// vendor: "./vendor.js"
	},
	mode: "development",
	devServer: {
		historyApiFallback: true,
	},
	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, "../dist"),
	},
	plugins: [new HtmlWebpackPlugin({
		template: "./index.html"
	})],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			},
		]
	}
}
)
