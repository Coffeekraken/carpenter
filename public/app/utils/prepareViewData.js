const _size = require('lodash/size')
const __handlebarsHelpers = require('../views/handlebarHelpers')

module.exports = function prepareViewData(req, res) {

	const viewData = {
		helpers : __handlebarsHelpers,
		request : req,
		title : res.locals.config.title,
		logo : res.locals.config.logo,
		url : req.url,
		packageJson : res.locals.packageJson
	}

	if (res.locals.componentsThree && _size(res.locals.componentsThree)) {
		viewData.components = {
			three: res.locals.componentsThree
		}
	}
	if (res.locals.allStyleguides && _size(res.locals.allStyleguides)) {
		viewData.styleguide = {
			all : res.locals.allStyleguides
		}
	}
	if (_size(res.locals.docThree)) {
		viewData.documentation = {
			three : res.locals.docThree,
			content : null
		}
	}

	return viewData
}
