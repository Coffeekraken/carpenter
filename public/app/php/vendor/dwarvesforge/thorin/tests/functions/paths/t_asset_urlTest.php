<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;

final class t_asset_url_test extends TestCase
{
    public function testImgAssetReturnGoodPath() {
		$this->assertEquals('http://thorin.io/dist/img/coco.jpg', t_asset_url('img/coco.jpg'));
	}
}
