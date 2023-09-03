CREATE OR ALTER PROCEDURE CreateSubcommentProc
    @comment_id VARCHAR(255),
    @user_id VARCHAR(255),
    @body TEXT,
    @timeposted VARCHAR(50)
AS
BEGIN
    INSERT INTO Subcomments (comment_id, user_id, body, datetime)
    VALUES (@comment_id, @user_id, @body, @timeposted);
END;