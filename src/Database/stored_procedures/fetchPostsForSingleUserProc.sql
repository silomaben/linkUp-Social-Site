CREATE OR ALTER PROCEDURE fetchPostsForSingleUserProc
@viewed_username VARCHAR(255),
@viewer_userId VARCHAR(255)
AS
BEGIN

    DECLARE @viewed_userId  VARCHAR(255)

    SELECT @viewed_userId  = user_id
    FROM Users
    WHERE username = @viewed_username;

  SELECT 
    P.post_id, 
    P.user_id, 
    U.username AS user_name,
    U.profile_pic_url AS user_dp,
    P.image, 
    P.body, 
    P.datetime, 
    P.tagged_users,
    CASE WHEN L.user_id IS NOT NULL THEN 1 ELSE 0 END AS has_liked,
    COALESCE(LikeCounts.LikeCount, 0) AS like_count
  FROM Posts P 
  JOIN Users U ON P.user_id = U.user_id
  LEFT JOIN Likes L ON P.post_id = L.post_id AND L.user_id = @viewer_userId
  LEFT JOIN (
    SELECT post_id, COUNT(*) AS LikeCount
    FROM Likes
    GROUP BY post_id
  ) AS LikeCounts ON P.post_id = LikeCounts.post_id
  WHERE P.is_deleted = 0 AND P.user_id = @viewed_userId AND P.suspended = 0
  ORDER BY P.datetime;
END;

fetchPostsForSingleUserProc "admin" ,"0edd9c13-d738-42f1-a267-0fedd9a9a8ac"