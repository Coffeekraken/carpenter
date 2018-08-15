# t_asset_path

Return a path relative to the T_ASSETS_PATH and constant config



Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$slug  |  **{ [String](http://php.net/manual/en/language.types.string.php) }**  |  The asset slug to get  |  required  |
$from_server_root  |  **{ [Boolean](http://php.net/manual/en/language.types.boolean.php) }**  |  If returned path need to be relative to the server root or to the T_ROOT_PATH constant  |  optional  |  false

Return **{ [String](http://php.net/manual/en/language.types.string.php) }** The corresponding asset path like /dist/my-cool-file.jpg

Author : Olivier Bossel <olivier.bossel@gmail.com>