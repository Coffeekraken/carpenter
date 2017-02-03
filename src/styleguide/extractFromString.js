/**
 * Extract styleguide docblock from a string
 * @param 		{String} 		string 		The string to extract the styleguide from
 * @return 		{String} 					The styleguide dobclocks
 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
 */
export default function extractFromString(string) {
	// protect
	if ( ! string || string.trim() === '') return [];
	// process the string to be sure we have spaces between two
	// docblocks
	string = string.replace(/\*\/(\s?\S?\t?\n)*\s*\/\*\*/g,"*/\n\n/**");
	// docblock regex
	const reg = /\/\*{2}\n([\s\S]+?)\*\/\n.*/g;
	// parse the string
	let blocks = string.match(reg);
	// if no blocks, return
	if ( ! blocks) return [];
	// filter blocks to get styleguide ones
	blocks = blocks.filter((block) => {
		// console.log(block);
		return (block.match(/@styleguide/g));
	});
	// return the blocks
	return blocks.join("\n\n");
}
