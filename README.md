# Carpenter <small>0.0.1</small>

Powerful tool that provide a nice web interface to display your website styleguide and modules/plugins documentations in one place.

> Carpenter is like a architect plan for your website

* Homepage: [Coffeekraken](http://coffeekraken.io)
* Source: [Github](http://github.com/coffeekraken/styleguide)
* Twitter: [Coffeekraken](https://twitter.com/coffeekrakenio)

## Features

1. Build styleguide directly from your CSS codebase
	- Reflect perfectly what your website looks like
	- List all features that your CSS cover
	- Interactive demo
2. Aggregate markdown documentations
	- Tell Carpenter where to look for markdown files, it take care of displaying them nicely
	- Aggregate all the useful documentations in one interface

### Install

```npm install git+https://git@github.com/Coffeekraken/carpenter.git#release/0.0.1 --save-dev```

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

In order to launch Carpenter in your project, you just need to add this line in your ```package.json``` scripts:

```json
{
	"scripts": {
		"carpenter": "coffeekraken-carpenter"
	}
}
```

Then launch Carpenter with

```npm run carpenter```

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
