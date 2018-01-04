SET NAMES UTF8;
DROP DATABASE IF EXISTS yyOrder;
CREATE DATABASE yyOrder CHARSET=UTF8;
use yyOrder;
CREATE TABLE y_user(
  uId INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(20),
  pwd VARCHAR(30),
  valid VARCHAR(20),
  dataTime BIGINT,
  phone BIGINT,
  email VARCHAR(40),
  sex INT
);
INSERT INTO y_user VALUES
(NULL,'fai','kuhu8866','adfd',now(),'18046303240','869653722@qq.com','1');

CREATE TABLE y_product(
  pId INT PRIMARY KEY AUTO_INCREMENT,
  material VARCHAR(300),
  title VARCHAR(20),
  detail VARCHAR(200),
  price  INT,
  img VARCHAR(50)
);
INSERT INTO y_product VALUES
(NULL,'龙虾，豆腐，鲍鱼，石斑','鱼香肉丝','这是一道很美味的菜','110','p6611.jpg'),
(NULL,'龙虾，豆腐，鲍鱼，石斑','宫保鸡丁','这是一道很美味的菜','120','p9210.jpg'),
(NULL,'龙虾，豆腐，鲍鱼，石斑','鱼香肉丝','这是一道很美味的菜','130','p6611.jpg'),
(NULL,'龙虾，豆腐，鲍鱼，石斑','肉末茄子','这是一道很美味的菜','140','p9210.jpg'),
(NULL,'龙虾，豆腐，鲍鱼，石斑','鱼香肉丝','这是一道很美味的菜','150','p6611.jpg'),
(NULL,'龙虾，豆腐，鲍鱼，石斑','肉末茄子','这是一道很美味的菜','120','p9210.jpg'),
(NULL,'龙虾，豆腐，鲍鱼，石斑','鱼香肉丝','这是一道很美味的菜','190','p9210.jpg'),
(NULL,'龙虾，豆腐，鲍鱼，石斑','肉末茄子','这是一道很美味的菜','100','p9210.jpg'),
(NULL,'龙虾，豆腐，鲍鱼，石斑','鱼香肉丝','这是一道很美味的菜','100','p9210.jpg'),
(NULL,'龙虾，豆腐，鲍鱼，石斑','鱼香肉丝','这是一道很美味的菜','100','p9210.jpg'),
(NULL,'龙虾，豆腐，鲍鱼，石斑','宫保鸡丁','这是一道很美味的菜','100','p7818.jpg'),
(NULL,'龙虾，豆腐，鲍鱼，石斑','鱼香肉丝','这是一道很美味的菜','100','p9210.jpg'),
(NULL,'龙虾，豆腐，鲍鱼，石斑','鱼香肉丝','这是一道很美味的菜','100','p7818.jpg'),
(NULL,'龙虾，豆腐，鲍鱼，石斑','肉末茄子','这是一道很美味的菜','100','p2679-l.jpg'),
(NULL,'龙虾，豆腐，鲍鱼，石斑','鱼香肉丝','这是一道很美味的菜','100','p9210.jpg'),
(NULL,'龙虾，豆腐，鲍鱼，石斑','宫保鸡丁','这是一道很美味的菜','100','p7818.jpg'),
(NULL,'龙虾，豆腐，鲍鱼，石斑','鱼香肉丝','这是一道很美味的菜','100','p2679-l.jpg'),
(NULL,'龙虾，豆腐，鲍鱼，石斑','鱼香肉丝','这是一道很美味的菜','100','p0281.jpg'),
(NULL,'龙虾，豆腐，鲍鱼，石斑','鱼香肉丝','这是一道很美味的菜','100','p9210.jpg'),
(NULL,'龙虾，豆腐，鲍鱼，石斑','肉末茄子','这是一道很美味的菜','100','p9210.jpg'),
(NULL,'龙虾，豆腐，鲍鱼，石斑','鱼香肉丝','这是一道很美味的菜','100','p0281.jpg');


CREATE TABLE y_cart(
  cId INT PRIMARY KEY AUTO_INCREMENT,
  pId INT,
  count INT,
  uId INT
);
INSERT INTO y_cart VALUES
(NULL,1,3,2),
(NULL,1,3,2),
(NULL,1,3,2),
(NULL,4,5,3),
(NULL,4,5,3),
(NULL,4,5,3),
(NULL,5,2,4),
(NULL,5,2,4),
(NULL,5,2,4),
(NULL,2,9,1),
(NULL,3,7,1);

CREATE TABLE y_order(
  oId INT PRIMARY KEY AUTO_INCREMENT,
  uId INT
);
INSERT INTO y_order VALUES
(NULL,1),
(NULL,1),
(NULL,1),
(NULL,1);

