CREATE OR ALTER PROCEDURE fetchSubCommentsForSpecificPostProc
    @comment_id VARCHAR(255)
AS
BEGIN
    SELECT S.subcomment_id,
           S.user_id,
           S.body,
           S.datetime,
           COUNT(SL.user_id) AS like_count
    FROM Subcomments AS S
    LEFT JOIN SubcommentLikes AS SL ON S.subcomment_id = SL.subcomment_id
    WHERE S.comment_id = @comment_id
    GROUP BY S.subcomment_id, S.user_id, S.body, S.datetime, S.comment_id;
END;