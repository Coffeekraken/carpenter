require('webcomponents.js/webcomponents-lite');
require('codemirror/mode/sass/sass.js');
require('codemirror/mode/css/css.js');
require('./webcomponent.props.js');
require('./webcomponent.imports.js');
import prism from 'prismjs'
require('prismjs/components/prism-scss');
require('prismjs/plugins/normalize-whitespace/prism-normalize-whitespace');
prism.highlightAll();
