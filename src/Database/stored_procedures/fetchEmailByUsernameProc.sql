CREATE OR ALTER PROCEDURE fetchEmailByUsernameProc
  @username VARCHAR(255)
AS
BEGIN
  SELECT email
  FROM Users
  WHERE username = @username;
END;