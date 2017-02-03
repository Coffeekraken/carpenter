Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = extractFromString;
/**
 * Extract styleguide docblock from a string
 * @param 		{String} 		string 		The string to extract the styleguide from
 * @return 		{String} 					The styleguide dobclocks
 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
 */
function extractFromString(string) {
	// protect
	if (!string || string.trim() === '') return [];
	// process the string to be sure we have spaces between two
	// docblocks
	string = string.replace(/\*\/(\s?\S?\t?\n)*\s*\/\*\*/g, "*/\n\n/**");
	// docblock regex
	var reg = /\/\*{2}\n([\s\S]+?)\*\/\n.*/g;
	// parse the string
	var blocks = string.match(reg);
	// if no blocks, return
	if (!blocks) return [];
	// filter blocks to get styleguide ones
	blocks = blocks.filter(function (block) {
		// console.log(block);
		return block.match(/@styleguide/g);
	});
	// return the blocks
	return blocks.join("\n\n");
}
module.exports = exports["default"];