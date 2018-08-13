# t_sanitize_path

Sanitize a path for example like "/my/cool/path/." to "/my/cool_path/"
It will do these actions:
1. Remove a trailing "."
2. Make sure the path finish with a "/"



Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$path  |  **{ [String](http://php.net/manual/en/language.types.string.php) }**  |  The path to sanitize  |  required  |

Return **{ [String](http://php.net/manual/en/language.types.string.php) }** The sanitize path

Author : Olivier Bossel <olivier.bossel@gmail.com>