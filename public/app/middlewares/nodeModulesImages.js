const __path = require('path')
const __fs = require('fs')

module.exports = function nodeModulesImages(req, res, next) {
	if (req.url === '/') {
		next();
		return;
	}

	// handle images in node packages
	switch (__path.extname(req.url).toLowerCase()) {
		case '.jpg':
		case '.png':
		case '.jpeg':
		case '.gif':
			if (req.url.match(/node_modules\//)) {
				const fromRootUrl = req.url.replace(/documentation\/|styleguide\//,'');
				if (__fs.existsSync(__path.resolve('.'+fromRootUrl)	)) {
					return res.sendFile(__path.resolve('.'+fromRootUrl));
				}
			}
		break;
	}

	// send real files
	if (__fs.existsSync(process.env.PWD + req.url)) {
		return res.sendFile(process.env.PWD + req.url);
	} else if (__fs.existsSync(__path.resolve(__dirname + '/../../../') + req.url)) {
		return res.sendFile(__path.resolve(__dirname + '/../../../') + req.url);
	}

	// pass to next middleware
	next();
}
