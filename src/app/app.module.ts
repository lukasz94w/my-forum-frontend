import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {NavigationHeaderComponent} from './navigation-header/navigation-header.component';
import {TopicListComponent} from './topic/topic-list/topic-list.component';
import {TopicViewComponent} from './topic/topic-view/topic-view.component';
import {PostAddComponent} from './post/post-add/post-add.component';
import {FormsModule} from "@angular/forms";
import {TopicAddComponent} from './topic/topic-add/topic-add.component';
import {SignUpComponent} from './auth/sign-up/sign-up.component';
import {SignInComponent} from './auth/sign-in/sign-in.component';

import {interceptorProviders} from './auth/interceptor/interceptor';
import {TopicCategoriesComponent} from './topic/topic-categories/topic-categories.component';
import {NgxPaginationModule} from "ngx-pagination";
import {TruncatePipe} from "./pipe/truncate-pipe";
import {TimeAgoPipe} from "./pipe/time-ago-pipe";
import {ImageCropperModule} from "ngx-image-cropper";
import {UserProfileSettingsComponent} from "./user/user-profile-settings.component";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {UserProfileSettingsPasswordComponent} from './user/user-profile-settings-password/user-profile-settings-password.component';
import {UserProfileSettingsAvatarComponent} from './user/user-profile-settings-avatar/user-profile-settings-avatar.component';
import {UserProfileSettingsPostListComponent} from './user/user-profile-settings-post-list/user-profile-settings-post-list.component';
import {UserProfileSettingsTopicListComponent} from './user/user-profile-settings-topic-list/user-profile-settings-topic-list.component';
import {UserProfileSettingsAccountInfoComponent} from './user/user-profile-settings-account-info/user-profile-settings-account-info.component';
import {ResetPasswordComponent} from './auth/reset-password/reset-password.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationHeaderComponent,
    TopicListComponent,
    TopicViewComponent,
    PostAddComponent,
    TopicAddComponent,
    SignUpComponent,
    SignInComponent,
    TopicCategoriesComponent,
    TruncatePipe,
    TimeAgoPipe,
    UserProfileSettingsComponent,
    UserProfileSettingsPasswordComponent,
    UserProfileSettingsAvatarComponent,
    UserProfileSettingsPostListComponent,
    UserProfileSettingsTopicListComponent,
    UserProfileSettingsAccountInfoComponent,
    ResetPasswordComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    ImageCropperModule,
    NgbModule,
  ],
  providers: [interceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
