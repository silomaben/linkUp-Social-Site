CREATE OR ALTER PROCEDURE fetchUserByEmailProc(
    @email VARCHAR(255)
)
AS
BEGIN

    UPDATE Users
     SET is_disabled = 0
     WHERE email = @email;
     
     SELECT * FROM Users WHERE email = @email
END