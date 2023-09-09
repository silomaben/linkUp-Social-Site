import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SinglePostComponent } from './single-post/single-post.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FeedComponent } from './feed/feed.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ModalComponent } from './modal/modal.component';
import { SearchComponent } from './search/search.component';


import {HttpClientModule} from '@angular/common/http'
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SinglePostComponent,
    EditProfileComponent,
    FeedComponent,
    FooterComponent,
    ViewProfileComponent,
    LoginComponent,
    RegisterComponent,
    ModalComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
