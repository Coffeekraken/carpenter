const __displays = require('./displays/index');
const __config = require('../config');
const _merge = require('lodash/merge');
module.exports = function renderDisplay(name, data) {
	// additional displays
	if (__config.styleguide.displays.length) {
		__config.styleguide.displays.forEach(function(displaysFilePath) {
			const additionalDisplays = require(displaysFilePath);
			// merge into displays
			_merge(__displays, additionalDisplays);
		});
	}

	if ( ! __displays[name]) {
		console.warn(`The display "${name}" does not exist...`);
	} else {
		return __displays[name](data);
	}
}
