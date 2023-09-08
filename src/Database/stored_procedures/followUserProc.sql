CREATE OR ALTER PROCEDURE followUserProc
    @follower_id VARCHAR(255),
    @followed_id VARCHAR(255)
AS
BEGIN
    INSERT INTO Followers (follower_id, followed_id)
    VALUES (@follower_id, @followed_id);
END;

