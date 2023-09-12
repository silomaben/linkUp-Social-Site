import { Component, ElementRef, Renderer2,AfterViewInit, HostListener  } from '@angular/core';

import {ModalService} from '../modal.service';
import { PostsService } from '../services/posts.service';
import { PostResponse, post } from '../interfaces';
import { FormControl, FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { selectUserDetails } from '../user/store/reducers';
import { select } from '@ngrx/store';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';



@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent {
 


  constructor(
    private modalService: ModalService,
    private posts:PostsService,
    private renderer: Renderer2, 
    private el: ElementRef,
    private toastr: ToastrService,
    private store: Store,
    private formBuilder: FormBuilder,
    private router: Router
    // private likingPost:PostsService,
    ) {
      
    }
    allpost: post[] = [];

    postOptionsVisibility: boolean[] = [];


    editPostForm = this.formBuilder.group({
      body: new FormControl('',[Validators.required]),
      image: new FormControl(''),
      tagged: new FormControl(''),
    })
    commentPostForm = this.formBuilder.group({
      body: new FormControl('',[Validators.required])
    })

      
    ngOnInit(): void {
      this.posts.getPosts().subscribe((data: PostResponse) => {
        this.postOptionsVisibility = new Array(this.allpost.length).fill(false);
        if (data && data.posts) {
          this.allpost = data.posts;
          console.log(this.allpost);
        }
      });
    }

    
  
   
  likePost(post:post) {
    // To retrieve the user object ...is there a safer way rather than localstorage?
    // **************************************************************************************
    // **************************************************************************************
    // **************************************************************************************
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const user_id = user.user_id;

    // console.log(user_id);
    
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

  togglePostOptions(index: number) {
    this.postOptionsVisibility[index] = !this.postOptionsVisibility[index];
  }
 
  
  @HostListener('document:click', ['$event'])
  handleClick(event: Event): void {
    // Iterate through each post and set its post options visibility to false
    for (let i = 0; i < this.postOptionsVisibility.length; i++) {
      this.postOptionsVisibility[i] = false;
    }
  }

  handleContainerClick(event: Event): void {
    event.stopPropagation(); // Prevent the click event from propagating to the document
  }

  deleteCurrentPost(post_id:string){
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const user_id = user.user_id;
      
      this.posts.deletePost(post_id, user_id).subscribe((response) => {
        console.log(response);
        
        if(response.message = "Post deleted successfully"){

          const index = this.allpost.findIndex(post => post.post_id === post_id);
        
        if (index !== -1) {
  
            this.allpost.splice(index, 1);
            this.toastr.success('Post Deleted successfully!');
          }else{
            this.toastr.success('Error: Please try again later!');
          }

          
          
        }

      })

    }
  }

  
viewComments(post_id: string) {
  this.router.navigate(['/view-post', post_id]);
}


// *******************************     used ngrx     ********************************************
  editCurrentPost(post_id:string){
    this.store.pipe(select(selectUserDetails)).subscribe((selectUserDetails) => {
      console.log(selectUserDetails);
      
      if(selectUserDetails){
        const user_id = selectUserDetails.user_id;

        const body = this.editPostForm.value.body ?? '';
        const tagged = this.editPostForm.value.tagged ?? '';

        this.posts.editPost(user_id,post_id).subscribe((response)=>{
          console.log('res',response)
          this.toastr.success('Post updated successfully!', 'Success');
        })

      }
      
    });
  }

  isMyPost(postUserId: string): boolean {
    const storedUser = localStorage.getItem('user');
  
    if (storedUser) {
      const user = JSON.parse(storedUser);
      return user.user_id === postUserId;
    }
  
    return false; 
  }

  isAdmin(){
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);      

      return user.is_admin
    }
  }

  postComment(post_id:string){
    const storedUser = localStorage.getItem('user');
      
      if(storedUser){
        const user = JSON.parse(storedUser);
        const user_id = user.user_id;

        const body = this.commentPostForm.value.body ?? '';

        this.posts.commentPost(post_id,user_id,body).subscribe((response)=>{
          console.log('res',response)
          this.toastr.success('Comment added');
        })
      }
  }



  closePostOptions(index: number): void {
    this.postOptionsVisibility[index] = false;
  }
  
  

open() {
  this.modalService.open();
}
close() {
  this.modalService.close();
}


}
