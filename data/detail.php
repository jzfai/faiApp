<?php
require('init.php');
@$pId=$_REQUEST['pId'] or die('not pId');

$sql="SELECT * FROM y_product WHERE pId='$pId'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
echo json_encode($row);
?>