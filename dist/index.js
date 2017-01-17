Object.defineProperty(exports, "__esModule", {
	value: true
});
var extractFromFile = require('./styleguide/extractFromFile');
var extractFromString = require('./styleguide/extractFromString');
var extractFromFileTo = require('./styleguide/extractFromFileTo');
var extractFromStringTo = require('./styleguide/extractFromStringTo');
var api = {
	styleguide: {
		extractFromFile: extractFromFile,
		extractFromString: extractFromString,
		extractFromFileTo: extractFromFileTo,
		extractFromStringTo: extractFromStringTo
	}
};
exports.default = api;
module.exports = exports['default'];