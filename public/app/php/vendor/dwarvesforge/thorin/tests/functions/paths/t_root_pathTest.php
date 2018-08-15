<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;

final class t_root_path_test extends TestCase
{
    public function testEmptyRootPath() {
		$this->assertEquals('/', t_root_path());
	}

	public function testRootPathWithSlug() {
		$this->assertEquals('/coco.jpg', t_root_path('coco.jpg'));
	}

	public function testRootPathFromServerRoot() {
		$this->assertEquals('/data/web/', t_root_path('', true));
	}

	public function testRootPathFromServerRootWithSlug() {
		$this->assertEquals('/data/web/coco.jpg', t_root_path('coco.jpg', true));
	}
}
