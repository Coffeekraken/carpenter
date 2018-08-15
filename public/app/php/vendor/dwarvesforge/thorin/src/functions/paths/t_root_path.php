<?php

/**
 * Return the root website url depending on the T_ROOT_PATH config
 *
 * @param       {String}        $slug       An optional slug to add to the root url
 * @param 		{Boolean} 		[$from_server_root=false] 		If returned path need to be relative to the server root or to the T_ROOT_PATH constant
 * @return      {String}                    The corresponding root url
 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
 */
function t_root_path($slug = '', $from_server_root = false) {

	if ($from_server_root) {
		return t_sanitize_path(T_ROOT_PATH) . ltrim($slug, '/');
	} else {
		// need to strip the T_ROOT_PATH part from the T_ASSET_PATH to get the
		// wanted path relative to the T_ROOT_PATH one
		return '/' . ltrim($slug, '/');
	}
}
