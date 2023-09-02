CREATE OR ALTER PROCEDURE fetchPostsBasedOnPerfomanceProc
AS
BEGIN
 SELECT  post_id, user_id, image, body, datetime, tagged_users
      FROM Posts
      ORDER BY perfomance_scale DESC;
END;


drop procedure fetchPostsBasedOnPerfomance