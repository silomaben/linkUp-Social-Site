CREATE OR ALTER PROCEDURE CreateCommentProc
    @post_id VARCHAR(255),
    @user_id VARCHAR(255),
    @body TEXT,
    @timeposted VARCHAR(50)
AS
BEGIN
    INSERT INTO Comments (post_id, user_id, body, datetime)
    VALUES (@post_id, @user_id, @body, @timeposted);
END;

