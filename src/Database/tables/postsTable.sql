CREATE TABLE Posts (
  post_id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255),
  image VARCHAR(255),
  body TEXT,
  datetime VARCHAR(50),
  tagged_users VARCHAR(500),
  is_deleted BIT DEFAULT(0),
  trending_score INT DEFAULT(0),
  perfomance_scale INT DEFAULT(0),
  reported BIT DEFAULT(0),
  suspended BIT DEFAULT(0),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

DROP Table Posts
DROP Table Users


select * from Posts

SELECT COUNT(*) AS like_count
FROM Likes
WHERE post_id= 'e';