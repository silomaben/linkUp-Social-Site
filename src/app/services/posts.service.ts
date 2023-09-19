import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostResponse, likePostResponse, likePostRequest } from '../interfaces';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor( private http:HttpClient) { }

 
    getPosts(): Observable<PostResponse> {

        const storedUser = localStorage.getItem('user');
        let user_id = null
      if (storedUser) {
        const user = JSON.parse(storedUser);
        user_id = user.user_id;
      }

      let url = null
      if(user_id){
        url = `http://localhost:4500/posts/fetchPostsBasedOnPerfomance/${user_id}`;
      } else {
        url = `http://localhost:4500/posts/fetchPostsBasedOnPerfomance/234a7d37-d622-47da-b41a-e314cd619b7e`
      }
    
      return this.http.get<PostResponse>(url); 
    }

    getRecentPosts(): Observable<PostResponse> {

        const storedUser = localStorage.getItem('user');
        let user_id = null
      if (storedUser) {
        const user = JSON.parse(storedUser);
        user_id = user.user_id;
      }

      let url = null
      if(user_id){
        url = `http://localhost:4500/posts/fetchRecentPosts/${user_id}`;
      } else {
        url = `http://localhost:4500/posts/fetchRecentPosts/234a7d37-d622-47da-b41a-e314cd619b7e`
      }
    
      return this.http.get<PostResponse>(url); 
    }

    getSinglePost(post_id:string,user_id:string){
      const url = `http://localhost:4500/posts/viewSinglePost/${post_id}`

      const requestBody = {
        user_id: user_id
      }

      

      return this.http.post<any>(url,requestBody)
    }

    likePost(user_id:string,post_id:string): Observable<likePostResponse> {
      const url = 'http://localhost:4500/posts/likepost';

      const requestBody: likePostRequest = {
        user_id: user_id,
        post_id: post_id
      };

      return this.http.post<likePostResponse>(url,requestBody)
    }


    unlikePost(user_id:string,post_id:string): Observable<likePostResponse> {
      const url = 'http://localhost:4500/posts/unlikepost';

      const requestBody: likePostRequest = {
        user_id: user_id,
        post_id: post_id
      };

      return this.http.post<likePostResponse>(url,requestBody)
    };



    createPost(user_id:string, image:string,body:string,tagged:string[]):Observable<any>{
      const url = 'http://localhost:4500/posts/createpost';

      const requestBody = {
        user_id: user_id,
        image: image,
        body: body,
        tagged: tagged
      }

      return this.http.post<any>(url,requestBody)
    }


    deletePost(post_id:string, user_id:string){
      const url = `http://localhost:4500/posts/deletepost/${post_id}`

      const requestBody = {
        user_id: user_id
      }

      return this.http.put<any>(url,requestBody)
    }

    editPost(user_id: string,post_id: string,body:string,tagged:string){
      const url = 'http://localhost:4500/posts/editpost';

      const requestBody = {
        user_id: user_id,
        post_id: post_id,
        body: body,
        tagged: tagged
      }

      return this.http.put<any>(url,requestBody)
    }


    commentPost(post_id:string, user_id:String,body:string ){
      const url = ' http://localhost:4500/posts/createComment';

      const requestBody = {
        user_id: user_id,
        post_id: post_id,
        body:body,
      }

      return this.http.post<any>(url,requestBody)
    }

    subCommentPost(comment_id:string, user_id:String,body:string ){
      const url = 'http://localhost:4500/posts/createSubComment';

      const requestBody = {
        user_id: user_id,
        comment_id: comment_id,
        body:body,
      }

      return this.http.post<any>(url,requestBody)
    }


    likeComment(user_id:string,comment_id:string): Observable<likePostResponse> {
      const url = 'http://localhost:4500/posts/likeComment';

      const requestBody = {
        user_id: user_id,
        comment_id: comment_id
      };

      return this.http.post<any>(url,requestBody)
    }


    unlikeComment(user_id:string,comment_id:string): Observable<likePostResponse> {
      const url = 'http://localhost:4500/posts/unlikeComment';

      const requestBody = {
        user_id: user_id,
        comment_id: comment_id
      };

      return this.http.post<any>(url,requestBody)
    };

    likeSubcomment(user_id:string,subcomment_id:string): Observable<likePostResponse> {
      const url = 'http://localhost:4500/posts/likeSubcomment';

      const requestBody = {
        user_id: user_id,
        subcomment_id: subcomment_id
      };

      return this.http.post<any>(url,requestBody)
    }


    unlikeSubcomment(user_id:string,subcomment_id:string): Observable<likePostResponse> {
      const url = 'http://localhost:4500/posts/unlikeSubcomment';

      const requestBody = {
        user_id: user_id,
        subcomment_id: subcomment_id
      };

      return this.http.post<any>(url,requestBody)
    };

    editComment(comment_id:string,post_id:string,user_id:string,body:string): Observable<any> {
      const url = 'http://localhost:4500/posts/updateComment';

      comment_id = comment_id.toString()
      
      const requestBody = {
        comment_id: comment_id,
        post_id: post_id,
        user_id: user_id,
        body: body,
    }    

      return this.http.post<any>(url,requestBody)
    }

    editSubcomment(subcomment_id:string,comment_id:string,user_id:string,body:string): Observable<any> {
      const url = 'http://localhost:4500/posts/updateSubcomment';

      // comment_id = comment_id.toString()
      // subcomment_id = comment_id.toString()
      
      const requestBody = {
        subcomment_id: subcomment_id,
        comment_id: comment_id,
        user_id: user_id,
        body: body,
    }    

    console.log();
    

      return this.http.post<any>(url,requestBody)
    }




    

    
    
   
}

