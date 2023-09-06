USE linkUp
GO

CREATE OR ALTER PROCEDURE activateDisabledUserProc(
    @email VARCHAR(255)
    )
AS
BEGIN
    UPDATE users SET is_disabled = 0 WHERE email = @email AND is_admin = 0
END