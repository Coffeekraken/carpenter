const __glob = require('glob-all')
const __path = require('path')
const _get = require('lodash/get');
const _set = require('lodash/set');

module.exports = function componentsMiddleware(req, res, next) {

	if ( ! res.locals.config.components || ! res.locals.config.components.files.length) {
		next();
		return;
	}

	const componentsFiles = [].concat(res.locals.config.components.files).map(function(file) {
		return process.env.PWD + '/' + res.locals.config.components.viewsRootPath + '/' + file
	})

	const files = __glob.sync(componentsFiles).map((file) => {
		return __path.resolve(file
					 .replace(process.env.PWD, '')
					 .replace(res.locals.config.components.viewsRootPath, '')
			   ).replace(/^\//,'')
	})

	const splitedFiles = files.map((file) => {
		return file.split('/')
	})

	const finalThree = {}
	// work with an array like so:
	// [['atoms','button','button.blade.php']]
	splitedFiles.forEach((file) => {
		if ( ! finalThree[file[0]]) {
			finalThree[file[0]] = {}
		}
		finalThree[file[0]][file[1]] = {
			path: file.join('/'),
			dirname: __path.dirname(file.join('/'))
		}
	})

	// save in locals to pass to the next middleware
	res.locals.componentsThree = finalThree

	// console.log(docThree);
	next();

}
