<?php
/**
 * Check if the script has been called using an ajax request or not
 *
 * @return 		{Boolean} 		true if requested using ajax, false if not
 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
 */
function t_is_ajax_request() {
	return (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest');
}
