CREATE TABLE CommentLikes (
  comment_id INT NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  PRIMARY KEY (comment_id, user_id),
  FOREIGN KEY (comment_id) REFERENCES Comments(comment_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
