const __handlebars = require('handlebars');
const __config = require('../../config');
module.exports = function(data) {
	const template = __handlebars.compile(`
		<div class="gr-12 gutter-bottom">
			<figure class="preview-color">
				<div class="preview-color__color" style="background-color:{{color}}"></div>
				<div class="p-small">
					<div class="row">
						<div class="gr-6 t-truncate">
							{{{name}}}
						</div>
						<div class="gr-6">
							<span class="pull-right preview-color__color-code">
								{{color}}
							</span>
						</div>
					</div>
				</div>
			</figure>
		</div>
	`);
	return template(data);
}
