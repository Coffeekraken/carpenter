<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;

final class t_root_url_test extends TestCase
{
    public function testEmptyRootUrl() {
		$this->assertEquals('http://thorin.io/', t_root_url());
	}

	public function testRootUrlWithSlug() {
		$this->assertEquals('http://thorin.io/coco.jpg', t_root_url('coco.jpg'));
	}

	public function testRootUrlWithSlugRmoveDoubleSlashes() {
		$this->assertEquals('http://thorin.io/img/coco.jpg', t_root_url('/img//coco.jpg'));
	}
}
