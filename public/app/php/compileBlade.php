<?php

require 'vendor/autoload.php';
use Philo\Blade\Blade;

function compile($view, $data, $absoluteViewsPath) {
	$views = $absoluteViewsPath;
	$cache = $absoluteViewsPath . '/cache';
	$blade = new Blade($views, $cache);
	return $blade->view()->make($view, $data)->render();
	// return $absoluteViewsPath;
}


// print compile('atoms/button/button', [
// 	"label" => "Plop World"
// ], '/Users/olivierbossel/data/web/coffeekraken/carpenter/app/views');


// print compile('atoms/button/button', null, '/Users/olivierbossel/data/web/coffeekraken/carpenter/app/views');
