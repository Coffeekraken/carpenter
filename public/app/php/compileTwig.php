<?php

require 'vendor/autoload.php';

function compile($view, $data, $absoluteViewsPath) {
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
