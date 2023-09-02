CREATE OR ALTER PROCEDURE deletePostProc
  @post_id VARCHAR(255),
  @user_id VARCHAR(255)
AS
BEGIN
  UPDATE Posts
  SET is_deleted = 1
  WHERE post_id = @post_id and user_id = @user_id
END;
