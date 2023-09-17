CREATE OR ALTER PROCEDURE fetchSinglePostProc
    @post_id VARCHAR(255),
    @user_id VARCHAR(255)
AS
BEGIN
    DECLARE @likesCount INT;
    DECLARE @hasLiked BIT;
    DECLARE @username VARCHAR(255); 

    
    EXEC postLikesCounterProc @post_id, @likesCount OUTPUT;

    
    SELECT @hasLiked = CASE WHEN EXISTS (
        SELECT 1
        FROM Likes
        WHERE user_id = @user_id AND post_id = @post_id
    ) THEN 1 ELSE 0 END;

    SELECT
        P.post_id,
        P.user_id,
        U.username AS user_name,
        CONCAT(U.first_name, ' ', U.last_name) AS full_name, 
        U.profile_pic_url AS user_dp,
        P.image,
        P.body,
        P.datetime,
        P.tagged_users,
        @likesCount AS likes_count,
        @hasLiked AS has_liked
    FROM Posts P
    JOIN Users U ON P.user_id = U.user_id
    WHERE P.post_id = @post_id;
END;



-- view tagged users using a modal after a 3 button to prompt users for options
-- there you can also include things such as delete and report.