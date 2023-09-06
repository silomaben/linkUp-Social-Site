CREATE OR ALTER PROCEDURE deactivateUserAccountProc(
    @user_id VARCHAR(255)
    )
AS
BEGIN
    UPDATE Users SET is_disabled = 1 WHERE user_id = @user_id AND is_admin = 0
END