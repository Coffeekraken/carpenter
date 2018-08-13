<?php

/**
 * Return a clean string with max lenght
 *
 * @param   {String}    $string     	The string to be cut
 * @param   {Int}   	$length     	The length of string
 * @param   {String}    $cutString     	The suffix to be added if necessary
 * @return  {String}                	The cutted string
 * @author 		Paul Balanche <pb@buzzbrothers.ch>
 */
function t_clean_cut($string, $length, $cutString = '...') {
    $string = strip_tags($string);

	if(strlen($string) <= $length){
		return $string;
	}

	$str = substr($string, 0, $length-strlen($cutString)+1);
	return substr($str,0,strrpos($str,' ')).$cutString;
}
