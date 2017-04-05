# Node API

The carpenter package expose a simple API to help you extract styleguide docblocks and some other nice features.

## ```styleguide.extractFromFile(path)```

Extract styleguide docblocks from one or more files

```js
const carpenterApi = require('coffeekraken-carpenter');
// extract from 1 file
const docblocksString = carpenterApi.styleguide.extractFromFile('data/my-cool-file.js');
// extract from multiple files
const otherDocblocksString = carpenterApi.styleguide.extractFromFile([
	'data/my-cool-file.js',
	'data/my-other-cool-file.css'
]);
```

## ```styleguide.extractFromFileTo(path, to)```

Same as the ```styleguide.extractFromFile``` function but output the result directly in a file that you specify

```js
const carpenterApi = require('coffeekraken-carpenter');
// extract from 1 file
const docblocksString = carpenterApi.styleguide.extractFromFile('data/my-cool-file.js', 'output.txt');
// extract from multiple files
const otherDocblocksString = carpenterApi.styleguide.extractFromFile([
	'data/my-cool-file.js',
	'data/my-other-cool-file.css'
], 'output.txt');
```

## ```styleguide.extractFromString(string)```

Same as the previous functions but take a string as parameter instead of file path

```js
const carpenterApi = require('coffeekraken-carpenter');
// extract from 1 file
const docblocksString = carpenterApi.styleguide.extractFromFile('my cool string... bla bla bla');
```

## ```styleguide.extractFromStringTo(string, to)```

Same as the previous functions but take a string as parameter instead of file path

```js
const carpenterApi = require('coffeekraken-carpenter');
// extract from 1 file
const docblocksString = carpenterApi.styleguide.extractFromFile('my cool string... bla bla bla', 'output.txt');
```
