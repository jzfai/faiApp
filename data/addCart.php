<?php
require('init.php');
@$pId=$_REQUEST['pId'] or die('not pId');
@$uId=$_REQUEST['uId']or die('not uId');
@$count=$_REQUEST['count']or die('not count');

$sql="INSERT INTO y_cart VALUES(NULL,'$pId','$count','$uId')";
$result=mysqli_query($conn,$sql);
$row=mysqli_affected_rows($conn);
if($row>0){
  $arr=['code'=>1,'msg'=>'添加成功'];
  echo json_encode($arr);
}
else{
  $arr=['code'=>-1];
  echo json_encode($arr);
}
?>
