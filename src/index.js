const extractFromFile = require('./styleguide/extractFromFile');
const extractFromString = require('./styleguide/extractFromString');
const extractFromFileTo = require('./styleguide/extractFromFileTo');
const extractFromStringTo = require('./styleguide/extractFromStringTo');
const api = {
	styleguide : {
		extractFromFile,
		extractFromString,
		extractFromFileTo,
		extractFromStringTo
	}
};
export default api;
