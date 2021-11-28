import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {NavigationHeaderComponent} from './navigation-header/navigation-header.component';
import {TopicComponent} from './topic/topic.component';
import {TopicListComponent} from './topic/topic-list/topic-list.component';
import {TopicViewComponent} from './topic/topic-view/topic-view.component';
import {PostAddComponent} from './post/post-add/post-add.component';
import {FormsModule} from "@angular/forms";
import {TopicAddComponent} from './topic/topic-add/topic-add.component';
import {SignupComponent} from './auth/signup/signup.component';
import {SigninComponent} from './auth/signin/signin.component';

import {interceptorProviders} from './auth/interceptor/interceptor';
import {TopicCategoriesComponent} from './topic/topic-categories/topic-categories.component';
import {NgxPaginationModule} from "ngx-pagination";
import {UserProfileComponent} from './user/user-profile/user-profile.component';
import {TruncatePipe} from "./pipe/truncate-pipe";
import {TimeAgoPipe} from "./pipe/time-ago-pipe";

@NgModule({
  declarations: [
    AppComponent,
    NavigationHeaderComponent,
    TopicComponent,
    TopicListComponent,
    TopicViewComponent,
    PostAddComponent,
    TopicAddComponent,
    SignupComponent,
    SigninComponent,
    TopicCategoriesComponent,
    UserProfileComponent,
    TruncatePipe,
    TimeAgoPipe],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [interceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
