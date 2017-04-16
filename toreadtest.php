<?php

namespace eheikes\toread\tests\units;

include_once 'toreadcommon.php';

use mageekguy\atoum;
use eheikes\toread;

class api extends atoum\test {
	public function testStub() {
		$api = new toread\api();
		$this->boolean($api->stub())->isTrue();
	}
}
