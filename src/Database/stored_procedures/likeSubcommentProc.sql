CREATE OR ALTER PROCEDURE likeSubcommentProc
    @user_id VARCHAR(255),
    @subcomment_id VARCHAR(255)
AS
BEGIN
    INSERT INTO SubcommentLikes (user_id, subcomment_id)
    VALUES (@user_id, @subcomment_id);
END;
