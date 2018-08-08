const __fs = require('fs')
const __md5 = require('md5')

module.exports = function packageJsonMiddleware(req, res, next) {
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
		res.locals.packageJson = packageJson;
	}
	// next
	next();
}
