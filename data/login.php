<?php
  @$name=$_REQUEST['name'] or die('not name');
  @$pwd=$_REQUEST['pwd'] or die('not pwd');
  require('init.php');
  $sql="SELECT * FROM y_user WHERE name='$name' AND pwd='$pwd'";
  $result=mysqli_query($conn,$sql);
  $row=mysqli_fetch_assoc($result);
  if($row){
    $arr=['code'=>1,'row'=>$row];
    echo json_encode($arr);
  }
  else{
    $arr=['code'=>-1];
    echo json_encode($arr);
  }
?>
