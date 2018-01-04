<?php
require('init.php');
@$uId=$_REQUEST['uId'] or die('not uId');
$sql="SELECT title,price,pId FROM y_product WHERE pId IN(SELECT pId FROM y_cart WHERE uId='$uId')";

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