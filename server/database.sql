CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255),
  profile_picture VARCHAR(255),
  private BOOLEAN NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  user_id INTEGER NOT NULL,
  image VARCHAR(255) NOT NULL,
  caption VARCHAR(255),
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE comments (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  post_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  comment VARCHAR(255) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE likes (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  post_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE followers (
  user_id INT NOT NULL,
  follower_id INT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, follower_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE
);



CREATE TABLE `instagram_clone`.`notifications` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `post_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `message` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `instagram_clone`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `post_id`
    FOREIGN KEY (`post_id`)
    REFERENCES `instagram_clone`.`posts` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SELECT n.id, n.action, n.created_at,  l.id AS toRef,  u.full_name FROM notifications AS n 
JOIN likes AS l
JOIN users AS u 
ON (n.item_id = l.id) AND (n.user_id = 8) AND (l.user_id = u.id); 



SELECT n.id, n.action, n.created_at,  f.followed_id AS toRef,  u.full_name FROM notifications AS n JOIN followers AS f JOIN users AS u ON (n.item_id = f.followed_id) AND (n.user_id = 8) AND (f.followed_id = u.id); 


SELECT n.id, n.action, n.created_at,  p.id AS toRef,  u.full_name FROM notifications AS n JOIN posts AS p JOIN users AS u ON (n.item_id = p.id) AND (n.user_id = 8) AND (p.user_id = u.id); 


SELECT n.id, n.action, n.created_at,  c.id AS toRef,  u.full_name FROM notifications AS n JOIN users AS u JOIN comments AS c ON (n.item_id = c.id) AND (n.user_id = 8) AND (c.user_id = u.id); 
