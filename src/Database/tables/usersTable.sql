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
  email_confirmed BIT,
  is_verified BIT,
  is_suspended BIT,
  is_disabled BIT,
  is_deleted BIT,
  is_admin BIT,
);

drop table users
delete from Users

UPDATE Users
  SET is_admin = 1
  WHERE username = 'silomaben'