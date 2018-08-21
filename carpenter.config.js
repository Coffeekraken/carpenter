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
	index : null,

	// express configs
	express : {
		// which folders to serve static files from
		static : {
			'/dist' : process.env.PWD + '/dist'
		}
	},

	// components settings
	components: {
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
	documentation : false,

	// styleguide configuration
	styleguide : false
}
