CREATE OR ALTER PROCEDURE editPostProc
  @post_id VARCHAR(255),
  @user_id VARCHAR(255),
  @body TEXT,
  @tagged VARCHAR(500)
AS
BEGIN
  UPDATE Posts
  SET body = @body,
      tagged_users = @tagged
  WHERE post_id = @post_id and user_id = @user_id
END;
