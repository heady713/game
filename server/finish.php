<?php
/*
 * 游戏结算
 */

require_once 'DbService.class.php';

// 接收HTTP POST信息
$data = $_POST;

$db = new DbService();
$ret = [];

if (empty($data)) {
	$ret = ["ret" => 1];
} else {
	$r = $db->gameFinish($data, $ret);
}

echo json_encode($ret, true);
?>