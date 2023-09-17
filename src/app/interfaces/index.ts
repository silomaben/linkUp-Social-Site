export interface post{
    post_id: string,
    user_id: string,
    full_name: string,
    user_name: string,
    image:string,
    body: string,
    user_dp: string,
    datetime: Date,
    tagged_users: string,
    has_liked: boolean,
    like_count: number,
  }

export interface PostResponse {
    posts: post[];
}

export interface likePostResponse {
  message: string
}

export interface likePostRequest {
  user_id: string;
  post_id: string;
}

export interface loginRequest {
  credential: string;
  passcode: string;
}

export interface loginResponse 
{
  message: string,
  error: string,
  token: string,
  user: {
    user_id: string,
    first_name: string,
    last_name: string,
    username: string,
    email: string,
    profile_pic_url: string,
    bio: string,
    linkedin_url: string,
    facebook_url: string,
    website_url: string,
    instagram_url:string,
    twitter_url: string,
    password_reset_token: string,
    password_reset_expiration: Date,
    keep_email_private: boolean,
    email_confirmed: boolean,
    is_suspended: boolean,
    is_disabled: boolean,
    is_admin: boolean
  }
}


export interface postOptions {
  showOptions: boolean;
}
