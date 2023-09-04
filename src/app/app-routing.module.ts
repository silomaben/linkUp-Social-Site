import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { SinglePostComponent } from './single-post/single-post.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:"", component: FeedComponent},
  {path:"view-profile", component: ViewProfileComponent},
  {path:"edit-profile", component: EditProfileComponent},
  {path:"view-post", component: SinglePostComponent},
  {path:"login", component: LoginComponent},
  {path:"register", component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

