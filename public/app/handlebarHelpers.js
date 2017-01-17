// const __md5 = require('md5');
let path = '';
const menuLevel = (three, currentUrl) => {
	let res = '';
	let newDir = true;
	let i = 0;
	for(let key in three) {
		const value = three[key];
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
			res += `<a href="#${path.replace(/^[^a-z]+|[^\w:.-]+/gi, "")}${i}" id="${path.replace(/^[^a-z]+|[^\w:.-]+/gi, "")}${i}" is="s-activate" toggle="true" history="false" save-state="localStorage" class="list__item--toggle">
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
	const res = menuLevel(three, currentUrl);
	return `<ul class="list list--three m-b-bigger">
		${res}
	</ul>`;
}

/**
 * Gravatar
 */
// exports.gravatarUrl = (email) => {
// 	return `https://www.gravatar.com/avatar/${__md5(email)}`;
// }
