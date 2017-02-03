const __displays = require('./displays/index');
const __config = require('../config');
const _merge = require('lodash/merge');
const __fs = require('fs');
module.exports = function renderDisplay(name, data) {
	// additional displays
	if (__config.styleguide.displays.length) {
		__config.styleguide.displays.forEach(function(displaysFilePath) {
			if (__fs.existsSync(process.env.PWD + '/' + displaysFilePath)) {
				const additionalDisplays = require(process.env.PWD + '/' + displaysFilePath);
				// merge into displays
				_merge(__displays, additionalDisplays);
			}
		});
	}

	if ( ! __displays[name]) {
		console.warn(`The display "${name}" does not exist...`);
	} else {
		return __displays[name](data);
	}
}
