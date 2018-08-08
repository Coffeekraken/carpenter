const __carpenterApi = require('../../../dist/index')
const __docblockParser = require('coffeekraken-docblock-parser')
const __renderStyleguideDisplay = require('../styleguide/renderDisplay')
const __marked = require('marked')
const _get = require('lodash/get')
const _set = require('lodash/set')

module.exports = function styleguideMiddleware(req, res, next) {
	let allStyleguides = {}
	if ( ! res.locals.config.styleguide || ! res.locals.config.styleguide.files.length) {
		next()
		return
	}
	// parse dobclock
	const styleguideFiles = [].concat(res.locals.config.styleguide.files).map(function(file) {
		return process.env.PWD + '/' + file
	})
	let styleguideDocBlocksString = __carpenterApi.styleguide.extractFromFile(styleguideFiles)

	const json = __docblockParser({
		tags : {
			'@name' : function(name, args, data) {
				data[name] = __marked(args[0])
			},
			'@body' : function(name, args, data) {
				data[name] = __marked(args[0])
			},
			'@styleguide' : function(name, args, data) {
				data[name] = args[0]
			},
			'@display' : function(name, args, data) {
				data[name] = args[0] || 'default'
			},
			'@color' : function(name, args, data) {
				data[name] = args[0]
			},
			'@font-family' : function(name, args, data) { data[name] = args[0] },
			'@font-style' : function(name, args, data) { data[name] = args[0] },
			'@font-weight' : function(name, args, data) { data[name] = args[0] }
		}
	}).parse(styleguideDocBlocksString)

	// filter styleguide items
	styleguideJson = json.filter((tag) => {
		return (tag.styleguide)
	})
	// group by
	styleguideJson.forEach(function(item) {
		// prepare display
		item._html = __renderStyleguideDisplay(item.display || 'editor', item)
		// split item paths
		const paths = item.styleguide.split('/').map(function(i) {
			return i.trim()
		}).join('.')
		let current = _get(allStyleguides, paths)
		if ( ! current) current = []
		current.push(item)
		_set(allStyleguides, paths, current)
	})

	// save allStyleguides in the res.locals
	res.locals.allStyleguides = allStyleguides

	next()
}
