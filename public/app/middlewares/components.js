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

	if ( ! res.locals.config.components || ! res.locals.config.components.files.length) {
		next();
		return;
	}

	const componentsFiles = [].concat(res.locals.config.components.files).map(function(file) {
		return __path.resolve(res.locals.config.components.viewsRootPath + '/' + file)
	})

	const files = __glob.sync(componentsFiles).map((file) => {
		const p = __path.resolve(file
						 .replace(process.env.PWD, '')
						 .replace(res.locals.config.components.viewsRootPath, '')
			   ).replace(/^\//,'')
		return p
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
