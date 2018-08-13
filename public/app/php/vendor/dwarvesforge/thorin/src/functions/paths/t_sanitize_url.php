<?php

/**
 * Return a sanitized version of the passed path. Here's the actions applied on the path:
 * - Ensure no double "/" in the path like http://my-domain.com/some//thing
 * - Apply the filter_var function withe the FILTER_SANITIZE_URL flag
 * @param       {String}        $url       	The url to process
 * @return 		{String} 					The sanitized url
 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
 */
function t_sanitize_url($url) {
	$url = filter_var($url, FILTER_SANITIZE_URL);
	$url = preg_replace('/([^:])(\/{2,})/', '$1/', $url);
	return $url;
}
