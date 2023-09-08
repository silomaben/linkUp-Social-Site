CREATE OR ALTER PROCEDURE unfollowUserProc
    @unfollower_id VARCHAR(255),
    @unfollowed_id VARCHAR(255)
AS
BEGIN
    DELETE FROM Followers 
    WHERE follower_id = @unfollower_id AND followed_id = @unfollowed_id;
END;
