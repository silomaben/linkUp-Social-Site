CREATE OR ALTER PROCEDURE likeCommentProc
    @user_id VARCHAR(255),
    @comment_id VARCHAR(255)
AS
BEGIN
    INSERT INTO CommentLikes (user_id, comment_id)
    VALUES (@user_id, @comment_id);
END;
