<?php
require('init.php');
@$count=$__REQUEST['count'] or die('not count');
@$pId=$__REQUEST['pId'] or die('not pId');
$sql="UPDATE y_cart SET count='$count' WHERE pId='$pId'";
$result=mysqli_query($conn,$sql);
$row=mysqli_affected_rows($conn);
if($row>0){
   $arr=['code'=>'1','msg'=>'更新成功'];
   echo json_encode($arr);
}
else{
   $arr=['code'=>'-1','msg'=>'更新失败'];
   echo json_encode($arr);
}
?>