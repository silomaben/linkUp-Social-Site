CREATE OR ALTER PROCEDURE hideUserEmailProc(
    @email VARCHAR(255)
    )
AS
BEGIN
    UPDATE users SET keep_email_private = 1 WHERE email = @email
END
