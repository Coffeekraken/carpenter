# Documentation

Here's how to use the documentation feature of Carpenter.

## Config

Here's how to configure carpenter to display your documentation:

```js
module.exports = {
	// ...
	documentation: {
		files: [
			'node_modules/coffeekraken-s-*/**/*.md',
			'doc/**/*.md',
			'README.md'
		]
	},
}
```
