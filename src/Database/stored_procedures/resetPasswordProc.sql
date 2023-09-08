CREATE OR ALTER PROCEDURE resetPasswordProc(
    @password VARCHAR(MAX),
    @email VARCHAR(255))
AS
BEGIN
    UPDATE users SET password = @password, password_reset_token = NULL, password_reset_expiration = NULL WHERE email = @email
END