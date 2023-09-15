CREATE OR ALTER PROCEDURE updateUserInformationProc(
    @user_id VARCHAR(255),
    @first_name VARCHAR(255),
    @last_name VARCHAR(255),
    @username VARCHAR(255),
    @profile_pic_url VARCHAR(255),
    @bio VARCHAR(800),
    @linkedin_url VARCHAR(255),
    @facebook_url VARCHAR(255),
    @website_url VARCHAR(255),
    @instagram_url VARCHAR(255),
    @twitter_url VARCHAR(255)
    )
AS
BEGIN
    UPDATE users SET 
    first_name = @first_name,
    last_name = @last_name,
    username = @username,
    profile_pic_url = NULLIF(@profile_pic_url, ''),
    bio = NULLIF(@bio, ''),
    linkedin_url = NULLIF(@linkedin_url, ''),
    facebook_url = NULLIF(@facebook_url, ''),
    website_url = NULLIF(@website_url, ''),
    instagram_url = NULLIF(@instagram_url, ''),
    twitter_url = NULLIF(@twitter_url, '')

    WHERE user_id = @user_id 
END