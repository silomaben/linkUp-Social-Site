import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { SinglePostComponent } from './single-post/single-post.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { AuthStatusResolver } from './auth.resolver';
import { AuthenticationGuard } from './auth.guard';
import { CustomRouteReuseStrategy } from './custom-route-reuse.strategy';

const routes: Routes = [
  {path:"", component: FeedComponent,
  canActivate: [AuthenticationGuard],
  resolve: { isAuthenticated: AuthStatusResolver },},
  {path:"search", component: SearchComponent},
  {path:"view-profile", component: ViewProfileComponent},
  {path:"edit-profile", component: EditProfileComponent},
  {path:'view-post/:post_id', component: SinglePostComponent},
  {path:"auth/login", component: LoginComponent},
  {path:"auth/register", component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

