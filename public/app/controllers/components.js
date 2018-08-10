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
const _capitalize = require('lodash/capitalize')
const __glob = require('glob-all')

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

	// check if has a data in js format
	let dataJsFilePath
	if (__fs.existsSync(absoluteFileName + '.data.js')) {
		dataJsFilePath = absoluteFileName + '.data.js'
	}
	let dataJsFilePathes = [dataJsFilePath]
	dataJsFilePathes = dataJsFilePathes.concat(__glob.sync(absoluteFileName+'.*.data.js'))

	// preparing viewData
	const viewData = __prepareViewData(req, res)

	// title
	viewData.components.title = _capitalize(dirName).replace('-',' ')
		.replace('_',' ')
		.replace('.',' ')

	// init components stack
	viewData.components.components = []

	// readme
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

	// pass the files to inject
	viewData.components.inject = {
		styles: res.locals.config.components.inject.filter(function(file) { return file.substr(-4) === '.css' }).map(function(file) { return "'/"+file+"'"; }),
		scripts: res.locals.config.components.inject.filter(function(file) { return file.substr(-3) === '.js' }).map(function(file) { return "'/"+file+"'"; })
	}

	// set some viewData
	if (viewFilePath) {
		viewData.components.viewContent = __fs.readFileSync(viewFilePath, 'utf8')
	}

	// loop on each data files
	let compiledCount = 0
	dataJsFilePathes.forEach((dataJsFilePath) => {

		const component = {}

		// set the js data content and the title
		if (dataJsFilePath) {
			component.dataContent = __fs.readFileSync(dataJsFilePath, 'utf8')

			component.title = __path.basename(dataJsFilePath)
				.replace('.data.js','')
				.replace('-',' ')
				.replace('_',' ')
				.replace('.',' ')
		}

		// compile the view with his data if needed
		if (viewFilePath) {

			// load and parse data
			let data = {};
			if (dataJsFilePath) {
				data = require(dataJsFilePath)
			}

			// check which template language is used
			if (viewFilePath.match(/\.blade\.php$/)) {
				((comp) => {
					__execPhp(__dirname + '/../php/compileBlade.php', __dirname + '/../php/bin/php', (error, php, outprint) => {
						const result = php.compile(viewPath, data, __path.resolve(process.env.PWD + '/' + res.locals.config.components.viewsRootPath), function(err, result, output, printed) {
							// set the compiled content in the viewData
							comp.result = __htmlspecialchars(result)
							// update the compiled count variable
							compiledCount++
							// renderView if all compiled
							if (compiledCount >= dataJsFilePathes.length) {
								renderView(viewData)
							}
						})
					})
				})(component)
			} else if (viewFilePath.match(/\.twig$/)) {
				((comp) => {
					__execPhp(__dirname + '/../php/compileTwig.php', __dirname + '/../php/bin/php', (error, php, outprint) => {
						const result = php.compile(viewPath+'.twig', data, __path.resolve(process.env.PWD + '/' + res.locals.config.components.viewsRootPath), function(err, result, output, printed) {
							// set the compiled content in the viewData
							comp.result = __htmlspecialchars(result)
							// update the compiled count variable
							compiledCount++
							// renderView if all compiled
							if (compiledCount >= dataJsFilePathes.length) {
								renderView(viewData)
							}
						})
					})
				})(component)
			}
		}

		// add the component inside the components stack
		viewData.components.components.push(component)

	})

	const renderView = (viewData) => {
		// render the page
		res.render('components', viewData)
	}
}
