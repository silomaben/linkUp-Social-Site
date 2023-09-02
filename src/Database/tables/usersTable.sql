CREATE TABLE Users (
  user_id VARCHAR(255) PRIMARY KEY,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  username VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  bio VARCHAR(800),
  linkedin_url VARCHAR(255),
  facebook_url VARCHAR(255),
  website_url VARCHAR(255),
  instagram_url VARCHAR(255),
  twitter_url VARCHAR(255),
  profile_pic_url VARCHAR(255),
  password_reset_token VARCHAR(255),
  password_reset_expiration DATETIME,
  keep_email_private BIT,
  is_admin BIT,
  is_deleted BIT,
  is_verified BIT,
  is_suspended BIT,
  is_disabled BIT
);



INSERT INTO Users (user_id, first_name, last_name, email, password, is_admin, is_verified)
VALUES ('1', 'siloma', 'ben', 'admin@example.com', 'hashed_password_here', 1, 1);
