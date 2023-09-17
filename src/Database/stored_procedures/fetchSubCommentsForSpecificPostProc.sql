CREATE OR ALTER PROCEDURE fetchSubCommentsForSpecificPostProc
    @comment_id VARCHAR(255),
    @user_id VARCHAR(255)
AS
BEGIN
    SELECT S.subcomment_id,
           S.user_id,
           U.username,
            
           CONCAT(U.first_name, ' ', U.last_name) AS full_name, 
           U.profile_pic_url AS user_dp,
           S.body,
           S.datetime,
           COUNT(SL.user_id) AS like_count,
           CAST(CASE WHEN EXISTS (
               SELECT 1 
               FROM SubcommentLikes 
               WHERE subcomment_id = S.subcomment_id 
               AND user_id = @user_id
           ) THEN 1 ELSE 0 END AS BIT) AS has_liked
    FROM Subcomments AS S
    LEFT JOIN SubcommentLikes AS SL ON S.subcomment_id = SL.subcomment_id
    INNER JOIN Users AS U ON S.user_id = U.user_id  
    WHERE S.comment_id = @comment_id
    GROUP BY S.subcomment_id, S.user_id, S.body,U.first_name, U.last_name, S.datetime, S.comment_id, U.username, U.profile_pic_url;
END;
