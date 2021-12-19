import {NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {TopicComponent} from "./topic/topic.component";
import {TopicViewComponent} from "./topic/topic-view/topic-view.component";
import {TopicAddComponent} from "./topic/topic-add/topic-add.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {SigninComponent} from "./auth/signin/signin.component";
import {TopicListComponent} from "./topic/topic-list/topic-list.component";
import {UserProfileSettingsComponent} from "./user/user-profile-settings.component";

const routes: Routes = [
  {path: '', redirectTo: '/topic-categories', pathMatch: 'full'},
  {path: 'topic-categories', component: TopicComponent},
  {path: 'topic-list/:category', component: TopicListComponent},
  {path: 'topic/:id', component: TopicViewComponent},
  {path: 'topic-add/:category', component: TopicAddComponent},
  {path: 'auth/signup', component: SignupComponent},
  {path: 'auth/signin', component: SigninComponent},
  {path: 'user-profile-settings', component: UserProfileSettingsComponent}
];
const routerOptions: ExtraOptions = {
  scrollPositionRestoration: "enabled",
  anchorScrolling: "enabled",
  scrollOffset: [0, 64],
}

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
