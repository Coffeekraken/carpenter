const __path = require('path')
const __fs = require('fs')
const _get = require('lodash/get')
const _set = require('lodash/set')
const _size = require('lodash/size')
const __handlebarsHelpers = require('../views/handlebarHelpers')
const __prepareViewData = require('../utils/prepareViewData')
const __execPhp = require('exec-php')
const __htmlspecialchars = require('htmlspecialchars')
const __marked = require('marked')

module.exports = function componentsController(req, res) {

	const path = decodeURIComponent(req.originalUrl.replace('/components/',''))

	const absolutePath = __path.resolve(
		process.env.PWD + '/' + res.locals.config.components.viewsRootPath + '/' + path
	)

	// get the folder name
	const dirName = path.split('/').pop()

	// compute the absoluteFileName
	const absoluteFileName = absolutePath + '/' + dirName

	// viewPath
	const viewPath = __path.resolve(
		absoluteFileName.replace(process.env.PWD, '')
						.replace(res.locals.config.components.viewsRootPath, '')
	).substr(1)

	// try to get the view file
	let viewFilePath
	if (__fs.existsSync(absoluteFileName + '.blade.php')) {
		viewFilePath = absoluteFileName + '.blade.php'
	} else if (__fs.existsSync(absoluteFileName + '.twig')) {
		viewFilePath = absoluteFileName + '.twig'
	}

	// check if a readme exist
	let readmeFilePath
	if (__fs.existsSync(absoluteFileName + '.md')) {
		readmeFilePath = absoluteFileName + '.md'
	}

	// check if a data file exist
	let dataFilePath
	if (__fs.existsSync(absoluteFileName + '.data.json')) {
		dataFilePath = absoluteFileName + '.data.json'
	}

	// preparing viewData
	const viewData = __prepareViewData(req, res)

	// title
	viewData.components.title = dirName

	// set some viewData
	if (viewFilePath) {
		viewData.components.viewContent = __fs.readFileSync(viewFilePath, 'utf8')
	}
	if (readmeFilePath) {
		// compile markdown to html
		const renderer = new __marked.Renderer()
		renderer.image = function(href, title, text) {
			return `
				<img tabindex="0" src="${href}" title="${title}" alt="${text}" />
				<img src="${href}" title="${title}" alt="${text}" class="img-fullscreen" />
			`
		}
		viewData.components.readmeContent = __marked(__fs.readFileSync(readmeFilePath, 'utf8'), {
			renderer
		})
	}
	if (dataFilePath) {
		viewData.components.dataContent = __fs.readFileSync(dataFilePath, 'utf8')
	}

	// pass the files to inject
	viewData.components.inject = {
		styles: res.locals.config.components.inject.filter(function(file) { return file.substr(-4) === '.css' }).map(function(file) { return "'/"+file+"'"; }),
		scripts: res.locals.config.components.inject.filter(function(file) { return file.substr(-3) === '.js' }).map(function(file) { return "'/"+file+"'"; })
	}

	// compile the view with his data if needed
	if (viewFilePath) {

		// load and parse data
		let data = {};
		if (dataFilePath) {
			data = JSON.parse(__fs.readFileSync(dataFilePath, 'utf8'))
		}

		// check which template language is used
		if (viewFilePath.match(/\.blade\.php$/)) {
			__execPhp(__dirname + '/../php/compileBlade.php', __dirname + '/../php/bin/php', (error, php, outprint) => {
				const result = php.compile(viewPath, data, __path.resolve(process.env.PWD + '/' + res.locals.config.components.viewsRootPath), function(err, result, output, printed) {
					// set the compiled content in the viewData
					viewData.components.result = __htmlspecialchars(result)
					// render the page
					res.render('components', viewData)
				})
			})
		} else if (viewFilePath.match(/\.twig$/)) {
			__execPhp(__dirname + '/../php/compileTwig.php', __dirname + '/../php/bin/php', (error, php, outprint) => {
				const result = php.compile(viewPath+'.twig', data, __path.resolve(process.env.PWD + '/' + res.locals.config.components.viewsRootPath), function(err, result, output, printed) {
					// set the compiled content in the viewData
					viewData.components.result = __htmlspecialchars(result)
					// render the page
					res.render('components', viewData)
				})
			})
		}
	}
}
