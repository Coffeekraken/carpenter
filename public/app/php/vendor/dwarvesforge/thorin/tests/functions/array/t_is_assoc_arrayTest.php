<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;

final class t_is_assoc_array extends TestCase
{
    public function testPassingAnAssocArray() {
		$this->assertEquals(t_is_assoc_array([
			'hello' => 'world'
		]), true);
	}
	public function testPassingANonAssocArray() {
		$this->assertEquals(t_is_assoc_array([
			'hello', 'world'
		]), false);
	}

	public function testPassingAString() {
		$this->assertEquals(t_is_assoc_array('hello world'), true);
	}
}
