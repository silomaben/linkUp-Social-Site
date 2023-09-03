CREATE OR ALTER PROCEDURE fetchCommentsForSpecificPostProc
    @post_id VARCHAR(255)
AS
BEGIN
    SELECT C.comment_id,
           C.user_id,
           C.body,
           C.datetime,
           COUNT(CL.user_id) AS like_count
    FROM Comments AS C
    LEFT JOIN CommentLikes AS CL ON C.comment_id = CL.comment_id
    WHERE C.post_id = @post_id
    GROUP BY C.comment_id, C.user_id, C.body, C.datetime, C.post_id;
END;

EXEC fetchCommentsForSpecificPostProc '90af0c8b-7ee7-48a8-a494-927c82598db3'
