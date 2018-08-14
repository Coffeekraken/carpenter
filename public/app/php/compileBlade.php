<?php

function compile($view, $data, $absoluteViewsPath, $absolutePhpBootstrapPath) {
	// prepare data to pass it to the template engine
	$data = json_decode(json_encode($data), FALSE);
	$data = (array) $data;
	// load the project environment if
	// the config.phpBootstrapPath is set
	if (@$absolutePhpBootstrapPath) {
		require($absolutePhpBootstrapPath);
	}
	// bootstrap
	require_once 'bootstrap.php';
	// render the view using blade
	$views = $absoluteViewsPath;
	$cache = $absoluteViewsPath . '/.cache';
	$blade = new Philo\Blade\Blade($views, $cache);
	return $blade->view()->make($view, $data)->render();
}

// print compile('components/back-to-top/back-to-top',
// 	[
// 		"label" => "hello world"
// 	],
// 	'/Users/olivierbossel/data/web/ploom/brandsite-template/app/views',
// 	'/Users/olivierbossel/data/web/ploom/brandsite-template/app/bootstrap.php'
// );

// print compile('atoms/button/button',
// 	[
// 		"label" => "hello world"
// 	],
// 	'/Users/olivierbossel/data/web/coffeekraken/carpenter/app/views',
// 	null
// );
