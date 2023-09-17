CREATE OR ALTER PROCEDURE GetUserFollowersAndFollowing
    @me VARCHAR(255), -- Your user ID
    @them VARCHAR(255) -- Target user's username
AS
BEGIN
    DECLARE @targetUserId VARCHAR(255)
    
    -- Find the user's ID based on the provided target username
    SELECT @targetUserId = user_id
    FROM Users
    WHERE username = @them;

    IF @targetUserId IS NOT NULL
    BEGIN
        -- Get the followers of the target user
        SELECT U.username AS follower_username,
               CASE WHEN EXISTS (
                    SELECT 1
                    FROM Followers
                    WHERE follower_id = @me AND followed_id = U.user_id
               ) THEN 1 ELSE 0 END AS is_following,
               CONCAT(U.first_name, ' ', U.last_name) AS name
        FROM Users U
        INNER JOIN Followers F ON U.user_id = F.follower_id
        WHERE F.followed_id = @targetUserId;
        
        -- Get the users followed by the target user
        SELECT U.username AS following_username,
               CASE WHEN EXISTS (
                    SELECT 1
                    FROM Followers
                    WHERE follower_id = @me AND followed_id = U.user_id
               ) THEN 1 ELSE 0 END AS is_following,
               CONCAT(U.first_name, ' ', U.last_name) AS name
        FROM Users U
        INNER JOIN Followers F ON U.user_id = F.followed_id
        WHERE F.follower_id = @targetUserId;
    END
    ELSE
    BEGIN
        -- User not found
        SELECT 'User not found' AS message;
    END
END;



exec getUserFollowersAndFollowing '0edd9c13-d738-42f1-a267-0fedd9a9a8ac', 'admin'