CREATE OR ALTER PROCEDURE fetchAllPostsProc
AS
BEGIN
    SELECT 
        p.post_id, 
        p.user_id, 
        p.image, 
        p.body, 
        p.datetime, 
        p.tagged_users,
        COALESCE(lc.likes_count, 0) AS likes_count
    FROM Posts p
    LEFT JOIN (
        SELECT post_id, COUNT(*) AS likes_count
        FROM Likes
        GROUP BY post_id
    ) lc ON p.post_id = lc.post_id;
END;

EXEC fetchAllPostsProc


