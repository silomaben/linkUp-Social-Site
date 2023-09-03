CREATE TABLE Subcomments (
  subcomment_id INT PRIMARY KEY IDENTITY(1,1),
  comment_id INT, 
  user_id VARCHAR(255),
  body VARCHAR(MAX) NOT NULL,
  datetime VARCHAR(50),
  FOREIGN KEY (comment_id) REFERENCES Comments(comment_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);


drop table Subcomments

