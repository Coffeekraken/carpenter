<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;

final class t_render_blade_test extends TestCase
{
    public function testRender() {
		$res = '<div>Hello World</div>';
		$this->assertEquals(trim(t_render_blade('test', [
			'message' => 'Hello World'
		])), $res);
	}
}
