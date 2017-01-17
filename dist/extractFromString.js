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
	// make sure we split the blocks like */\n/**
	string = string.replace(/\*\/\n(\s)*?\/\*\*/g,"*/\n\n/**");
	// docblock regex
	var reg = /\/\*{2}\n([\s\S]+?)\*\/\n.*/g;
	// parse the string
	var blocks = string.match(reg);
	blocks = blocks.filter(function (block) {
		// return true;
		return block.match(/@styleguide(\s\S)?/g);
	});
	// return the blocks
	return blocks.join("\n\n");
}
module.exports = exports["default"];
