
CREATE OR ALTER PROCEDURE registerNewUserProc(
    @user_id VARCHAR(255),
    @first_name VARCHAR(255),
    @last_name VARCHAR(255),
    @username VARCHAR(255), 
    @email VARCHAR(255),
    @profile_pic_url VARCHAR(255),
    @password VARCHAR(1000)
    )
AS
BEGIN
INSERT INTO Users (user_id, first_name, last_name,username, email,profile_pic_url, password)
    VALUES(@user_id,@first_name, @last_name,@username, @email, @profile_pic_url, @password)
END


