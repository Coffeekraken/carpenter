# Thorin

Facade class that provide all the utilities function through the Thorin static methods

### Example
```php
	print Thorin::render_blade('my-cool-view', (object) []);
```
Author : Olivier Bossel <olivier.bossel@gmail.com>




## Static methods


### __callStatic

Catch static calls to redirect it to the corresponding t_... function if it exist


Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$name  |  **{ [String](http://php.net/manual/en/language.types.string.php) }**  |  The function name to call  |  required  |
$arguments  |  **{ [Array](http://php.net/manual/en/language.types.array.php) }**  |  The arguments passed to the static call  |  required  |

Author : Olivier Bossel <olivier.bossel@gmail.com>

**Static**