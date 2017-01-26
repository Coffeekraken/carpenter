require('webcomponents.js/webcomponents-lite');
require('codemirror/mode/sass/sass.js');
require('codemirror/mode/css/css.js');
require('./webcomponent.props.js');
require('./webcomponent.imports.js');
import prism from 'prismjs'
require('prismjs/components/prism-scss');
require('prismjs/components/prism-json');
require('prismjs/plugins/normalize-whitespace/prism-normalize-whitespace');
prism.highlightAll();
import __throttle from 'coffeekraken-sugar/js/utils/functions/throttle';

// save scroll position
let scrollTimeout;
const onScroll = __throttle((e) => {
	sessionStorage.setItem('scrollTop', document.body.scrollTop);
});
document.addEventListener('scroll', onScroll);
// restore scroll top if possible
const savedScrollTop = sessionStorage.getItem('scrollTop');
if (savedScrollTop) {
	setTimeout(() => {
		window.scrollTo(0,parseInt(savedScrollTop));
	});
}
