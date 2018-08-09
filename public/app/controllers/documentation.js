const __fs = require('fs')
const __marked = require('marked')
const __handlebarsHelpers = require('../views/handlebarHelpers')
const _size = require('lodash/size')
const __prepareViewData = require('../utils/prepareViewData')

module.exports = function documentationController(req, res) {

	const docFilePath = req.url.replace(/^\/documentation\//,'')

		// read the markdown content
		let content = __fs.readFileSync(docFilePath,'utf8')

		const renderer = new __marked.Renderer()
		renderer.image = function(href, title, text) {
			return `
				<img tabindex="0" src="${href}" title="${title}" alt="${text}" />
				<img src="${href}" title="${title}" alt="${text}" class="img-fullscreen" />
			`
		}
		let markdown = __marked(content, {
			renderer
		})

		const viewData = __prepareViewData(req, res)

		// add the current documentation content to the viewData
		viewData.documentation.content = markdown

		// render the page
		res.render('documentation', viewData)

}
