<?php

/**
 * Convert variable to boolean
 *
 * @param       {String}        $var         The var to be convert in boolean
 * @return      {Boolean}                    true or false
 * @author 		Paul Balanche <pb@buzzbrothers.ch>
 */
function t_to_boolean($var) {
	if(is_numeric($var) ){
		if($var == 0)
			return false;
		else
			return true;
	}
	else{
		switch($var){
			case 'true':
				return true;

			case 'false':
				return false;
		}
	}
	return false;
}
