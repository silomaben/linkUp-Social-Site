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


exec editPostProc "be6feb2f-4195-40b3-8d65-39403d5f37e4", "5c7f8faa-a07e-44da-9094-ea075a391ac9", "recporc","use"

