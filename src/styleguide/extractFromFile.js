/**
 * Extract styleguide docblock from a file
 * @param 		{String} 		path 		The file path to extract the styleguide from
 * @return 		{String} 					The styleguide dobclocks
 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
 */
const __fs = require('fs');
const __extractFromString = require('./extractFromString');
export default function extractFromFile(path) {
	// make sure we have an array
	const paths = [].concat(path);
	// blocks
	let blocks = [];
	// loop through files
	paths.forEach((filePath) => {
		// read file
		const content = __fs.readFileSync(filePath, 'utf8');
		// extract docblocks from content
		blocks = blocks.concat(__extractFromString(content));
	});
	return blocks.join("\n");
}
