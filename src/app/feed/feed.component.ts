import { Component, ElementRef, Renderer2,AfterViewInit, HostListener  } from '@angular/core';

import {ModalService} from '../services/modal.service';
import { PostsService } from '../services/posts.service';
import { PostResponse, post } from '../interfaces';
import { FormControl, FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgConfirmService } from 'ng-confirm-box';

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
    private router: Router,
    private confirmService: NgConfirmService 
    // private likingPost:PostsService,
    ) { }
    allpost: post[] = [];

    postOptionsVisibility: boolean[] = [];

    // my forms
    commentPostForm = this.formBuilder.group({
      body: new FormControl('',[Validators.required])
    })

    // my functions
    ngOnInit(): void {
      this.getPosts()
    }

    getPosts(){
      
      this.posts.getPosts().subscribe((data: PostResponse) => {
        this.postOptionsVisibility = new Array(this.allpost.length).fill(false);
        if (data && data.posts) {
          this.allpost = data.posts;
          // console.log(this.allpost);
        }
      });
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
  

    
  
   
    likePost(post:post) {
      const storedUser = localStorage.getItem('user');
      
      if (storedUser) {
        const user = JSON.parse(storedUser);
        const user_id = user.user_id;

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

    this.confirmService.showConfirm('Are you sure want to delete this post??',
    ()=>{
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
    },
    ()=>{

    })
    
  }

  
viewComments(post_id: string) {
  this.router.navigate(['/view-post', post_id]);
}

viewUserProfile(username:string){
  this.router.navigate(['/profile', username]);
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

  
// view post options function{toggle open and close}
  togglePostOptions(index: number) {
    this.postOptionsVisibility[index] = !this.postOptionsVisibility[index];
  }
  closePostOptions(index: number): void {
    this.postOptionsVisibility[index] = false;
  }
  
  
  // open and close create post modal
  openCreatePostModal() {
    this.modalService.openCreatePostModal();
  }
  closeCreatePostModal() {
    this.modalService.closeCreatePostModal();
  }
  // open and close edit post modal
  openEditPostModal(index: number,post_id:string) {
    this.modalService.openEditPostModal();
    this.postOptionsVisibility[index] = false;
    const postToEdit = document.querySelector(`#post-body-${post_id}`) as HTMLParagraphElement
    const editPostTextbox = document.querySelector('.editPostBody') as HTMLTextAreaElement
    editPostTextbox.value = postToEdit.textContent as string;
    editPostTextbox.id = post_id
    // console.log('post data ' + postToEdit.textContent)
    // console.log(editPostTextbox.textContent)
  }
  closeEditPostModal() {
    this.modalService.closeEditPostModal();
  }


}
