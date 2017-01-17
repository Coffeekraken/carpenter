const __editorDisplay = require('./displays/editor');
const __colorDisplay = require('./displays/color');
const __fontDisplay = require('./displays/font');

module.exports = function renderDisplay(name, data) {
	switch(name) {
		case 'color':
			return __colorDisplay(data);
		break;
		case 'font':
			return __fontDisplay(data);
		break;
		case 'editor':
		default:
			return __editorDisplay(data);
		break;
	}
}
