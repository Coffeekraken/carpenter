<?php

/**
 * Make sure the passed string has a slash at the end
 *
 * @param   {String}    $string     The string to process
 * @return  {String}                The string with a slash at the end
 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
 */
function t_tailslash($string) {
    return rtrim($string, '/') . '/';
}
