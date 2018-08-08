const __glob = require('glob-all')
const __path = require('path')
const _get = require('lodash/get');
const _set = require('lodash/set');

module.exports = function docThreeMiddleware(req, res, next) {

	if ( ! res.locals.config.documentation || ! res.locals.config.documentation.files.length) {
		next();
		return;
	}
	let docThree = {};
	docFiles = __glob.sync([].concat(res.locals.config.documentation.files));
	docFiles.forEach((docFilePath, i) => {
		// variables
		const dirname = __path.dirname(docFilePath),
				basename = __path.basename(docFilePath),
				dirnameDot = dirname.replace(/\//g,'.');
		let value = _get(docThree, dirnameDot);
		if (dirnameDot === '.') {
			docThree[basename] = {
				filename : basename,
				name : basename.slice(0, -3),
				dirname,
				path : docFilePath,
				active : req.url.indexOf(docFilePath) !== -1
			};
			return;
		}
		if ( ! value) {
			_set(docThree, dirnameDot, {});
			value = _get(docThree, dirnameDot);
		}
		value[basename] = {
			filename : basename,
			name : basename.slice(0, -3),
			dirname,
			path : docFilePath,
			active : req.url.indexOf(docFilePath) !== -1
		};
	});

	// save in locals to pass to the next middleware
	res.locals.docThree = docThree

	// console.log(docThree);
	next();

}
