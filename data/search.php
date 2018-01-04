<?php
require('init.php');
@$title=$_REQUEST['title']or die('not title');
$sql="SELECT * FROM y_product WHERE title LIKE '%$title%' OR material LIKE '%title%'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_all($result,MYSQLI_ASSOC);
if($row>0){
  echo json_encode($row);
}
else{
  $arr=['code'=>'-1','msg'=>'数据请求失败'];
  echo json_encode($arr);
}
?>