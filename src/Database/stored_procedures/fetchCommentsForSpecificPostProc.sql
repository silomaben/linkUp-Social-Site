CREATE OR ALTER PROCEDURE fetchCommentsForSpecificPostProc
    @post_id VARCHAR(255)
AS
BEGIN
    SELECT C.comment_id,
           C.user_id,
           U.username, 
           U.profile_pic_url, 
           C.body,
           C.datetime,
           COUNT(CL.user_id) AS like_count
    FROM Comments AS C
    LEFT JOIN CommentLikes AS CL ON C.comment_id = CL.comment_id
    INNER JOIN Users AS U ON C.user_id = U.user_id  
    WHERE C.post_id = @post_id
    GROUP BY C.comment_id, C.user_id, U.username, U.profile_pic_url, C.body, C.datetime, C.post_id;
END;


EXEC fetchCommentsForSpecificPostProc 'c21376b4-56b9-4df1-9428-17eeaf2ac1b2'
