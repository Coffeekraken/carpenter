const _get = require('lodash/get')
const _set = require('lodash/set')
const _size = require('lodash/size')
const __handlebarsHelpers = require('../views/handlebarHelpers')

module.exports = function styleguideController(req, res) {

	// filter styleguide to display depending on the url
	const path = decodeURIComponent(req.originalUrl.replace('/styleguide/',''))

	const toDisplay = _get(res.locals.allStyleguides, path.replace('/','.'))

	let styleguidesToDisplay = {}

	if (toDisplay) {
		_set(styleguidesToDisplay, path.replace('/','.'), toDisplay)
	} else {
		styleguidesToDisplay = res.locals.allStyleguides
	}

	const allStyleguidesSortedKeys = Object.keys(res.locals.allStyleguides)
	allStyleguidesSortedKeys.sort()


	const viewData = {
		helpers : __handlebarsHelpers,
		request : req,
		title : res.locals.config.title,
		logo : res.locals.config.logo,
		url : req.url,
		packageJson : res.locals.packageJson
	}
	if (res.locals.allStyleguides && _size(res.locals.allStyleguides)) {
		viewData.styleguide = {
			getSortedItems : (path) => {
				const root = _get(res.locals.allStyleguides, path)
				return Object.keys(root).sort()
			},
			all : res.locals.allStyleguides,
			allSortedKeys : allStyleguidesSortedKeys,
			toDisplay : styleguidesToDisplay
		}
	}
	if (_size(res.locals.docThree)) {
		viewData.documentation = {
			three : res.locals.docThree
		}
	}

	// render the page
	res.render('styleguide', viewData)

}
