CREATE PROCEDURE fetchPostsPerfomance
AS
BEGIN
    SELECT
        P.post_id,
        COALESCE(L.like_count, 0) AS like_count,
        COALESCE(C.comment_count, 0) AS comment_count,
        COALESCE(SC.subcomment_count, 0) AS subcomment_count
    FROM Posts AS P
    LEFT JOIN (
        SELECT post_id, COUNT(*) AS like_count
        FROM Likes
        GROUP BY post_id
    ) AS L ON P.post_id = L.post_id
    LEFT JOIN (
        SELECT post_id, COUNT(*) AS comment_count
        FROM Comments
        GROUP BY post_id
    ) AS C ON P.post_id = C.post_id
    LEFT JOIN (
        SELECT C.post_id, COUNT(*) AS subcomment_count
        FROM Comments AS C
        LEFT JOIN Subcomments AS SC ON C.comment_id = SC.comment_id
        GROUP BY C.post_id
    ) AS SC ON P.post_id = SC.post_id;
END;


exec fetchPostsPerfomance