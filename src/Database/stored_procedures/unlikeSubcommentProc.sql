CREATE OR ALTER PROCEDURE UnlikeSubcommentProc
    @user_id VARCHAR(255),
    @subcomment_id VARCHAR(255)
AS
BEGIN
    DELETE FROM SubcommentLikes
    WHERE user_id = @user_id AND subcomment_id = @subcomment_id;
END;
