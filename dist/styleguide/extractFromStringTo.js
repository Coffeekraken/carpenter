'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = extractFromStringTo;
/**
 * Extract styleguide docblock from a string and save result into another file
 * @param 		{String} 		string 		The string path to extract the styleguide from
 * @param 		{String} 		to 			The file path to extract the styleguide to
 * @return 		{String} 					The styleguide dobclocks
 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
 */
var __extractFromString = require('./extractFromString');
var __fs = require('fs');
function extractFromStringTo(string, to) {
	// extract
	var styleguideString = __extractFromString(string);
	// save to file
	__fs.writeFileSync(to, styleguideString, {
		encoding: 'utf8'
	});
	// return the styleguide
	return styleguideString;
}
module.exports = exports['default'];