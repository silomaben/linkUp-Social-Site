CREATE OR ALTER PROCEDURE fetchPostsBasedOnPerfomanceProc
@user_id VARCHAR(255) 
AS
BEGIN
  SELECT 
    P.post_id, 
    P.user_id, 
    U.username AS user_name,
    P.image, 
    P.body, 
    P.datetime, 
    P.tagged_users,
    CASE WHEN L.user_id IS NOT NULL THEN 1 ELSE 0 END AS has_liked,
    COALESCE(LikeCounts.LikeCount, 0) AS like_count
  FROM Posts P 
  JOIN Users U ON P.user_id = U.user_id
  LEFT JOIN Likes L ON P.post_id = L.post_id AND L.user_id = @user_id -- Use the @user_id variable
  LEFT JOIN (
    SELECT post_id, COUNT(*) AS LikeCount
    FROM Likes
    GROUP BY post_id
  ) AS LikeCounts ON P.post_id = LikeCounts.post_id
  WHERE P.is_deleted = 0
  ORDER BY P.perfomance_scale DESC;
END;


exec fetchPostsBasedOnPerfomanceProc '39cd9427-42c8-44e1-b436-20612b21d144'

-- drop procedure fetchPostsBasedOnPerfomance 