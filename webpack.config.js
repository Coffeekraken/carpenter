module.exports = {
	mode: 'development',
	entry: {
		'public/assets/js/app.js' : './public/assets-src/js/app.js'
	},
	output: {
		path: require('path').resolve('.'),
		filename: '[name]',
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /(bower_components|node_modules)/,
			loader: 'babel-loader'
		}]
	},
	resolve: {
		alias : {
			// 'coffeekraken-s-interactive-demo-component' : '/Users/olivierbossel/data/web/coffeekraken/s-interactive-demo-component/dist/index.js'
			// 'coffeekraken-s-custom-scrollbar-component' : '/Users/olivierbossel/data/web/coffeekraken/s-custom-scrollbar-component/dist/index.js'
			// 'coffeekraken-s-activate-component' : '/Users/olivierbossel/data/web/coffeekraken/s-activate-component/dist/index.js'
		}
	},
	devtool: 'source-map'
}
