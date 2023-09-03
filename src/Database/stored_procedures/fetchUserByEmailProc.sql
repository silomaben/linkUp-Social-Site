CREATE OR ALTER PROCEDURE fetchUserByEmailProc(
    @email VARCHAR(255)
)
AS
BEGIN
     SELECT * FROM Users WHERE email = @email
END