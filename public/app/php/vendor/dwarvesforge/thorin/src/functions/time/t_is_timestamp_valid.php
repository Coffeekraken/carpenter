<?php

/**
 * Check if timestamp is valid
 *
 * @param       {String}        $strTimestamp         The var to be check
 * @return      {Boolean}                    		  true or false
 * @author 		Paul Balanche <pb@buzzbrothers.ch>
 */
function t_is_timestamp_valid($strTimestamp) {
	return ((string) (int) $strTimestamp == $strTimestamp)
            && ($strTimestamp <= PHP_INT_MAX)
            && ($strTimestamp >= ~PHP_INT_MAX);
}
