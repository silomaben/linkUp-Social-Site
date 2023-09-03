-- CREATE TABLE Followers (
--   follower_id INT,
--   followed_id INT,
--   FOREIGN KEY (follower_id) REFERENCES Users(user_id),
--   FOREIGN KEY (followed_id) REFERENCES Users(user_id),
--   PRIMARY KEY (follower_id, followed_id)
-- );

CREATE TABLE Followers (
  follower_id VARCHAR(255),
  followed_id VARCHAR(255),
  FOREIGN KEY (follower_id) REFERENCES Users(user_id),
  FOREIGN KEY (followed_id) REFERENCES Users(user_id),
  PRIMARY KEY (follower_id, followed_id)
);

DROP TABLE Followers