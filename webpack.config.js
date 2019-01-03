const path = require('path');

module.exports = {
	mode: "development",
	entry: './common/src/app.ts',
	module: {
		rules: [
			{
				loader: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: [ '.tsx', '.ts', '.js' ]
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: "/dist/",
		filename: 'app.js'
	},
	node: {
	fs: 'empty'
	},
	devServer: {
		contentBase: path.resolve(__dirname, "./"),
		watchContentBase: true,
		compress: true,
		port: 8888
	},
};