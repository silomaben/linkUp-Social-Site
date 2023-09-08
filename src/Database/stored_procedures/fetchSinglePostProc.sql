CREATE OR ALTER PROCEDURE fetchSinglePostProc
    @post_id VARCHAR(255)
AS
BEGIN

    DECLARE @likesCount INT;

    EXEC postLikesCounterProc @post_id, @likesCount OUTPUT;

    SELECT post_id, user_id, image, body, datetime, tagged_users,@likesCount AS likes_count
    FROM Posts
    WHERE post_id = @post_id;
END;



-- CREATE OR ALTER PROCEDURE fetchSinglePostProc
--     @post_id VARCHAR(255)
-- AS
-- BEGIN
--     DECLARE @likesCount INT;

--     -- Execute a stored procedure to count likes (assuming you have one)
--     EXEC postLikesCounterProc @post_id, @likesCount OUTPUT;

--     -- Select the post details and the like count
--     SELECT post_id, user_id, image, body, datetime, tagged_users, @likesCount AS likes_count
--     FROM Posts
--     WHERE post_id = @post_id;

--     -- Select comments for the specified post
--     SELECT comment_id, user_id, body, datetime
--     FROM Comments
--     WHERE post_id = @post_id;
-- END;


-- view tagged users using a modal after a 3 button to prompt users for options
-- there you can also include things such as delete and report.