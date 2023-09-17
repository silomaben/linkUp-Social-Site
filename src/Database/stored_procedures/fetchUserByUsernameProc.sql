CREATE OR ALTER PROCEDURE fetchUserByUsernameProc(
    @username VARCHAR(255)
)
AS
BEGIN

    UPDATE Users
     SET is_disabled = 0
     WHERE username = @username;

     SELECT * FROM Users WHERE username = @username
END