# Styleguide

Here's how to use the styleguide feature of Carpenter.

## Config

Here's how to configure carpenter to parse and display your styleguide:

```js
module.exports = {
	// ...
	styleguide: {
		files: [
			'dist/css/styleguide.css'
		]
	}
}
```

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
