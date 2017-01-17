const __handlebars = require('handlebars');
const __config = require('../../config');
module.exports = function editor(data) {
	const language = data.language || 'html';
	const template = __handlebars.compile(`
		<div class="gr-12">
			<h3 class="h4 vr t-capitalize">
				{{{name}}}
			</h3>
			{{#if body}}
				<p class="p p--lead vr">
					{{{body}}}
				</p>
			{{/if}}
			{{#if see}}
				<p class="m-b-big">
					<a class="btn btn--outline btn--primary s-small" href="{{see}}" target="_blank">
						See more information
					</a>
				</p>
			{{/if}}
			<s-interactive-demo class="m-b-medium" layout="vertical" hide="['html']"
				styles="/${__config.styleguide.files.filter(function(file) { return file.substr(-4) === '.css' })}"
				scripts="/${__config.styleguide.files.filter(function(file) { return file.substr(-3) === '.js' })}">
				<s-codemirror id="${language}" language="${language}">
					{{{example.body}}}
				</s-codemirror>
			</s-interactive-demo>
		</div>
	`);
	return template(data);
}
