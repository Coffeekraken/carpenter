<?php

use Embed\Embed;

/**
 * Get the embed code for the passed url
 *
 * @param   {String}        $url        The url of the video to embed
 * @return  {String}                    The embed code
 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
 */
function t_embed($url) {
    $info = Embed::create($url);
    $code = $info->code;
    return $code;
}
