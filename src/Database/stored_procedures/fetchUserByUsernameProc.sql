CREATE OR ALTER PROCEDURE fetchUserByUsernameProc(
    @username VARCHAR(255)
)
AS
BEGIN
     SELECT * FROM Users WHERE username = @username
END