# Coffeekraken Carpenter <small>0.0.1</small>

Powerful styleguide generator that take as source some docblocks right from your CSS codebase so it will be always reflect your actual website available styles.

* Homepage: [Coffeekraken](http://coffeekraken.io)
* Source: [Github](http://github.com/coffeekraken/styleguide)
* Twitter: [Coffeekraken](https://twitter.com/coffeekrakenio)

## Quick start

### Install

```npm install git+https://git@github.com/Coffeekraken/styleguide.git#release/0.0.1 --save-dev```

### Configure

The configuration is made through the ```carpenter.config.js``` file that you need to add at the root of your project.
Here's a simple example:

```js
module.exports = {
	// server port
	port : 3333,

	// title
	title : 'My Cool Website',

	// logo
	logo : 'dist/img/my-cool-logo.png',

	// styleguide configuration
	styleguide : {
		// styleguide files to parse
		// these files will be loaded into interactive demo
		files : [
			'dist/css/styleguide.css'
		]
	},

	// documentation configuration
	documentation : {
		// markdown files to load (array of glob pattern)
		files : [
			'node_modules/coffeekraken-s-*/**/*.md',
			'README.md'
		]
	}
}
```

### Write some styleguide docblocks

In your ```styleguide.css``` file, you need to document your styleguide like so:

```css
/**
 * @name 		My Cool Component
 * @styleguide 	Components / My Cool Component
 * @example 	html
 * <div class="my-cool-component">
 * 	Hello world
 * </div>
 */
```

### Launch

In order to launch the styleguide of your project, you just need to add this line in your ```package.json``` scripts:

```json
{
	"scripts": {
		"carpenter": "coffeekraken-carpenter"
	}
}
```

Then launch your styleguide with

```npm run styleguide```

## Features

1. Parse docblocks marked with ```@styleguide``` into your codebase files
2. Transform these docblocks into json using the [coffeekraken-docblock-parser](https://github.com/Coffeekraken/docblock-parser) package
3. Provide a nice web interface that display your styleguide with interactive demos
4. Provide a nice and simple [API](doc/api.md) to preparse your styleguide if wanted

## Browser support

* Chrome *(latest 2)*
* Firefox *(latest 2)*
* Internet Explorer 10+
* Opera *(latest 2)*
* Safari *(latest 2)*

## Documentation

- [Configuration](doc/config.md) : All the configuration properties available
- [API](doc/api.md) : Describe all the exposed API methods
- [Displays](doc/displays.md) : How to display your docblocks into the web interface

## License

The code is available under the [MIT license](LICENSE.txt).
