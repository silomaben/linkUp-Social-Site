CREATE TABLE SubcommentLikes (
  subcomment_id INT NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  PRIMARY KEY (subcomment_id, user_id),
  FOREIGN KEY (subcomment_id) REFERENCES Subcomments(subcomment_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
