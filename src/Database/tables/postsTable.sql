CREATE TABLE Posts (
  post_id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  image VARCHAR(255),
  body TEXT NOT NULL,
  datetime VARCHAR(50) NOT NULL,
  tagged_users VARCHAR(500),
  is_deleted BIT DEFAULT(0),
  trending_score INT DEFAULT(0),
  perfomance_scale INT DEFAULT(0),
  reported BIT DEFAULT(0),
  suspended BIT DEFAULT(0),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);


-- add feature of enable and disable commenting
-- add feature to archive post

-- post id to int
DROP Table Users
DROP Table Posts
DROP Table Comments
drop table Subcomments
drop table Likes
DROP TABLE Followers
DROP TABLE CommentLikes
DROP TABLE  SubcommentLikes



select * from Posts

SELECT COUNT(*) AS like_count
FROM Likes
WHERE post_id= 'e';