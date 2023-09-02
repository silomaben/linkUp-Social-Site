CREATE TABLE Comments (
  comment_id INT PRIMARY KEY IDENTITY(1,1),
  post_id VARCHAR(255),
  user_id VARCHAR(255),
  body TEXT,
  datetime VARCHAR(50),
  FOREIGN KEY (post_id) REFERENCES Posts(post_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);


drop table Comments