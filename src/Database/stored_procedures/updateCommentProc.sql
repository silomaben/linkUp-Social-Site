CREATE OR ALTER PROCEDURE updateCommentProc
  @comment_id VARCHAR(255),
  @post_id VARCHAR(255),
  @user_id VARCHAR(255),
  @body TEXT
AS
BEGIN
  UPDATE Comments
  SET body = @body
  WHERE post_id = @post_id and user_id = @user_id and comment_id = @comment_id
END;

