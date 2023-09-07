CREATE OR ALTER PROCEDURE unbarnUserAccountProc(
    @user_id VARCHAR(255)
)
AS
BEGIN
    UPDATE Users SET is_deleted = 0 WHERE user_id = @user_id
END
