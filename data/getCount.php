<?php
require('init.php');
@$pId=$_REQUEST['uId'] or die('not uId');
$sql="SELECT count FROM y_cart WHERE uId='$uId')";

$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_all($result,MYSQLI_ASSOC);
if($row>0){
  echo json_encode($row);
}
else{
  $arr=['code'=>-1];
  echo json_encode($arr);
}
?>