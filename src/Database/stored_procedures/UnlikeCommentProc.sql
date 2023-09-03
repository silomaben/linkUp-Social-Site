CREATE OR ALTER PROCEDURE UnlikeCommentProc
    @user_id VARCHAR(255),
    @comment_id INT 
AS
BEGIN
    DELETE FROM CommentLikes
    WHERE user_id = @user_id AND comment_id = @comment_id;
END;
