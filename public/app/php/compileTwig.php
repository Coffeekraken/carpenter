<?php

function compile($view, $data, $absoluteViewsPath, $absolutePhpBootstrapPath) {
	// prepare data to pass it to the template engine
	// $data = json_decode(json_encode($data), FALSE);
	// $data = (array) $data;
	// load the project environment if
	// the config.phpBootstrapPath is set
	if (@$absolutePhpBootstrapPath) {
		require($absolutePhpBootstrapPath);
	}
	// bootstrap
	require_once 'bootstrap.php';
	// render the twig view
	$loader = new Twig_Loader_Filesystem($absoluteViewsPath);
	$twig = new Twig_Environment($loader, array(
		'cache' => false,
	));
	$template = $twig->load($view);
	return $template->render($data);
}


// print compile('organisms/cool-organism/cool-organism.twig', [
// 	"label" => "Plop World",
// 	"title" => "Hello World"
// ], '/Users/olivierbossel/data/web/coffeekraken/carpenter/app/views');


// print compile('atoms/button/button', null, '/Users/olivierbossel/data/web/coffeekraken/carpenter/app/views');
