CREATE OR ALTER PROCEDURE UnlikePostProc
    @user_id VARCHAR(255),
    @post_id VARCHAR(255)
AS
BEGIN
    DELETE FROM Likes
    WHERE user_id = @user_id AND post_id = @post_id;
END;
