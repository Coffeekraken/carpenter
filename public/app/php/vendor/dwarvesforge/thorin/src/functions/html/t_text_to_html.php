<?php

/**
 * Format a simple passed text into a nice formated html one.
 * This will transform the new line into <br>, as well as the line breaks into paragraphs
 *
 * @param       {String}    $text       The text to format
 * @return      {String}                The newly formated html
 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
 */
function t_text_to_html($text) {
    $text = trim($text);
	$text = ltrim($text, '<p>');
	$text = rtrim($text, '</p>');
    $text = "<p>" . implode( "</p><p>", preg_split( '/\n(?:\s*\n)+/', $text ) ) . "</p>";
	$text = nl2br($text);
    return $text;
}
