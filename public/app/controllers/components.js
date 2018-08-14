const __path = require('path')
const __fs = require('fs')
const __handlebarsHelpers = require('../views/handlebarHelpers')
const __prepareViewData = require('../utils/prepareViewData')
const __execPhp = require('exec-php')
const __htmlspecialchars = require('htmlspecialchars')
const __marked = require('marked')
const _capitalize = require('lodash/capitalize')
const __glob = require('glob-all')
const io = require('../socketio/server')
const Handlebars = require('handlebars')
const ComponentModel = require('../models/component')

let watcher

module.exports = function componentsController(req, res) {

	const path = decodeURIComponent(req.url.replace('/components/',''))
	const absoluteViewsPath = __path.resolve(
		res.locals.config.components.viewsRootPath
	)
	const viewPath = path + '/' + path.split('/').pop()
	const absoluteViewPath = absoluteViewsPath + '/' + path
	const absolutePhpBootstrapPath = __path.resolve(
		res.locals.config.components.phpBootstrapPath
	)

	const component = new ComponentModel(viewPath, absoluteViewsPath, absolutePhpBootstrapPath)
	component.onReady(() => {

		// preparing viewData
		const viewData = __prepareViewData(req, res)

		// pass the files to inject
		viewData.components.inject = {
			styles: res.locals.config.components.inject.filter(function(file) { return file.substr(-4) === '.css' }).map(function(file) { return "'/"+file+"'"; }),
			scripts: res.locals.config.components.inject.filter(function(file) { return file.substr(-3) === '.js' }).map(function(file) { return "'/"+file+"'"; })
		}

		// make sure we have the .cache folder
		const viewsCacheAbsolutePath = __path.resolve(res.locals.config.components.viewsRootPath + '/.cache')
		if ( ! __fs.existsSync(viewsCacheAbsolutePath)) {
			// create the folder
			__fs.mkdirSync(viewsCacheAbsolutePath)
			// create the .gitignore and .gitkeep files
			__fs.appendFileSync(viewsCacheAbsolutePath + '/.gitignore', "*\n!.gitkeep")
			__fs.appendFileSync(viewsCacheAbsolutePath + '/.gitkeep', "")
		}

		viewData.components.viewContent = component.viewContent
		viewData.components.readmeContent = component.readmeContent
		viewData.components.schemaJsonContent = component.schemaJsonContent
		viewData.components.variants = component.variants
		viewData.components.metas = component.metas

		// // save compiled if needed
		// if (res.locals.config.components.saveCompiled) {
		// 	for (let filename in component.variants) {
		// 		// __fs.writeFileSync()
		// 		const filePath = __path.resolve(
		// 			absoluteViewsPath,
		// 			path,
		// 			filename
		// 		)
		// 		__fs.writeFileSync(filePath.replace('.data.js','.html'), component.variants[filename].view)
		// 	}
		// }

		res.render('components', viewData)

	})

	io.once('connection', (socket) => {
		socket.once('disconnect', () => {
			// watch changes
			if (socket.watcher) {
				socket.watcher.close()
			}
		})

		socket.watcher = __fs.watch(absoluteViewPath, (event, filename) => {
			const component = new ComponentModel(viewPath, absoluteViewsPath, absolutePhpBootstrapPath)
			component.onReady(() => {
				socket.emit('component:update', {
					viewContent: component.viewContent,
					readmeContent: component.readmeContent,
					schemaJsonContent: component.schemaJsonContent,
					variants: component.variants,
					inject: {
						styles: res.locals.config.components.inject.filter(function(file) { return file.substr(-4) === '.css' }).map(function(file) { return "/"+file; }),
						scripts: res.locals.config.components.inject.filter(function(file) { return file.substr(-3) === '.js' }).map(function(file) { return "/"+file; })
					}
				})
			})
		})
	})
}
