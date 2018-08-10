# Components

Carpenter comes with a useful way to document your **twig/blade** components.
Here's an exemple with a simple `button` component:

### `app/views/button/button.blade.php`

```php
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

## Data files

Each component can have **one or more** data file. By default, the data file is names like so:

```
{component-name}.data.js
```

But you can create more than one data file by following this pattern:

```
{component-name}.{something}.data.js
```

By doing this, you can have multiple "state" of your component documented easily.
