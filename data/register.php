<?php
require('init.php');
@$name=$_REQUEST['name'] or die('name not');
@$pwd=$_REQUEST['pwd'] or die('pwd not');
@$email=$_REQUEST['email']or die('email not');
@$phone=$_REQUEST['phone']or die('phone not');
@$valid=$_REQUEST['valid']or die('valid not');
@$sex=$_REQUEST['sex']or die('sex not');

$sql="INSERT INTO y_user VALUES
(NULL,'$name','$pwd','$valid',12124454777,'$phone','$email','$sex')";

$result=mysqli_query($conn,$sql);
$row=mysqli_affected_rows($conn);
if($row>0){

   $arr=['code'=>$row,'msg'=>'注册成功'];
   echo json_encode($arr);
}
 else{
  $arr=['code'=>'-1','msg'=>'注册失败'];
  echo json_encode($arr);
 }
?>