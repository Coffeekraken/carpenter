const __handlebars = require('handlebars');
const __faker = require('Faker');
const __config = require('../../config');
module.exports = function(data) {
	const language = data.language || 'html';
	const sentence = __faker.Lorem.sentence();
	const template = __handlebars.compile(`
		<div class="gr-12 vr">
			<h3 class="h4 vr t-capitalize">
				{{{name}}}
			</h3>
			{{#if body}}
				<p class="p vr">
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
			<s-interactive-demo layout="vertical" hide="['html']" styles="/${__config.styleguide.files.filter(function(file) { return file.substr(-4) === '.css' })}">
				<s-codemirror id="${language}" language="${language}">
					<div class="tf vr">
						<h3 style="font-family:${data['font-family']}">
							${sentence}
						</h3>
						<p style="font-family:${data['font-family']}">
							Proin vel purus in arcu interdum aliquet quis nec sapien. Aenean volutpat purus hendrerit velit congue tincidunt a gravida tortor. Phasellus ultrices porta mi ac gravida. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed non diam eu quam lobortis lobortis at a tortor. Nunc euismod, massa eu eleifend convallis, tellus velit dapibus neque, ac aliquet quam sapien at tortor. Etiam vehicula quam a sem malesuada varius. Suspendisse potenti. Suspendisse pretium turpis a tristique consequat. Duis eget ultricies risus. Phasellus quis mi et ex accumsan porttitor posuere vehicula nunc. Maecenas malesuada lacus a odio congue feugiat. Nam a ligula a ex efficitur posuere ac ac libero.
						</p>
					</div>
				</s-codemirror>
			</s-interactive-demo>
		</div>
	`);
	return template(data);
}
