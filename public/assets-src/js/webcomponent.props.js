import compileServer from 'coffeekraken-compile-server'
import SWebComponent from 'coffeekraken-sugar/js/core/SWebComponent'
import SColor from 'coffeekraken-sugar/js/classes/SColor'
SWebComponent.setDefaultProps({
	mountWhen : 'inViewport'
}, 's-interactive-demo');
SWebComponent.setDefaultProps({
	mountWhen : 'inViewport',
	theme : 'material',
	compile: compileServer.compile
}, 's-codemirror');
SWebComponent.setDefaultProps({
	mountWhen : 'inViewport',
	xColors : ['#435359','#111516'],
	yColors : ['#435359','#111516']
}, 's-trianglify');
