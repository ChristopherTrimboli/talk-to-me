CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) DEFAULT NULL,
  `password` char(60) DEFAULT NULL,
  `firstName` VARCHAR(45) DEFAULT NULL,
  `lastName` VARCHAR(45) DEFAULT NULL,
  `gender` VARCHAR(10) DEFAULT NULL,
  `birthday` VARCHAR(30) DEFAULT NULL,
  `location` VARCHAR(200) DEFAULT NULL,
  `registerDate` DATETIME,
  `lastLoginDate` DATETIME,
  `lastUpdated` DATETIME,
  PRIMARY KEY (`id`)
);