const _get = require('lodash/get')
const _set = require('lodash/set')
const _size = require('lodash/size')
const __handlebarsHelpers = require('../views/handlebarHelpers')
const __prepareViewData = require('../utils/prepareViewData')

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

	const viewData = __prepareViewData(req, res);

	if (res.locals.allStyleguides && _size(res.locals.allStyleguides)) {
		viewData.styleguide.toDisplay = styleguidesToDisplay
	}

	// render the page
	res.render('styleguide', viewData)

}
