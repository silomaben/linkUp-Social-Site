CREATE OR ALTER PROCEDURE createPostProc
    @user_id VARCHAR(255),
    @post_id VARCHAR(255),
    @image VARCHAR(500),
    @body TEXT,
    @timeposted VARCHAR(50),
    @tagged VARCHAR(500)
AS
BEGIN
    INSERT INTO Posts (user_id,post_id, image, body, datetime, tagged_users)
    VALUES (@user_id, @post_id, @image, @body, @timeposted,@tagged);
END;
