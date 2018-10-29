<?php

function compile($view, $data, $absoluteViewsPath, $absolutePhpBootstrapPath) {
	// load the project environment if
	// the config.phpBootstrapPath is set
	if (@$absolutePhpBootstrapPath) {
		require($absolutePhpBootstrapPath);
	}
	// bootstrap
	require_once 'bootstrap.php';
	// render the twig view
	$loader = new Twig_Loader_Filesystem($absoluteViewsPath);
	// namespaces
	if (@TWIG_NAMESPACES) {
		foreach(TWIG_NAMESPACES as $twigNamespace) {
			$loader->addPath($twigNamespace[0], $twigNamespace[1]);
		}
	}
	// new twig instance without cache
	$twig = new Twig_Environment($loader, array(
		'cache' => false,
	));
	$template = $twig->load($view);
	return $template->render($data);
}


// print compile('organisms/cool-organism/cool-organism.twig', [
// 	"body" => "Plop World",
// 	"title" => "Hello World",
// 	"button" => [
// 		"url" => "/",
// 		"title" => "Hello",
// 		"label" => "World",
// 		"target" => null
// 	]
// ], '/Users/olivierbossel/data/web/coffeekraken/carpenter/app/views',
// null);


// print compile('atoms/button/button', null, '/Users/olivierbossel/data/web/coffeekraken/carpenter/app/views');
