<?php

/**
 * Render a view with the data passed to it and return it
 *
 * @param       {String}        $slug       The view slug to render relative to the S_VIEW_PATH constant config
 * @param       {Array}         [$data=null]       The data array to pass as extracted variables to the view
 * @return      {String}                    The rendered view
 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
 */
function t_render($slug, $data = []) {
    extract($data);
	$slug = rtrim($slug, '.php');
	ob_start();
	require t_tailslash(T_VIEWS_PATH) . $slug . '.php';
	return ob_get_clean();
}
