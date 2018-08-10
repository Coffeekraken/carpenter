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

		// glob patterns of views
		// (relative to viewsRootPath)
		files: [
			'**/*.{blade.php,twig}'
		]
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
