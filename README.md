![Coffeekraken Carpenter](/.resources/doc-header.jpg)

# Carpenter <img src="/.resources/coffeekraken-logo.jpg" height="25px" />

Powerful tool that provide a nice web interface to display your website styleguide and modules/plugins documentations in one place.

> Carpenter is like a architect plan for your website

![Carpenter screenshot](/.resources/carpenter-screenshot.png)

#### **Demo** : [Coffeekraken website carpenter](http://carpenter.coffeekraken.io)

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

## Install

```sh
npm install git+https://git@github.com/Coffeekraken/carpenter.git#release/0.0.1 --save-dev
```

### Configure

The configuration is made through the ```carpenter.config.js``` file that you need to add at the root of your project.
Here's a simple example:

```js
module.exports = {
	title : 'My Cool Website',
	styleguide : {
		files : [
			'dist/css/styleguide.css'
		]
	},
	documentation : {
		files : [
			'node_modules/coffeekraken-s-*/**/*.md',
			'README.md'
		]
	}
}
```

##### [Check out the full config file reference here](doc/config.md)

## Write some styleguide docblocks

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

## Launch

In order to launch Carpenter in your project, you just need to add this line in your ```package.json``` scripts:

```json
{
	"scripts": {
		"carpenter": "coffeekraken-carpenter"
	}
}
```

Then launch Carpenter with

```sh
npm run carpenter
```

## Browser support

| <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/edge.png" alt="IE / Edge" width="16px" height="16px" /></br>IE / Edge | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/firefox.png" alt="Firefox" width="16px" height="16px" /></br>Firefox | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/chrome.png" alt="Chrome" width="16px" height="16px" /></br>Chrome | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/safari.png" alt="Safari" width="16px" height="16px" /></br>Safari |
| --------- | --------- | --------- | --------- |
| IE11+ | last 2 versions| last 2 versions| last 2 versions

> As browsers are automatically updated, we will keep as reference the last two versions of each but this component can work on older ones as well.

## Documentation

- [Configuration](doc/config.md) : All the configuration properties available
- [Node API](doc/node-api.md) : Describe all the exposed Node API methods
- [CLI](doc/cli.md) : CLI options reference
- [Displays](doc/displays.md) : How to display your docblocks into the web interface

## License

The code is available under the [MIT license](LICENSE.txt).
