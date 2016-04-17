<?php
/*
 * 密码Check
 */

define('VERIFY_PASS', 12306);

// 接收HTTP POST信息
$data = $_POST;

$ret = [];

if (!array_key_exists("passport", $data)) {
	$ret = ["ret" => 1];
} else if ($data["passport"] == VERIFY_PASS){
	$ret = ["ret" => 0];
} else {
	$ret = ["ret" => 2];
}

echo json_encode($ret, true);
?>