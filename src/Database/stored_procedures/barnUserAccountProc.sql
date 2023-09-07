
CREATE OR ALTER PROCEDURE barnUserAccountProc(
    @user_id VARCHAR(255)
)
AS
BEGIN
    UPDATE Users SET is_deleted = 1 WHERE user_id = @user_id and is_admin = 0
END
