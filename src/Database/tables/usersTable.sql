CREATE TABLE Users (
  user_id VARCHAR(255) PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  profile_pic_url VARCHAR(255),
  password VARCHAR(1000) NOT NULL,
  bio VARCHAR(800),
  linkedin_url VARCHAR(255),
  facebook_url VARCHAR(255),
  website_url VARCHAR(255),
  instagram_url VARCHAR(255),
  twitter_url VARCHAR(255),
  password_reset_token VARCHAR(255),
  password_reset_expiration VARCHAR(50),
  keep_email_private BIT DEFAULT 0,
  email_confirmed BIT  DEFAULT 0, -- confirm registration
  is_verified BIT  DEFAULT 0,  -- celeb status
  is_suspended BIT  DEFAULT 0, --user is suspended for violating terms such as 
  is_disabled BIT  DEFAULT 0,  --user disables account and cannot be found when searched (deactivate)
  is_deleted BIT  DEFAULT 0, --user is blocked from using platform by admin {let admin know and authorize account deletion}
  is_admin BIT  DEFAULT 0, 
);

drop table users
delete from Users

select * from Users

UPDATE Users
  SET is_admin = 1
  WHERE username = 'silomaben'