CREATE PROCEDURE postLikesCounterProc
    @post_id VARCHAR(255),
    @likesCount INT OUTPUT
AS
BEGIN
    SELECT @likesCount = COUNT(*)
    FROM Likes
    WHERE post_id = @post_id;
END;
