# Components

Carpenter comes with a useful way to document your **twig/blade** components.

## Folder structure

In order to work well, the component feature need a two-level folder structure. Here's some sample:

- `atoms/button` : OK
- `atoms/small/button` : ERROR
- `molecules/login` : OK
- etc...

## Exemple

Here's an exemple with a simple `button` component:

### `app/views/button/button.blade.php`

```html
<a class="btn btn--{{ $color or 'default' }} btn--{{ $type or 'default' }}"
	title="{{ $title }}"
	target="{{ $target or '_self' }}"
	href="{{ $href }}"
>
	{{ $label }}
</a>
```

### `app/views/button/button.data.js`

```js
module.exports = {
	color: "primary",
	type: "default",
	title: "This is a cool button",
	target: null,
	label: "Click me!",
	href: "https://google.com"
}
```

### `app/views/button/button.md`

```markdown
# Button

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dapibus felis at sollicitudin efficitur. Vivamus risus nunc, vulputate imperdiet viverra eu, gravida eget arcu. Quisque sollicitudin euismod lorem, vitae varius mi vestibulum non. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis condimentum nibh vel mi condimentum rhoncus. Etiam sed ante a tortor lacinia porttitor. Donec vestibulum porta dignissim. Mauris ut tellus massa.
```

## Data files `.data.js|yml`

Each component can have **one or more** data file. By default, the data file is names like so:

```
{component-name}.data.js
{component-name}.data.yml
```

But you can create more than one data file by following this pattern:

```
{component-name}.{something}.data.js
{component-name}.{something}.data.yml
```

By doing this, you can have multiple "state" of your component documented easily.

## Markdown file `.md`

Each component can have 1 markdown file called `{component-name}.md`. Using this file, you can document your component more deeply if needed.

## Metas file `.metas.js`

This file is used to specify some metas data like some todos, the status of the component, etc... Here's the full metas file references:

```js
module.exports = {
	status: 'in-progress', // start, in-progress, ready
	todo: [
		'Something cool to do'
	],
	contributors: [{
		name: 'Olivier Bossel',
		email: 'olivier.bossel@gmail.com'
	}],
	height: null // specify the height to apply to the preview iframe
}
```

## Twig namespaces

It's possible to set the twig namespaces by setting the `TWIG_NAMESPACES` constant like so:

```php
define('TWIG_NAMESPACES', [
	['path', 'namespace'],
	['/path/to/namespace/atoms','atoms']
])
```
