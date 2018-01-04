<?php
  require('init.php');
  @$start=$_REQUEST['start']or die('not start');
  $sql="SELECT * FROM y_product LIMIT $start,5";
  $result=mysqli_query($conn,$sql);
  $row=mysqli_fetch_all($result,MYSQLI_ASSOC);
  echo json_encode($row);
?>