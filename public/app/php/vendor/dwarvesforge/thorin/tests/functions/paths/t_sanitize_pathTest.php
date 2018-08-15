<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;

final class t_sanitize_path_test extends TestCase
{
    public function testRemoveTheLastDot() {
		$path = '/coco/.';
		$this->assertEquals('/coco/', t_sanitize_path($path));
	}

	public function testEndWithASlashEvenIfAlreadyOne() {
		$path = '/coco/';
		$this->assertEquals('/coco/', t_sanitize_path($path));
	}

	public function testEndWithASlash() {
		$path = '/coco';
		$this->assertEquals('/coco/', t_sanitize_path($path));
	}
}
