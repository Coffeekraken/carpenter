/**
 * Extract styleguide docblock from a file
 * @param 		{String} 		path 		The file path to extract the styleguide from
 * @param 		{String} 		to 			The file path to extract the styleguide to
 * @return 		{String} 					The styleguide dobclocks
 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
 */
const __extractFromFile = require('./extractFromFile');
const __fs = require('fs');
export default function extractFromFileTo(path, to) {
	// extract
	const styleguideString = __extractFromFile(path);
	// save to file
	__fs.writeFileSync(to, styleguideString, {
		encoding : 'utf8'
	});
	// return the styleguide
	return styleguideString;
}
