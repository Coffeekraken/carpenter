Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = extractFromFileTo;
/**
 * Extract styleguide docblock from a file
 * @param 		{String} 		path 		The file path to extract the styleguide from
 * @param 		{String} 		to 			The file path to extract the styleguide to
 * @return 		{String} 					The styleguide dobclocks
 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
 */
var __extractFromFile = require('./extractFromFile');
var __fs = require('fs');
function extractFromFileTo(path, to) {
	// extract
	var styleguideString = __extractFromFile(path);
	// save to file
	__fs.writeFileSync(to, styleguideString, {
		encoding: 'utf8'
	});
	// return the styleguide
	return styleguideString;
}
module.exports = exports['default'];