module.exports = {
	// server port
	port : 3333,

	// title
	title : 'Carpenter',

	// logo
	logo : null,

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
		files : []
	},

	// styleguide file
	styleguide : {

		// source styleguide files
		files : [],

		// additionnal displays files to load
		displays : []
	}
}
