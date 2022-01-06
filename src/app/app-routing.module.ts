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

const routes: Routes = [
  {path: '', redirectTo: '/topic-categories', pathMatch: 'full'},
  {path: 'topic-categories', component: TopicCategoriesComponent},
  {path: 'topic-list/:category', component: TopicListComponent},
  {path: 'topic/:id', component: TopicViewComponent},
  {path: 'topic-add/:category', component: TopicAddComponent},
  {path: 'auth/sign-up', component: SignUpComponent},
  {path: 'auth/sign-in', component: SignInComponent},
  {path: 'auth/reset', component: ResetPasswordComponent},
  {path: 'auth/change', component: ChangePasswordComponent},
  {path: 'auth/activate', component: ActivateAccountComponent},
  {path: 'user-profile-settings/:username', component: UserProfileSettingsComponent}
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
