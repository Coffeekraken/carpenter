# Config constants

Define some configs using constants. These configs will be used across the thorin toolkit functions, etc...



## Public properties


### T_PROTOCOL

Specify the protocol used to request the script. This is usually automatically setting up

Type : **{ [String](http://php.net/manual/en/language.types.string.php) }**

Default : **http:// | https://**


### T_DOMAIN

Specify the domain under which the script has been requested. This is usually automatically setting up

Type : **{ [String](http://php.net/manual/en/language.types.string.php) }**

Default : **$_SERVER['HTTP_HOST']**


### T_ROOT_PATH

Specify the root path where your app is stored absolute to the server root folder.
This is usually automatically setting up using the $_SERVER['DOCUMENT_ROOT'] variable
Need to end with a trailing /

Type : **{ [String](http://php.net/manual/en/language.types.string.php) }**

Default : **rtrim($_SERVER['DOCUMENT_ROOT'], '/') . '/'**


### T_ROOT_URL

Specify the root url under which the script has been requested. This is usually automatically setting up

Type : **{ [String](http://php.net/manual/en/language.types.string.php) }**

Default : **T_PROTOCOL . T_DOMAIN**


### T_VIEWS_PATH

Specify where the views are stored relative to the server root folder.
Need to end with a trailing /
This is bein used in functions like "t_render_blade", "t_render", etc...

Type : **{ [String](http://php.net/manual/en/language.types.string.php) }**

Default : **rtrim(T_ROOT_PATH, '/') . '/app/views/'**


### T_CACHE_PATH

Specify where the cache are stored relative to the server root folder
Need to end with a trailing /
This is bein used in functions like "t_render_blade", "t_optimize_image", etc...

Type : **{ [String](http://php.net/manual/en/language.types.string.php) }**

Default : **rtrim(T_ROOT_PATH, '/') . '/app/cache/'**


### T_ASSETS_PATH

Specify where the assets (images, etc...) are stored relative to the server root folder.
Need to end with a trailing /
This is bein used in functions like "t_asset_url", "t_asset_path", etc...

Type : **{ [String](http://php.net/manual/en/language.types.string.php) }**

Default : **rtrim(T_ROOT_PATH, '/') . '/dist/'**


### T_IMAGES_QUALITY

Specify the default image quality to use across the toolkit.
This is bein used in functions like "t_optimize_image", etc...

Type : **{ [Integer](http://php.net/manual/en/language.types.integer.php) }**

Default : **60**


### T_IMAGES_MAX_WIDTH

Specify the default max image width to use across the toolkit.
This is bein used in functions like "t_optimize_image", etc...

Type : **{ [Integer](http://php.net/manual/en/language.types.integer.php) }**

Default : **null**


### T_IMAGES_MAX_HEIGHT

Specify the default max image height to use across the toolkit.
This is bein used in functions like "t_optimize_image", etc...

Type : **{ [Integer](http://php.net/manual/en/language.types.integer.php) }**

Default : **null**