<?php
/**
 * @class
 * @name 	Thorin
 * Facade class that provide all the utilities function through the Thorin static methods
 * @example 	php
 * print Thorin::render_blade('my-cool-view', (object) []);
 *
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
class Thorin {

	/**
	 * Catch static calls to redirect it to the corresponding t_... function if it exist
	 * @name __callStatic
	 * @param 	{String} 		$name 		The function name to call
	 * @param 	{Array} 		$arguments 	The arguments passed to the static call
	 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
	 */
	public static function __callStatic($name, $arguments)
	{
		// check if function is available in the stack
		if (function_exists('t_'.$name)) {
			return call_user_func_array('t_'.$name, $arguments);
		} else {
			throw new Exception('Try to call a function "'.$name.'" that does not exist on "Thorin"');
		}
	}
}
