CREATE PROCEDURE fetchUsernameByidProc
  @user_id VARCHAR(255)
AS
BEGIN
  SELECT username
  FROM Users
  WHERE user_id = @user_id;
END;