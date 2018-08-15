<?php

// quick function to require all files inside a specific folder
function t_require_functions_folder($folder) {
    foreach (scandir(dirname(__FILE__) . '/' . $folder) as $filename) {
        $path = dirname(__FILE__) . '/' . $folder . '/' . $filename;
        if (is_file($path)) {
			// require the file
			require $path;
        }
    }
}

// array
t_require_functions_folder('array');

// cast
t_require_functions_folder('cast');

// html
t_require_functions_folder('html');

// images
t_require_functions_folder('images');

// medias
t_require_functions_folder('medias');

// objects
t_require_functions_folder('objects');

// paths
t_require_functions_folder('paths');

// strings
t_require_functions_folder('strings');

// time
t_require_functions_folder('time');

// utils
t_require_functions_folder('utils');

// views
t_require_functions_folder('views');
