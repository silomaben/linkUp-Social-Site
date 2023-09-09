import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor( private http:HttpClient) { }

  getPosts(){
    let url = "http://localhost:4500/posts/fetchPostsBasedOnPerfomance/39cd9427-42c8-44e1-b436-20612b21d144";
    return this.http.get(url); 
  }
}
