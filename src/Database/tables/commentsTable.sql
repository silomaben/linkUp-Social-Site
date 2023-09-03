CREATE TABLE Comments (
  comment_id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
  post_id VARCHAR(255) NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  body VARCHAR(MAX) NOT NULL,
  datetime VARCHAR(50) NOT NULL,
  FOREIGN KEY (post_id) REFERENCES Posts(post_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);




drop table Comments