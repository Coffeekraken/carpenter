# Displays

The displays is how the styleguide block will be displayed inside the web interface.

Here's the list of default provided displays:

- **[Editor](#editor-display)** : Display an interactive code editor
- **[Font](#font-display)** : Display a font family sample
- **[Color](#color-display)** : Display a color sample with name and code
- **[Custom display](#custom-display)** : Create your own display to enhance your styleguides

<a name="editor-display"></a>
##  Editor <small>default</small>

The ```editor``` display will provide an interactive demo editor with the result preview
This is the default display so you don't need to specify it in your docblock.

![Editor display](/.resources/display-editor.png)

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

<a name="font-display"></a>
## Font

The ```font``` display will print out an interactive demo editor with the result of the specified font-family

![Editor display](/.resources/display-font.png)

```css
/**
 * @name 		My Cool Font
 * @styleguide 	Font / Faces
 * @display 	font
 * @font-family my-cool-font
 */
```

<a name="color-display"></a>
## Color

The ```color``` display will print out a swatch card with the color preview, the name and the color code.

![Editor display](/.resources/display-color.png)

```css
/**
 * @name 		My Cool Color
 * @styleguide 	Colors / Swatches
 * @display 	color
 * @color 		#ffdd00
 */
```

<a name="custom-display"></a>
## Custom display

You can create your own displays if the default ones does not fit you needs. To expose some new displays, follow these simple steps:

#### Create your displays

Create a js file that export your displays like so:

```js
module.exports = {
	'my-cool-display' : function(docblockObj) {
		// return the html for your display
		return `
			<div class="gr-12">
				<h1>${docblockObj.name}</h1>
				<!-- etc... -->
			</div>
		`;
	},
	// etc...
};
```

> The ```docblockObj``` will contains all the docblock tags found

#### Register your display in your ```carpenter.config.js``` file

```js
module.exports = {

	// styleguide configuration
	styleguide : {

		// additionnal displays files to load
		displays : [
			'path-to-my-display-file.js'
		]

	}
};
```

#### Use your new display

In your codebase, you can now use your display like so:

```js
/**
 * @name    Hello my cool display
 * This is an example of usage of my new my-cool-display
 * @styleguide      Objects / My Cool Item
 * @display         my-cool-display
 */
```
