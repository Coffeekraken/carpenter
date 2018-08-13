<?php

/**
 * Escape the passed string to ensure it will not break any html when printed inside an attribute
 *
 * @param       {String}        $string         The string to process
 * @return      {String}                        The safe string to put inside any html attribute
 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
 */
function t_esc_attr($string) {
    return htmlspecialchars($string, ENT_QUOTES);
}
