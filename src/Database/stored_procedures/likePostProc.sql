CREATE OR ALTER PROCEDURE LikePostProc
    @user_id VARCHAR(255),
    @post_id VARCHAR(255)
AS
BEGIN
    INSERT INTO Likes (user_id, post_id)
    VALUES (@user_id, @post_id);
END;


-- select * FROM Posts