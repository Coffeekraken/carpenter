<?php

/**
 * Check if array is assocative or not
 * @param       {Array}        $arr       	The array to check
 * @return 		{Boolean} 					true if is an assoc array, false if not
 * @author 		Paul Balanche <pb@buzzbrothers.ch>
 */
function t_is_assoc_array($arr) {
	if (array() === $arr) return false;
	return @array_keys($arr) !== range(0, count($arr) - 1);
}
