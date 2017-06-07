import compileServer from 'coffeekraken-compile-server'
import SWebComponent from 'coffeekraken-sugar/js/core/SWebComponent'
import SColor from 'coffeekraken-sugar/js/classes/SColor'
import __whenAttribute from 'coffeekraken-sugar/js/dom/whenAttribute'

SWebComponent.setDefaultProps({
	mountWhen : 'inViewport'
}, 's-interactive-demo');
SWebComponent.setDefaultProps({
	mountDependencies : [function() {
		if ( ! this.parentNode || this.parentNode.tagName.toLowerCase() !== 's-interactive-demo') {
			return;
		}
		return __whenAttribute(this.parentNode, 'mounted');
	}],
	theme : 'material',
	compile: compileServer.compile
}, 's-codemirror');
