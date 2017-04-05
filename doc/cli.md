# ```coffeekraken-carpenter``` CLI

The carpenter package expose a simple to use CLI with some options through the ```package.json``` file. Here's the options available:

- ```-p --port``` : The port to start the server on
- ```-t --title``` : The title of the carpenter interface
- ```-l --logo``` : An image url to use as logo
- ```-i --index``` : An url to use as home page
- ```-c --config``` : A javascript config file path to use

## Usage

Here how to use the CLI :

```sh
coffeekraken-carpenter [options]
```

Here's how to use it in your ```package.json``` file:

```json
{
	"scripts": {
		"carpenter": "coffeekraken-carpenter [options]"
	}
}
```
