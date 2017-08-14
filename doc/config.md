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
