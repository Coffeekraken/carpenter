const __glob = require('glob-all')
const __fs = require('fs')
const __path = require('path')
const _get = require('lodash/get')
const _set = require('lodash/set')
const Handlebars = require('handlebars')

Handlebars.registerHelper("debug", function(optionalValue) {
	console.log("Current Context");
	console.log("====================");
	console.log(this);

	if (optionalValue) {
	  console.log("Value");
	  console.log("====================");
	  console.log(optionalValue);
	}
  });

module.exports = function componentsMiddleware(req, res, next) {

	const componentsFiles = ['*/*/*.{blade.php,twig}'].map(function(file) {
		return __path.resolve(res.locals.config.components.viewsRootPath + '/' + file)
	})

	let files = __glob.sync(componentsFiles).map((file) => {
		const p = __path.resolve(file
						 .replace(process.env.PWD, '')
						 .replace(res.locals.config.components.viewsRootPath, '')
			   ).replace(/^\//,'')
		return p
	})


	files = files.filter((file) => {
		const splits = file.split('/')
		const basename = splits.pop()
		const pathname = splits[splits.length-1]
		const absoluteFilePath = __path.resolve(
			res.locals.config.components.viewsRootPath,
			splits.join('/'),
			pathname + '.data.js'
		)
		if ( ! __fs.existsSync(absoluteFilePath)) return false
		return true
	})

	const splitedFiles = files.map((file) => {
		return file.split('/')
	})

	const finalThree = {}
	// work with an array like so:
	// [['atoms','button','button.blade.php']]
	splitedFiles.forEach((file) => {

		const absoluteFilePath = __path.resolve(
			res.locals.config.components.viewsRootPath + '/' + file[0] + '/' + file[1] + '/' + file[1]
		)

		// console.log(absoluteFilePath)

		let metas = {}
		if (__fs.existsSync(absoluteFilePath + '.metas.js')) {
			metas = require(absoluteFilePath + '.metas.js')
		}

		if ( ! finalThree[file[0]]) {
			finalThree[file[0]] = {}
		}
		finalThree[file[0]][file[1]] = {
			path: file.join('/'),
			dirname: __path.dirname(file.join('/')),
			metas
		}
	})

	// save in locals to pass to the next middleware
	res.locals.componentsThree = finalThree

	// console.log(docThree);
	next();

}
