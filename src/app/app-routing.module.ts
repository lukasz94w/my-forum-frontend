import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TopicComponent} from "./topic/topic.component";
import {TopicViewComponent} from "./topic/topic-view/topic-view.component";
import {TopicAddComponent} from "./topic/topic-add/topic-add.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {SigninComponent} from "./auth/signin/signin.component";
import {TopicCategoriesComponent} from "./topic/topic-categories/topic-categories.component";
import {TopicListComponent} from "./topic/topic-list/topic-list.component";
import {UserProfileComponent} from "./user/user-profile/user-profile.component";

const routes: Routes = [
  {path: '', redirectTo: '/topic-categories', pathMatch: 'full'},
  {path: 'topic-categories', component: TopicComponent},
  {path: 'topic-list/:category', component: TopicListComponent},
  {path: 'topic/:id', component: TopicViewComponent},
  {path: 'topic-add/:category', component: TopicAddComponent},
  {path: 'auth/signup', component: SignupComponent},
  {path: 'auth/signin', component: SigninComponent},
  {path: 'user-profile', component: UserProfileComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
