# t_sanitize_url

Return a sanitized version of the passed path. Here's the actions applied on the path:
- Ensure no double "/" in the path like http://my-domain.com/some//thing
- Apply the filter_var function withe the FILTER_SANITIZE_URL flag


Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$url  |  **{ [String](http://php.net/manual/en/language.types.string.php) }**  |  The url to process  |  required  |

Return **{ [String](http://php.net/manual/en/language.types.string.php) }** The sanitized url

Author : Olivier Bossel <olivier.bossel@gmail.com>