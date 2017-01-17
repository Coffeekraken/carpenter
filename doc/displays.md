# Displays

The displays is how the styleguide block will be displayed inside the web interface.

Here's the list of default provided displays:

##  Editor <small>default</small>

The ```editor``` display will provide an interactive demo editor with the result preview
This is the default display so you don't need to specify it in your docblock.

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

## Font

The ```font``` display will print out an interactive demo editor with the result of the specified font-family

```css
/**
 * @name 		My Cool Font
 * @styleguide 	Font / Faces
 * @display 	font
 * @font-family my-cool-font
 */
```

## Color

The ```color``` display will print out a swatch card with the color preview, the name and the color code.

```css
/**
 * @name 		My Cool Color
 * @styleguide 	Colors / Swatches
 * @display 	color
 * @color 		#ffdd00
 */
```

## Custom display

Coming soon...
