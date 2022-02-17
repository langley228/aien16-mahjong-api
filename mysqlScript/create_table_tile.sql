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