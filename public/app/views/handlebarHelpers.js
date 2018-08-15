const __flattenkeys = require('flattenkeys')
const _uniq = require('lodash/uniq')
const _capitalize = require('lodash/capitalize')
const __htmlspecialchars = require('htmlspecialchars')
const __gravatarUrl = require('gravatar-url')

// const __md5 = require('md5');
let path = '';
let j = 0;
const menuLevel = (three, currentUrl) => {
	let res = '';
	let newDir = true;
	let i = 0;

	for(let key in three) {
		const value = three[key];
		j++;
		if (typeof(value) === 'object'
			&& ! value.filename
		) {
			if (newDir) {
				i = 0;
				path += `/${key}`;
				newDir = false;
			}
			i++;
			let p = path;
			p = p.split('/');
			p.pop();
			p.push(key);
			p = p.join('/');

			let active = '';
			if (currentUrl.match(p)) {
				active = 'active';
			}
			res += '<li class="list__item">';
			res += `<a href="#${path.replace(/^[^a-z]+|[^\w:.-]+/gi, "")}-${i}-${j}" id="${path.replace(/^[^a-z]+|[^\w:.-]+/gi, "")}-${i}-${j}" is="s-activate" toggle="true" save-state="localStorage" class="list__item--toggle">
				<s-ripple></s-ripple>
				<i class="fa fa-folder-o"></i>&nbsp;&nbsp;${key}
			</a>`;
			res += '<ul class="list list--three">';
			res += menuLevel(value, currentUrl);
			res += '</ul>';
			res += '</li>';
		} else {
			// console.log(value.dirname);
			path = value.dirname.replace('./','').replace('.','');
			let active = '';
			if (currentUrl.match(value.path)) {
				active = 'active';
			}
			res += `<li class="list__item">
				<a href="/documentation/${value.path}" class="${active}" title="${value.name}">
					<s-ripple></s-ripple>
					<i class="fa fa-file"></i>&nbsp;&nbsp;
					${value.name}
				</a>
			</li>`;
			// res.push(`<li>${value}</li>`);
		}
	}
	return res;
}

/**
 * Menu
 */
exports.threeMenu = (three, currentUrl) => {
	j = 0;
	const res = menuLevel(three, currentUrl);
	return `<ul class="list list--three m-b-bigger">
		${res}
	</ul>`;
}



exports.optionsMenu = (three, currentUrl) => {
	// prepare three
	const newThree = Object.assign({}, three);

	let paths = __flattenkeys(newThree);
	paths = paths.map((item) => {
		const it = item.split('.');
		it.pop();
		return it.join('.');
	});
	paths = _uniq(paths);

	const options = [];
	paths.forEach((path) => {
		path = path.replace(/\./g,'/').replace('/md','.md');
		options.push(`<option value="/documentation/${path}">${path}</option>`);
	});
	return options.join('');
}

exports.eachSorted = (context, options) => {
	var ret = ""
	Object.keys(context).sort().forEach(function(key) {
		ret = ret + options.fn({key: key, value: context[key]})
	})
	return ret
}

exports.cleanTitle = (title) => {
	return _capitalize(title).replace('.data.js','')
				.replace('-',' ')
				.replace('_',' ')
				.replace('.',' ')
}

exports.sanitizeAttribute = (string) => {
	return string.replace(/\./g,'-')
}

exports.htmlspecialchars = (string) => {
	return __htmlspecialchars(string)
}

exports.ifCond = function (v1, operator, v2, options) {

    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
}

/**
 * Gravatar
 */
exports.gravatarUrl = (email) => {
	return __gravatarUrl(email);
}
