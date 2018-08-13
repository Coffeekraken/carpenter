# t_render

Render a view with the data passed to it and return it



Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$slug  |  **{ [String](http://php.net/manual/en/language.types.string.php) }**  |  The view slug to render relative to the S_VIEW_PATH constant config  |  required  |
$data  |  **{ [Array](http://php.net/manual/en/language.types.array.php) }**  |  The data array to pass as extracted variables to the view  |  optional  |  null

Return **{ [String](http://php.net/manual/en/language.types.string.php) }** The rendered view

Author : Olivier Bossel <olivier.bossel@gmail.com>