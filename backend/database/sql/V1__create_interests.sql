CREATE TABLE `interests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `interest` VARCHAR(50) DEFAULT NULL,
  `creationDate` DATETIME,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`userId`) REFERENCES `users`(`id`)
);