<?php

/**
 * Format/beautify array
 *
 * @param       {Array}        $array         The array to be print
 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
 */
function t_pre($array) {
	echo "<pre>";
	print_r($array);
	echo "</pre>";
}
