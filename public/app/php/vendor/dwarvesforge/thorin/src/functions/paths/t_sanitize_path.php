<?php

/**
 * Sanitize a path for example like "/my/cool/path/." to "/my/cool_path/"
 * It will do these actions:
 * 1. Remove a trailing "."
 * 2. Make sure the path finish with a "/"
 *
 * @param       {String}        $path       The path to sanitize
 * @return      {String}                    The sanitize path
 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
 */
function t_sanitize_path($path) {
	$splits = explode('/', $path);
	if (count($splits) == 0) return $path;
	// remove last dot like /.
	if ($splits[count($splits)-1] == '.') {
		array_pop($splits);
	}
	// return the new
	return t_tailslash(implode('/', $splits));
}
