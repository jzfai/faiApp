<?php
require('init.php');
@$row=$_REQUEST['row']or die('not row');
$sql="DELETE FROM y_cart WHERE pId='$row'";
$result=mysqli_query($conn,$sql);
$row=mysqli_affected_rows($conn);
if($row>0){
   $arr=['code'=>'1','msg'=>'删除成功'];
   echo json_encode($arr);
}
else{
   $arr=['code'=>'-1','msg'=>'删除失败'];
   echo json_encode($arr);
}
?>