const __fs = require('fs')
const __marked = require('marked')
const __handlebarsHelpers = require('../views/handlebarHelpers')
const _size = require('lodash/size')

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
				all : res.locals.allStyleguides
			}
		}
		if (_size(res.locals.docThree)) {
			viewData.documentation = {
				three : res.locals.docThree,
				content : markdown
			}
		}

		// render the page
		res.render('documentation', viewData)

}
