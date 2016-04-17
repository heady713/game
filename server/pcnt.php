<?php
/*
 * 获取总玩家数量
 */

require_once 'DbService.class.php';

$db = new DbService();
$ret = [];

$r = $db->playerTotalCount($ret);

echo json_encode($ret, true);
?>