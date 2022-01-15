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
import {SignInGuard} from "./auth/navigation-guard/sign-in-guard.service";
import {SignOutGuard} from "./auth/navigation-guard/sign-out-guard.service";

const routes: Routes = [
  {path: '', redirectTo: '/topic-categories', pathMatch: 'full'},
  {path: 'topic-categories', component: TopicCategoriesComponent},
  {path: 'topic-list/:category', component: TopicListComponent},
  {path: 'topic/:id', component: TopicViewComponent},
  {path: 'topic-add/:category', component: TopicAddComponent, canActivate: [SignInGuard]},
  {path: 'auth/sign-up', component: SignUpComponent, canActivate: [SignOutGuard]},
  {path: 'auth/sign-in', component: SignInComponent, canActivate: [SignOutGuard]},
  {path: 'auth/reset', component: ResetPasswordComponent, canActivate: [SignOutGuard]},
  {path: 'auth/change', component: ChangePasswordComponent, canActivate: [SignOutGuard]},
  {path: 'auth/activate', component: ActivateAccountComponent, canActivate: [SignOutGuard]},
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
