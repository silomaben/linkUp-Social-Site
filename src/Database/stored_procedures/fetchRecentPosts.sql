CREATE OR ALTER PROCEDURE fetchRecentPosts
AS
BEGIN
 SELECT  post_id, user_id, image, body, datetime, tagged_users
      FROM Posts
      ORDER BY datetime DESC;
END;
