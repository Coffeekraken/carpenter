const _extend = require('lodash/extend')
const __express = require('express')
const __expressHandlebars = require('express-handlebars')
const __basicAuth = require('basic-auth-connect')
const __config = require('./app/config')

const nodeModilesImagesMiddleware = require('./app/middlewares/nodeModulesImages')
const packageJsonMiddleware = require('./app/middlewares/packageJson')
const cleanRequestMiddleware = require('./app/middlewares/cleanRequest')
const docThreeMiddleware = require('./app/middlewares/docThree')
const styleguideMiddleware = require('./app/middlewares/styleguides')
const componentsMiddleware = require('./app/middlewares/components')

const styleguidesController = require('./app/controllers/styleguide')
const documentationController = require('./app/controllers/documentation')
const componentsController = require('./app/controllers/components')

module.exports = function(config) {

	// creating the app
	const app = __express()

	// extend config
	_extend(__config, config)

	// save config in locals
	app.use((req, res, next) => {
		res.locals.config = config
		next()
	})

	// index redirection
	if (config.index) {
		app.get('/', function (req, res) {
			res.redirect(config.index)
		})
	}

	// handlebars
	app.engine('handlebars', __expressHandlebars({
		layoutsDir : __dirname + '/app/views/layouts',
		defaultLayout : 'main'
	}))
	app.set('views',__dirname + '/app/views')
	app.set('view engine', 'handlebars')

	// if need auth
	if (config.auth && config.auth.username && config.auth.password) {
		app.use(__basicAuth(config.auth.username, config.auth.password))
	}

	// static files
	app.use('/assets', __express.static(__dirname + '/assets'))

	// loop on configuration files to serve them from the project directory
	if (config.styleguide && config.styleguide.files.length) {
		config.styleguide.files.forEach(function(file) {
			app.get('/' + file, function(req, res) {
				res.sendFile(process.env.PWD + req.url)
			})
		})
	}
	Object.keys(config.express.static).forEach(function(folderPath) {
		const mapToPath = config.express.static[folderPath]
		app.use(folderPath, __express.static(mapToPath))
	})
	if (config.logo) {
		app.get('/' + config.logo, function(req, res) {
			res.sendFile(process.env.PWD + req.url)
		})
	}

	// static files
	app.use(nodeModilesImagesMiddleware)

	// package json
	app.use(packageJsonMiddleware)

	// clean request like favicon.ico, .map.js, etc...
	app.use(cleanRequestMiddleware)

	// build the docThree saved in res.locals.docThree
	app.use(docThreeMiddleware)

	// grab styleguides and set the res.locals.allStyleguide
	app.use(styleguideMiddleware)

	// grab components and set the res.locals.components
	app.use(componentsMiddleware)

	// styleguide route
	app.get(/\/styleguide\/.*/, styleguidesController)

	// documentation route
	app.get(/documentation\/.+/, documentationController)

	// components route
	app.get(/components\/.+/, componentsController)

	// start demo server
	app.listen(config.port, function () {
		console.log('Carpenter : up and running on port ' + config.port + '!')
	})
}
