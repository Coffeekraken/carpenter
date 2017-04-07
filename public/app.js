const _get = require('lodash/get');
const _set = require('lodash/set');
const _groupBy = require('lodash/groupBy');
const _extend = require('lodash/extend');
const __express = require('express');
const __expressHandlebars = require('express-handlebars');
const __path = require('path');
const __fs = require('fs');
const __open = require('open');
const __docblockParser = require('coffeekraken-docblock-parser');
const __renderStyleguideDisplay = require('./app/styleguide/renderDisplay');
const __marked = require('marked');
const __config = require('./app/config');
const __carpenterApi = require('../dist/index');
const __readdirRecursive = require('fs-readdir-recursive');
const __handlebarsHelpers = require('./app/handlebarHelpers');
const __glob = require('glob-all');
const _size = require('lodash/size');
const __md5 = require('md5');

module.exports = function(config) {

	// creating the app
	const app = __express();

	// extend config
	_extend(__config, config);

	// index
	if (config.index) {
		app.get('/', function (req, res) {
			res.redirect(config.index);
		});
	}

	// handlebars
	app.engine('handlebars', __expressHandlebars({
		layoutsDir : __dirname + '/views/layouts',
		defaultLayout : 'main'
	}));
	app.set('views',__dirname + '/views');
	app.set('view engine', 'handlebars');

	// static files
	app.use('/assets', __express.static(__dirname + '/assets'));

	// static files
	app.use((req, res, next) => {
		if (req.url === '/') {
			next();
			return;
		}
		if (__fs.existsSync(process.env.PWD + req.url)) {
			return res.sendFile(process.env.PWD + req.url);
		} else if (__fs.existsSync(__path.resolve(__dirname + '/../') + req.url)) {
			return res.sendFile(__path.resolve(__dirname + '/../') + req.url);
		}
		next();
	});

	// package json
	app.use((req, res, next) => {

		let packageJson;
		// load package.json
		if (__fs.existsSync(process.env.PWD + '/package.json')) {
			packageJson = require(process.env.PWD + '/package.json');
			if (packageJson.contributors) {
				packageJson.contributors = packageJson.contributors.map((contributor) => {
					contributor.gravatar = `https://www.gravatar.com/avatar/${__md5(contributor.email)}`;
					return contributor;
				});
			}
			// attach packageJson to req
			req.packageJson = packageJson;
		}
		// next
		next();
	});

	// loop on configuration files to serve them from the project directory
	config.styleguide.files.forEach(function(file) {
		app.get('/' + file, function(req, res) {
			res.sendFile(process.env.PWD + req.url);
		});
	});
	Object.keys(config.express.static).forEach(function(folderPath) {
		const mapToPath = config.express.static[folderPath];
		app.use(folderPath, __express.static(mapToPath));
	});
	if (config.logo) {
		app.get('/' + config.logo, function(req, res) {
			res.sendFile(process.env.PWD + req.url);
		});
	}

	app.use(function(req, res, next) {
		// exclude .map files
		if (req.url.match('favicon.ico')) return res.end();
		if (req.url.match('.js.map')) return res.end();
		next();
	});

	// grab the needed files
	let docThree = {};
	app.use(function(req, res, next) {
		docThree = {};
		docFiles = __glob.sync([].concat(config.documentation.files));
		docFiles.forEach((docFilePath, i) => {
			// variables
			const dirname = __path.dirname(docFilePath),
					basename = __path.basename(docFilePath),
					dirnameDot = dirname.replace(/\//g,'.');
			let value = _get(docThree, dirnameDot);
			if (dirnameDot === '.') {
				docThree[basename] = {
					filename : basename,
					name : basename.slice(0, -3),
					dirname,
					path : docFilePath,
					active : req.url.indexOf(docFilePath) !== -1
				};
				return;
			}
			if ( ! value) {
				_set(docThree, dirnameDot, {});
				value = _get(docThree, dirnameDot);
			}
			value[basename] = {
				filename : basename,
				name : basename.slice(0, -3),
				dirname,
				path : docFilePath,
				active : req.url.indexOf(docFilePath) !== -1
			};
		});
		// console.log(docThree);
		next();

	});
	// grab styleguides
	let allStyleguides = {};
	app.use(function(req, res, next) {
		allStyleguides = {};
		// parse dobclock
		const styleguideFiles = [].concat(config.styleguide.files).map(function(file) {
			return process.env.PWD + '/' + file;
		});
		let styleguideDocBlocksString = __carpenterApi.styleguide.extractFromFile(styleguideFiles);

		const json = __docblockParser({
			tags : {
				'@name' : function(name, args, data) {
					data[name] = __marked(args[0]);
				},
				'@see' : function(name, args, data) {
					data[name] = args[0];
				},
				'@body' : function(name, args, data) {
					data[name] = __marked(args[0]);
				},
				'@styleguide' : function(name, args, data) {
					data[name] = args[0];
				},
				'@display' : function(name, args, data) {
					data[name] = args[0] || 'default';
				},
				'@color' : function(name, args, data) {
					data[name] = args[0];
				},
				'@font-family' : function(name, args, data) { data[name] = args[0]; },
				'@font-style' : function(name, args, data) { data[name] = args[0]; },
				'@font-weight' : function(name, args, data) { data[name] = args[0]; }
			}
		}).parse(styleguideDocBlocksString);

		// filter styleguide items
		styleguideJson = json.filter((tag) => {
			return (tag.styleguide);
		});
		// group by
		styleguideJson.forEach(function(item) {
			// prepare display
			item._html = __renderStyleguideDisplay(item.display || 'editor', item);
			// split item paths
			const paths = item.styleguide.split('/').map(function(i) {
				return i.trim();
			}).join('.');
			let current = _get(allStyleguides, paths);
			if ( ! current) current = [];
			current.push(item);
			_set(allStyleguides, paths, current);
		});

		next();
	});

	// styleguide route
	app.get('/styleguide/:styleguide?', function (req, res) {
		// filter styleguide to display depending on the url
		let styleguidesToDisplay = {};
		if (req.params.styleguide) {
			allStyleguides[req.params.styleguide].active = true;
			styleguidesToDisplay[req.params.styleguide] = allStyleguides[req.params.styleguide];
		} else {
			styleguidesToDisplay = allStyleguides;
		}

		const viewData = {
			helpers : __handlebarsHelpers,
			request : req,
			title : config.title,
			logo : config.logo,
			url : req.url,
			packageJson : req.packageJson
		};
		if (allStyleguides && _size(allStyleguides)) {
			viewData.styleguide = {
				all : allStyleguides,
				toDisplay : styleguidesToDisplay
			};
		}
		if (_size(docThree)) {
			viewData.documentation = {
				three : docThree
			}
		}

		// render the page
		res.render('styleguide', viewData);
	});

	// documentation route
	app.get(/documentation\/.+/, function (req, res) {
		const docFilePath = req.url.replace(/^\/documentation\//,'');

		// read the markdown content
		let content = __fs.readFileSync(docFilePath,'utf8');
		// console.log(content);
		// process content
		// content = content.replace(/```([a-zA-Z]+)\n/g,'<s-codemirror id="$1" language="$1">');
		// content = content.replace(/```/g, '</s-codemirror>');

		const renderer = new __marked.Renderer();
		renderer.image = function(href, title, text) {
			return `
				<img tabindex="0" src="${href}" title="${title}" alt="${text}" />
				<img src="${href}" title="${title}" alt="${text}" class="img-fullscreen" />
			`;
		};
		let markdown = __marked(content, {
			renderer
		});

		const viewData = {
			helpers : __handlebarsHelpers,
			request : req,
			title : config.title,
			logo : config.logo,
			url : req.url,
			packageJson : req.packageJson
		};
		if (allStyleguides && _size(allStyleguides)) {
			viewData.styleguide = {
				all : allStyleguides
			};
		}
		if (_size(docThree)) {
			viewData.documentation = {
				three : docThree,
				content : markdown
			}
		}

		// render the page
		res.render('documentation', viewData);
	});

	// start demo server
	app.listen(config.port, function () {
		console.log('Carpenter : up and running on port ' + config.port + '!');
	});
}
