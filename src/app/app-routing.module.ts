import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TopicComponent} from "./topic/topic.component";
import {TopicViewComponent} from "./topic/topic-view/topic-view.component";
import {TopicAddComponent} from "./topic/topic-add/topic-add.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {SigninComponent} from "./auth/signin/signin.component";

const routes: Routes = [
  {path: '', redirectTo: '/topic-list', pathMatch: 'full'},
  {path: 'topic-list', component: TopicComponent},
  {path: 'topic/:id', component: TopicViewComponent},
  {path: 'topic-add', component: TopicAddComponent},
  {path: 'auth/signup', component: SignupComponent},
  {path: 'auth/signin', component: SigninComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
