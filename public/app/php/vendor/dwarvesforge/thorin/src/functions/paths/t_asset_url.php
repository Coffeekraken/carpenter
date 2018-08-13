<?php

/**
 * Return a url relative to the T_ASSETS_PATH and the T_ROOT_URL constant config
 *
 * @param       {String}        $slug       The asset slug to get
 * @return      {String}                    The corresponding asset uri
 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
 */
function t_asset_url($slug) {

	// need to strip the T_ROOT_PATH part from the T_ASSET_PATH to get the
	// wanted path relative to the T_ROOT_PATH one
	$pathRelativeToTDocumentRoot = str_replace(t_sanitize_path(T_ROOT_PATH), '', t_sanitize_path(T_ASSETS_PATH));
	$path = t_tailslash(T_ROOT_URL) . ltrim(t_tailslash($pathRelativeToTDocumentRoot), '/') . ltrim($slug, '/');

	return t_sanitize_url($path);
}
