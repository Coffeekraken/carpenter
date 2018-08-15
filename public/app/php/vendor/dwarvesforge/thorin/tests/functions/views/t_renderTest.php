<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;

final class t_render_test extends TestCase
{
    public function testRender() {
		$res = '<div>Hello World</div>';
		$this->assertEquals(trim(t_render('test', [
			'message' => 'Hello World'
		])), $res);
	}
}
