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
	components: false,

	// documentation settings
	documentation : false,

	// styleguide configuration
	styleguide : false
}
