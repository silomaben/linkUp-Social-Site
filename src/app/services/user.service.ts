import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }


  
  viewUser(me_id:string, them_username:string){
    const url = `http://localhost:4500/user/view-user`

    const requestBody = {
      me_id: me_id,
      them_username: them_username
    }

    return this.http.post<any>(url,requestBody)
  }


  getPostsForUser(viewed_username:string, viewer_userId:string){
    const url = `http://localhost:4500/posts/fetchSingleUserPosts/${viewed_username}`

    const requestBody = {
      viewer_userId: viewer_userId
    }

    return this.http.post<any>(url,requestBody)
  }

  followUser(follower_id:string,followed_id:string){
    const url = `http://localhost:4500/user/follow`

    const requestBody = {
      follower_id: follower_id,
      followed_id: followed_id
    }

    return this.http.post<any>(url,requestBody)
  }
  unfollowUser(unfollower_id:string,unfollowed_id:string){
    const url = `http://localhost:4500/user/unfollow`

    const requestBody = {
      unfollower_id: unfollower_id,
      unfollowed_id: unfollowed_id
    }

    return this.http.post<any>(url,requestBody)
  }

  deactivateAccount(user_id: string,password:string){
    const url = `http://localhost:4500/auth/deactivate`

    const requestBody = {
      user_id: user_id,
      password: password
  }

    return this.http.post<any>(url,requestBody)
  }

  updateUserInfo(user_id:string,first_name:string,last_name:string,username:string,profile_pic_url:string,bio:string,linkedin_url:string,facebook_url:string,website_url:string,instagram_url:string,twitter_url:string){
    const url = `http://localhost:4500/user/edit-profile`

    const requestBody = {
      user_id: user_id,
      first_name: first_name,
      last_name: last_name,
      username:username,
      profile_pic_url: profile_pic_url,
      bio: bio,
      linkedin_url:linkedin_url,
      facebook_url:facebook_url,
      website_url:website_url,
      instagram_url:instagram_url,
      twitter_url:twitter_url
  }
  

    return this.http.post<any>(url,requestBody)
  }

}
