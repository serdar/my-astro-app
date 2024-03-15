CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `pubDate` datetime DEFAULT NULL,
  `published` tinyint(1) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `siteVersionNumber` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
