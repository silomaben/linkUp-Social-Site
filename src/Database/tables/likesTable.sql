CREATE TABLE Likes (
  user_id VARCHAR(255),
  post_id VARCHAR(255),
  CONSTRAINT PK_Likes PRIMARY KEY (user_id, post_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (post_id) REFERENCES Posts(post_id)
);


drop table Likes

