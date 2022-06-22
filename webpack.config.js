const path = require('path');
// @ts-ignore
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
	mode: 'development',
	entry: './index.js',
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					// 将 CSS 转化成 CommonJS 模块
					'css-loader',
				],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					{ loader: 'css-loader', options: { importLoaders: 1 } },
					// 将 CSS 转化成 CommonJS 模块
					'postcss-loader',
					// 将 Sass 编译成 CSS
					'sass-loader',
				],
			},
		],
	},
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
        ],
    },
    watchOptions: {
        ignored: /node_modules/,
        // 监听到变化发生后会等 300ms 再去执行，默认 300ms
        aggregateTimeout: 300,
        // 判断文件是否发生变化是通过不停询问系统指定文件有没有变化实现的，默认每秒问 1000 次
        poll: 10
    },
	plugins: [
        new MiniCssExtractPlugin({
			filename: 'beer.css',
		}),
	],
	devServer: {
		contentBase: './',
		host: '0.0.0.0',
		compress: true,
		port: 9000,
		open: false,
		writeToDisk: true,
		stats: 'errors-only',
	},
};
