const webpack = require("webpack");
const path = require("path");


const config = {
	entry: [
	"./src/components/app.js"
	],
	module:{
		rules:[
		{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			use: {
				loader: "babel-loader"
			},
		},
		]
	},
	resolve: {
		extensions:["*", ".js", ".jsx"]
	},
	output: {
		path: path.resolve(__dirname + "/dist"),
		publicPath: "/",
		filename: "bundle.js"
	},
	watch: true,
};
module.exports = config;