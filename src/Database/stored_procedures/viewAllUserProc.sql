CREATE OR ALTER PROCEDURE viewAllUsersProc(
    @me VARCHAR(255)
)
AS
BEGIN
    SELECT 
        U.user_id,
        U.first_name,
        U.last_name,
        U.username,
        U.profile_pic_url AS user_dp,
        CASE
            WHEN EXISTS (
                SELECT 1
                FROM Followers
                WHERE follower_id = @me AND followed_id = U.user_id
            ) THEN 1
            ELSE 0
        END AS i_follow_them
    FROM Users U
END
