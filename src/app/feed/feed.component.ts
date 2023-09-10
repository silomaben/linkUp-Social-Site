import { Component } from '@angular/core';

import {ModalService} from '../modal.service';
import { PostsService } from '../services/posts.service';
import { PostResponse, post } from '../interfaces';



@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent {
  allpost: post[] = [];

  constructor(
    private modalService: ModalService,
    private posts:PostsService,
    // private likingPost:PostsService,
    ) {
      
    }

    ngOnInit(): void {
      this.posts.getPosts().subscribe((data: PostResponse) => {
        if (data && data.posts) {
          this.allpost = data.posts;
          console.log(this.allpost);
        }
      });
    }
  
   
  likePost(post:post) {
    // To retrieve the user object 
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const user_id = user.user_id;

    console.log(user_id);
    
    if(!post.has_liked){
      // like post
      this.posts.likePost(user_id, post.post_id).subscribe((response) => {
      
        if (response.message=="liked") {
          post.like_count += 1;
          post.has_liked = true
        } else {
          console.log(response.message)
        }
      });
    }else{
      // unlike post
      this.posts.unlikePost(user_id, post.post_id).subscribe((response) => {
      
        if (response.message=="unliked") {

          post.like_count -= 1;
          post.has_liked = false
        } else {
          console.log(response.message)
        }
      });
    
 }
      
    } else {
      console.log('please login to like');
      
    }
    
    
    
  }

 
  
open() {
  this.modalService.open();
}



}
