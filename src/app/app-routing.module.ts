import {NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {TopicViewComponent} from "./topic/topic-view/topic-view.component";
import {TopicAddComponent} from "./topic/topic-add/topic-add.component";
import {SignUpComponent} from "./auth/sign-up/sign-up.component";
import {SignInComponent} from "./auth/sign-in/sign-in.component";
import {TopicListComponent} from "./topic/topic-list/topic-list.component";
import {UserProfileSettingsComponent} from "./user/user-profile-settings.component";
import {TopicCategoriesComponent} from "./topic/topic-categories/topic-categories.component";
import {ResetPasswordComponent} from "./auth/reset-password/reset-password.component";
import {ChangePasswordComponent} from "./auth/change-password/change-password.component";
import {ActivateAccountComponent} from "./auth/activate-account/activate-account.component";
import {TopicAddGuard} from "./guard/topic-add-guard.service";
import {SignedInUserGuard} from "./guard/signed-in-user-guard.service";
import {PostListComponent} from "./post/post-list/post-list.component";

const routes: Routes = [
  {path: '', redirectTo: '/topic-categories', pathMatch: 'full'},
  {path: 'topic-categories', component: TopicCategoriesComponent},
  {path: 'topic-list/:param', component: TopicListComponent},
  {path: 'topic/:id', component: TopicViewComponent},
  {path: 'topic-add/:category', component: TopicAddComponent, canActivate: [TopicAddGuard]},
  {path: 'auth/sign-up', component: SignUpComponent, canActivate: [SignedInUserGuard]},
  {path: 'auth/sign-in', component: SignInComponent, canActivate: [SignedInUserGuard]},
  {path: 'auth/reset', component: ResetPasswordComponent, canActivate: [SignedInUserGuard]},
  {path: 'auth/change', component: ChangePasswordComponent, canActivate: [SignedInUserGuard]},
  {path: 'auth/activate', component: ActivateAccountComponent, canActivate: [SignedInUserGuard]},
  {path: 'user-profile-settings/:username', component: UserProfileSettingsComponent},
  {path: 'post-list', component: PostListComponent}
];
const routerOptions: ExtraOptions = {
  anchorScrolling: "enabled",
  scrollOffset: [0, 64]
}

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
