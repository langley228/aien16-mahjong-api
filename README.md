# aien16-mahjong-api

mysql setting
```
./config/mahjong-reps-config
``` 

Create table
```
CREATE TABLE `tile` (
  `id` int NOT NULL,
  `name` varchar(10) NOT NULL,
  `rank` int NOT NULL DEFAULT '0',
  `is_dragon` bit(1) NOT NULL DEFAULT b'0',
  `is_wind` bit(1) NOT NULL DEFAULT b'0',
  `is_honor` bit(1) NOT NULL DEFAULT b'0',
  `is_dot` bit(1) NOT NULL DEFAULT b'0',
  `is_bamboo` bit(1) NOT NULL DEFAULT b'0',
  `is_character` bit(1) NOT NULL DEFAULT b'0',
  `is_flower` bit(1) NOT NULL DEFAULT b'0',
  `count` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
)
```

Insert data
```
INSERT INTO `tile` VALUES (1,'一筒',1,_binary '\0',_binary '\0',_binary '\0',_binary '',_binary '\0',_binary '\0',_binary '\0',4),(2,'二筒',2,_binary '\0',_binary '\0',_binary '\0',_binary '',_binary '\0',_binary '\0',_binary '\0',4),(3,'三筒',3,_binary '\0',_binary '\0',_binary '\0',_binary '',_binary '\0',_binary '\0',_binary '\0',4),(4,'四筒',4,_binary '\0',_binary '\0',_binary '\0',_binary '',_binary '\0',_binary '\0',_binary '\0',4),(5,'五筒',5,_binary '\0',_binary '\0',_binary '\0',_binary '',_binary '\0',_binary '\0',_binary '\0',4),(6,'六筒',6,_binary '\0',_binary '\0',_binary '\0',_binary '',_binary '\0',_binary '\0',_binary '\0',4),(7,'七筒',7,_binary '\0',_binary '\0',_binary '\0',_binary '',_binary '\0',_binary '\0',_binary '\0',4),(8,'八筒',8,_binary '\0',_binary '\0',_binary '\0',_binary '',_binary '\0',_binary '\0',_binary '\0',4),(9,'九筒',9,_binary '\0',_binary '\0',_binary '\0',_binary '',_binary '\0',_binary '\0',_binary '\0',4),(10,'一條',1,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '',_binary '\0',_binary '\0',4),(11,'二條',2,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '',_binary '\0',_binary '\0',4),(12,'三條',3,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '',_binary '\0',_binary '\0',4),(13,'四條',4,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '',_binary '\0',_binary '\0',4),(14,'五條',5,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '',_binary '\0',_binary '\0',4),(15,'六條',6,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '',_binary '\0',_binary '\0',4),(16,'七條',7,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '',_binary '\0',_binary '\0',4),(17,'八條',8,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '',_binary '\0',_binary '\0',4),(18,'九條',9,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '',_binary '\0',_binary '\0',4),(19,'一萬',1,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '',_binary '\0',4),(20,'二萬',2,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '',_binary '\0',4),(21,'三萬',3,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '',_binary '\0',4),(22,'四萬',4,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '',_binary '\0',4),(23,'五萬',5,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '',_binary '\0',4),(24,'六萬',6,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '',_binary '\0',4),(25,'七萬',7,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '',_binary '\0',4),(26,'八萬',8,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '',_binary '\0',4),(27,'九萬',9,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '',_binary '\0',4),(28,'東',0,_binary '\0',_binary '',_binary '',_binary '\0',_binary '\0',_binary '\0',_binary '\0',4),(29,'南',0,_binary '\0',_binary '',_binary '',_binary '\0',_binary '\0',_binary '\0',_binary '\0',4),(30,'西',0,_binary '\0',_binary '',_binary '',_binary '\0',_binary '\0',_binary '\0',_binary '\0',4),(31,'北',0,_binary '\0',_binary '',_binary '',_binary '\0',_binary '\0',_binary '\0',_binary '\0',4),(32,'中',0,_binary '',_binary '\0',_binary '',_binary '\0',_binary '\0',_binary '\0',_binary '\0',4),(33,'發',0,_binary '',_binary '\0',_binary '',_binary '\0',_binary '\0',_binary '\0',_binary '\0',4),(34,'白',0,_binary '',_binary '\0',_binary '',_binary '\0',_binary '\0',_binary '\0',_binary '\0',4),(35,'春',1,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '',1),(36,'夏',2,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '',1),(37,'秋',3,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '',1),(38,'冬',4,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '',1),(39,'梅',1,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '',1),(40,'蘭',2,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '',1),(41,'菊',3,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '',1),(42,'竹',4,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '',1);
```

app run
```
npm install
npm satart
```