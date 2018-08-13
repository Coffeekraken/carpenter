<?php

/**
 * Return a path relative to the T_ASSETS_PATH and constant config
 *
 * @param       {String}        $slug       The asset slug to get
 * @param 		{Boolean} 		[$from_server_root=false] 		If returned path need to be relative to the server root or to the T_ROOT_PATH constant
 * @return      {String}                    The corresponding asset path like /dist/my-cool-file.jpg
 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
 */
function t_asset_path($slug, $from_server_root = false) {
	if ($from_server_root) {
		return  t_sanitize_path(T_ASSETS_PATH) . ltrim($slug, '/');
	} else {
		// need to strip the T_ROOT_PATH part from the T_ASSET_PATH to get the
		// wanted path relative to the T_ROOT_PATH one
		$pathRelativeToTDocumentRoot = str_replace(t_sanitize_path(T_ROOT_PATH), '', t_sanitize_path(T_ASSETS_PATH));
		return '/' . ltrim(t_tailslash($pathRelativeToTDocumentRoot), '/') . ltrim($slug, '/');
	}
}
