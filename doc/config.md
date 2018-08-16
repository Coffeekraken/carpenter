# Configuration

Here the full configuration file reference

```js
module.exports = {

	// basic auth
	// auth : {
	// 	username : 'something',
	// 	password : 'some-password'
	// },
	auth : false,

	// server port
	port : 3333,

	// title
	title : 'Carpenter',

	// logo
	logo : null,

	// home url
	index : '/documentation/README.md',

	// express configs
	express : {
		// which folders to serve static files from
		static : {
			'/dist' : process.env.PWD + '/dist'
		}
	},

	// components settings
	components: {

		// some files to inject inside the preview iframe
		inject: [
			'public/assets/css/style.css',
			'public/assets/js/app.js'
		],

		// root views path
		viewsRootPath: 'app/views',

		// file to include in the compile environment
		phpBootstrapPath: 'public/app/php/bootstrap.php',

		// set if need to save the compiled views in html format
		saveCompiled: false,

		// set the widths or each states used to resize the preview iframe
		states: {
			mobile: 620,
			tablet: 1000,
			desktop: null
		}
	},

	// documentation settings
	documentation : {

		// files
		files : [
			'doc/**/*.md',
			'README.md'
		]
	},

	// styleguide configuration
	styleguide : {

		// source styleguide files
		files : [
			'public/assets/css/style.css'
		],

		// additionnal displays files to load
		displays : []
	}
}
```
