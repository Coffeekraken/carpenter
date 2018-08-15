<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;

final class t_asset_path_test extends TestCase
{
    public function testImgAssetReturnGoodPath() {
		$this->assertEquals('/dist/img/coco.jpg', t_asset_path('img/coco.jpg'));
	}
}
