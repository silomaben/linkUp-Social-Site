import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { post } from '../interfaces';
import { PostsService } from '../services/posts.service';
import {FormControl, FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  constructor(
    private router:Router,
    private User:UserService,
    private posts:PostsService, 
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private modalService: ModalService,
    ){}
    

  // my forms
  commentPostForm = this.formBuilder.group({
    body: new FormControl('',[Validators.required])
  })

  //this is for switching in between the profile (posts||followers||following)
    navigateTo: string = 'posts'; // Default to 'posts'

    // Function to change the active tab
    setActiveTab(tab: string) {
      this.navigateTo = tab;
    }

  // the rest :)

  userProfileData: any;
  followersNfollowing: any;
  singleUserPosts: post[] = [];
  postOptionsVisibility: boolean[] = [];


  ngOnInit() {
    this.fetchUserProfile()
    this.fetchUserPosts()
  }


  fetchUserProfile(){
    const currentUrl = window.location.href;
    const urlParts = currentUrl.split('/');
    const usernameSegment = urlParts[urlParts.indexOf('profile') + 1];
    const urlUsername = usernameSegment.trim();

    const storedUser = localStorage.getItem('user');
  
    if (storedUser) {
      const user = JSON.parse(storedUser);
      // console.log(urlUsername);
      
      const user_id = user.user_id;
      this.User.viewUser(user_id,urlUsername).subscribe((response) =>{
        this.userProfileData = response.message[0];
        this.followersNfollowing = response.friends
        
        console.log(this.followersNfollowing)
      })
    }
  }


  fetchUserPosts(){
    const currentUrl = window.location.href;
    const urlParts = currentUrl.split('/');
    const usernameSegment = urlParts[urlParts.indexOf('profile') + 1];
    const urlUsername = usernameSegment.trim();

    const storedUser = localStorage.getItem('user');
  
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const user_id = user.user_id;
      this.postOptionsVisibility = new Array(this.singleUserPosts.length).fill(false);
      this.User.getPostsForUser(urlUsername,user_id).subscribe((data)=>{
        if (data && data.posts) {
          this.singleUserPosts = data.posts;

        }

      })

    }
  }

  viewComments(post_id: string) {
    this.router.navigate(['/view-post', post_id]);
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


  togglePostOptions(index: number) {
    this.postOptionsVisibility[index] = !this.postOptionsVisibility[index];
  }
  closePostOptions(index: number): void {
    this.postOptionsVisibility[index] = false;
  }

  viewUserProfile(username:string){
    this.fetchUserProfile()
    this.fetchUserPosts()
    this.router.navigate(['/profile', username]);
    

  }

  isMyProfile(profile_id:string){
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const user_id = user.user_id;
      const user_name = user.user_name
      if(user_id==profile_id){
        return true
      } else if(user_name==profile_id){
        return true
      }
    }
    
    return false

  }

  isUsernameMine(username:string){
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const user_name = user.username
      console.log(user_name,username);
      
      if(user_name==username){
        return true
      }
    }
    
    return false

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
          // console.log(response.message)
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

  follow(followed_id:string){
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const user_id = user.user_id;
      this.User.followUser(user_id, followed_id).subscribe((response)=>{
        console.log(response);
        this.userProfileData.i_follow_them = true;
      })

    }

  }
  unfollow(unfollowed_id:string){
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const user_id = user.user_id;
      this.User.unfollowUser(user_id, unfollowed_id).subscribe((response)=>{
        console.log(response);
        this.userProfileData.i_follow_them = false;
      })

    }

  }


  deleteCurrentPost(post_id:string){
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const user_id = user.user_id;
      
      this.posts.deletePost(post_id, user_id).subscribe((response) => {
        console.log(response);
        
        if(response.message = "Post deleted successfully"){

          const index = this.singleUserPosts.findIndex(post => post.post_id === post_id);
        
        if (index !== -1) {
  
            this.singleUserPosts.splice(index, 1);
            this.toastr.success('Post Deleted successfully!');
          }else{
            this.toastr.success('Error: Please try again later!');
          }

          
          
        }

      })

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
