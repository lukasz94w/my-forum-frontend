import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
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
import {ChangePasswordComponent} from './auth/change-password/change-password.component';
import {ActivateAccountComponent} from './auth/activate-account/activate-account.component';
import {PostListComponent} from './post/post-list/post-list.component';
import {UserProfileSettingsAdminPanelComponent} from './user/user-profile-settings-admin-panel/user-profile-settings-admin-panel.component';
import {UserBanWindowComponent} from './user/user-ban-window/user-ban-window.component';
import {TopicAdminButtonsComponent} from './topic/topic-admin-buttons/topic-admin-buttons.component';
import {LoadingScreenComponent} from './loading/loading-screen.component';
import {TemplateNotFoundComponent} from './error/template-not-found/template-not-found.component';
import {ForumItemNotFoundComponent} from './error/forum-item-not-found/forum-item-not-found.component';
import {PageNotFoundComponent} from './error/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
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
    ChangePasswordComponent,
    ActivateAccountComponent,
    PostListComponent,
    UserProfileSettingsAdminPanelComponent,
    UserBanWindowComponent,
    TopicAdminButtonsComponent,
    LoadingScreenComponent,
    TemplateNotFoundComponent,
    ForumItemNotFoundComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    ImageCropperModule,
    NgbModule
  ],
  providers: [interceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
