'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = extractFromFile;
/**
 * Extract styleguide docblock from a file
 * @param 		{String} 		path 		The file path to extract the styleguide from
 * @return 		{String} 					The styleguide dobclocks
 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
 */
var __fs = require('fs');
var __extractFromString = require('./extractFromString');
function extractFromFile(path) {
	// make sure we have an array
	var paths = [].concat(path);
	// blocks
	var blocks = [];
	// loop through files
	paths.forEach(function (filePath) {
		// read file
		var content = __fs.readFileSync(filePath, 'utf8');
		// extract docblocks from content
		blocks = blocks.concat(__extractFromString(content));
	});
	return blocks.join("\n");
}
module.exports = exports['default'];