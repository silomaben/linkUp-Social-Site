CREATE OR ALTER PROCEDURE updateSubcommentProc
  @subcomment_id VARCHAR(255),
  @comment_id VARCHAR(255),
  @user_id VARCHAR(255),
  @body TEXT
AS
BEGIN
  UPDATE Subcomments
  SET body = @body
  WHERE comment_id = @comment_id and user_id = @user_id and subcomment_id = @subcomment_id
END;

