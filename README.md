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
	- [See the documentation](doc/styleguide.md)
2. Aggregate markdown documentations
	- Tell Carpenter where to look for markdown files, it take care of displaying them nicely
	- Aggregate all the useful documentations in one interface
	- [See the documentation](doc/documentation.md)
3. Document your twig/blade components
	- Compile your twig/blade templates
	- Support data files to compile your templates with
	- [See the documentation](doc/components.md)

## Install

```sh
npm install coffeekraken-carpenter --save-dev
```

### Configure

The configuration is made through the ```carpenter.config.js``` file that you need to add at the root of your project.
Here's a simple example:

```js
module.exports = {
	title: 'My Cool Website',
	styleguide: {
		files: [
			'dist/css/styleguide.css'
		]
	},
	documentation: {
		files: [
			'node_modules/coffeekraken-s-*/**/*.md',
			'README.md'
		]
	},
	components: {
		inject: [
			'dist/css/style.css',
			'dist/js/app.js'
		],
		viewsRootPath: 'app/views',
		phpBootstrapPath: 'app/bootstrap.php',
		saveCompiled: false
	}
}
```

##### [Check out the full config file reference here](doc/config.md)

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

## Documentation

- [Configuration](doc/config.md) : All the configuration properties available
- [Node API](doc/node-api.md) : Describe all the exposed Node API methods
- [CLI](doc/cli.md) : CLI options reference
- [Displays](doc/displays.md) : How to display your docblocks into the web interface
- [Styleguide feature](doc/styleguide.md) : How to use the styleguide feature
- [Documentation feature](doc/documentation.md) : How to use the documentation feature
- [Components feature](doc/components.md) : How to use the components feature

## Browser support

| <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/edge.png" alt="IE / Edge" width="16px" height="16px" /></br>IE / Edge | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/firefox.png" alt="Firefox" width="16px" height="16px" /></br>Firefox | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/chrome.png" alt="Chrome" width="16px" height="16px" /></br>Chrome | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/safari.png" alt="Safari" width="16px" height="16px" /></br>Safari |
| --------- | --------- | --------- | --------- |
| IE11+ | last 2 versions| last 2 versions| last 2 versions

> As browsers are automatically updated, we will keep as reference the last two versions of each but this component can work on older ones as well.

## License

The code is available under the [MIT license](LICENSE.txt).
