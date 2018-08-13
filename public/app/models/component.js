const __path = require('path')
const __fs = require('fs')
const __marked = require('marked')
const __glob = require('glob-all')
const __execPhp = require('exec-php')
const __htmlspecialchars = require('htmlspecialchars')
const __handlebarHelpers = require('../views/handlebarHelpers')

module.exports = class ComponentModel {

	constructor(viewPath, absoluteViewsPath, absolutePhpBootstrapPath) {

		this._viewPath = viewPath
		this._absoluteViewsPath = absoluteViewsPath
		this._dirName = this._viewPath.split('/').pop()
		this._absoluteFileName = __path.resolve(
			`${this._absoluteViewsPath}/${this._viewPath}`
		)
		this._absolutePhpBootstrapPath = absolutePhpBootstrapPath
		this._templateEngine; // store the template engine that we need to use to compile the view

		// get the view content
		this._viewContent = this._getViewContent()

		// get the readme content
		this._readmeContent = this._getReadmeContent()

		// get the schemaJson content
		this._schemaJsonContent = this._getSchemaJsonContent()

		this._variants = {}

		// get the data files
		this._data = this._getData()

		this._compiledContentPromise = this._getCompiledContent().then((stack) => {
			this._compiledViewsContent = stack
		})

	}

	onReady (cb) {
		Promise.all([
			this._compiledContentPromise
		]).then(() => {
			cb()
		})
	}

	_getViewContent () {
		// try to get the view file
		if (__fs.existsSync(this._absoluteFileName + '.blade.php')) {
			this._viewFilePath = this._absoluteFileName + '.blade.php'
			this._templateEngine = 'blade'
		} else if (__fs.existsSync(this._absoluteFileName + '.twig')) {
			this._viewFilePath = this._absoluteFileName + '.twig'
			this._templateEngine = 'twig'
		}

		//  get the content and return it
		if (this._viewFilePath) {
			return __fs.readFileSync(this._viewFilePath, 'utf8')
		}

		// no content found, return false
		return false
	}

	_getReadmeContent () {
		// check if a readme exist
		let readmeFilePath
		if (__fs.existsSync(this._absoluteFileName + '.md')) {
			readmeFilePath = this._absoluteFileName + '.md'
		}

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
			return __marked(__fs.readFileSync(readmeFilePath, 'utf8'), {
				renderer
			})
		}

		// no readme so return false
		return false
	}

	_getSchemaJsonContent () {
		// check if a schema.json exist
		let schemaJsonFilePath
		if (__fs.existsSync(this._absoluteFileName + '.schema.json')) {
			schemaJsonFilePath = this._absoluteFileName + '.schema.json'
		}

		// set the schemaJsonContent if schemaJsonFilePath exist
		if (schemaJsonFilePath) {
			return __fs.readFileSync(schemaJsonFilePath, 'utf8')
		}

		// no schemaJson so return false
		return false
	}

	_getDataFilePathes () {
		let dataJsFilePath
		let dataJsFilePathes = []
		if (__fs.existsSync(this._absoluteFileName + '.data.js')) {
			dataJsFilePath = this._absoluteFileName + '.data.js'
			dataJsFilePathes = [dataJsFilePath]
		}
		return dataJsFilePathes.concat(__glob.sync(this._absoluteFileName+'.*.data.js'))

	}

	_getData () {
		// check if has a data in js format
		const dataJsFilePathes = this._getDataFilePathes()

		// loop on each data files
		const data = {}
		dataJsFilePathes.forEach((dataJsFilePath) => {
			// get the filename
			const filename = dataJsFilePath.split('/').pop()
			// read the data file
			delete require.cache[dataJsFilePath]
			data[filename] = {
				content: __fs.readFileSync(dataJsFilePath, 'utf8'),
				data: require(dataJsFilePath)
			}
			if (!this._variants[filename]) {
				this._variants[filename] = {}
			}
			this._variants[filename].data = require(dataJsFilePath)
			this._variants[filename].dataContent = __fs.readFileSync(dataJsFilePath, 'utf8')
			this._variants[filename].title = __handlebarHelpers.cleanTitle(filename)
		})

		// return the data stack
		return data

	}

	_getCompiledContent () {

		return new Promise((resolve, reject) => {

			const _this = this

			// get all the files pathes
			const dataJsFilePathes = this._getDataFilePathes()

			// init stack
			const compiledStack = {}

			// store the compiled count
			let compiledCount = 0

			// loop on each data js file pathes
			dataJsFilePathes.forEach((dataJsFilePath) => {

				// check which template language is used
				if (this._templateEngine === 'blade') {
					((_dataFilePath) => {
						// console.log(this._data[__path.basename(_dataFilePath)].data)
						__execPhp(__dirname + '/../php/compileBlade.php',__dirname + '/../php/bin/php', (error, php, outprint) => {
							const result = php.compile(this._viewPath,
													  this._data[__path.basename(_dataFilePath)].data,
													  this._absoluteViewsPath,
													  this._absolutePhpBootstrapPath,
							(err, result, output, printed) => {
								// console.log(err);
								// console.log(printed);
								const filename = __path.basename(_dataFilePath)
								if (!this._variants[filename]) {
									this._variants[filename] = {}
								}
								this._variants[filename].view = result

								// update the compiled count variable
								compiledCount++
								// renderView if all compiled
								if (compiledCount >= dataJsFilePathes.length) {
									resolve(compiledStack)
								}
							})
						})
					})(dataJsFilePath)
				} else if (this._templateEngine === 'twig') {
					((_dataFilePath) => {
						__execPhp(__dirname + '/../php/compileTwig.php', __dirname + '/../php/bin/php', (error, php, outprint) => {
							const result = php.compile(this._viewPath + '.twig', this._data[__path.basename(_dataFilePath)].data, this._absoluteViewsPath, (err, result, output, printed) => {
								const filename = __path.basename(_dataFilePath)
								if (!this._variants[filename]) {
									this._variants[filename] = {}
								}
								this._variants[filename].view = result

								// update the compiled count variable
								compiledCount++
								// renderView if all compiled
								if (compiledCount >= dataJsFilePathes.length) {
									resolve(compiledStack)
								}
							})
						})
					})(dataJsFilePath)
				}
				// else if (viewFilePath.match(/\.twig$/)) {
				// 	((comp) => {
				// 		__execPhp(__dirname + '/../php/compileTwig.php', __dirname + '/../php/bin/php', (error, php, outprint) => {
				// 			const result = php.compile(viewPath+'.twig', data, __path.resolve(process.env.PWD + '/' + res.locals.config.components.viewsRootPath), function(err, result, output, printed) {
				// 				// set the compiled content in the viewData
				// 				comp.result = __htmlspecialchars(result)
				// 				// update the compiled count variable
				// 				compiledCount++
				// 				// renderView if all compiled
				// 				if (compiledCount >= dataJsFilePathes.length) {
				// 					renderView(viewData)
				// 				}
				// 			})
				// 		})
				// 	})(component)
				// }
			})
		})
	}

	get viewContent () {
		return this._viewContent
	}

	get readmeContent () {
		return this._readmeContent
	}

	get schemaJsonContent () {
		return this._schemaJsonContent
	}

	get variants () {
		return this._variants
	}

	get data () {
		return this._data
	}

	get compiledViewsContent () {
		return this._compiledViewsContent
	}

}
