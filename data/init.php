<?php
  header('Content-Type:application/json;charset:utf-8');
  $conn=mysqli_connect('127.0.0.1','root','','yyOrder');
  $sql="SET NAMES UTF8";
  mysqli_query($conn,$sql);
?>