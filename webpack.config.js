const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

var config  = {

	context: path.resolve(__dirname, 'src'),

	entry: {
		app:'./ts/index.ts',

	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.html$/,
				use: ['html-loader'],
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},
	output: {
		filename: 'js/[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins:[
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			template: 'index-template.html',
			filename: 'index.html'
		}),
		new MiniCssExtractPlugin({
			filename: './css/styles.css'
		}),
		new webpack.ProvidePlugin({
			$: 'jquery/src/jquery',
			jquery: 'jquery/src/jquery'
		})
	],
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 3001
	}
};

module.exports = (env, argv) => {
	if (argv.mode === 'development') {
		config.devtool = 'inline-source-map';
	}

	if (argv.mode === 'production') {
		config.plugins = [
			new CleanWebpackPlugin(['dist']),
			new HtmlWebpackPlugin({
				template: 'index-template.html',
				filename: 'index.html'
			}),
			new MiniCssExtractPlugin({
				filename: './css/styles.[hash].css'
			})
		];
	}

	return config;
};