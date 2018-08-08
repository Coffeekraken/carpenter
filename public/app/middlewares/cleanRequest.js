module.exports = function cleanRequestMiddleware(req, res, next) {
	// exclude .map files
	if (req.url.match('favicon.ico')) return res.end();
	if (req.url.match('.js.map')) return res.end();
	next();
}
