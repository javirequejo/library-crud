DROP TABLE IF EXISTS `format`;

CREATE TABLE `format` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(5) NOT NULL,
  `description` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `author`;

CREATE TABLE `author` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(12) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `title`;

CREATE TABLE `title` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isbn` varchar(13) NOT NULL UNIQUE,
  `title` varchar(255) NOT NULL,
  `description` longtext,
  `publication_date` varchar(30) NOT NULL,
  `format` int(11) NOT NULL,
  FOREIGN KEY (format) REFERENCES format (id),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `author_title`;

CREATE TABLE `author_title` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `author_id` int(11) NOT NULL,
  `title_id` int(11) NOT NULL,
  FOREIGN KEY (author_id) REFERENCES author (id),
  FOREIGN KEY (title_id) REFERENCES title (id),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;