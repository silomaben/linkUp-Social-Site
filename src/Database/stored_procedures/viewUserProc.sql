CREATE OR ALTER PROCEDURE viewUserProc(
    @me VARCHAR(255),
    @them VARCHAR(255)
)
AS
BEGIN
    DECLARE @i_follow_them BIT
    DECLARE @they_follow_me BIT

    DECLARE @them_id VARCHAR(255)

    SELECT @them_id = user_id
    FROM Users
    WHERE username = @them;

    


    SET @i_follow_them = CASE
        WHEN EXISTS (
            SELECT 1
            FROM Followers
            WHERE follower_id = @me AND followed_id = @them_id
        )
        THEN 1
        ELSE 0
    END

    SET @they_follow_me = CASE
        WHEN EXISTS (
            SELECT 1
            FROM Followers
            WHERE follower_id = @them_id AND followed_id = @me
        )
        THEN 1
        ELSE 0
    END

    SELECT 
         U.user_id,
        U.first_name,
        U.last_name,
        U.username,
        U.email,
        U.profile_pic_url,
        U.bio,
        U.linkedin_url,
        U.facebook_url,
        U.website_url,
        U.instagram_url,
        U.twitter_url,
        U.keep_email_private,
        U.email_confirmed,
        U.is_verified,
        @i_follow_them AS i_follow_them,
        @they_follow_me AS they_follow_me
    FROM Users U
    WHERE U.user_id = @them_id
END
