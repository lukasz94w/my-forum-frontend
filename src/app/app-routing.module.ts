import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TopicComponent} from "./topic/topic.component";
import {TopicViewComponent} from "./topic/topic-view/topic-view.component";
import {TopicAddComponent} from "./topic/topic-add/topic-add.component";

const routes: Routes = [
  {path: '', redirectTo: '/topic', pathMatch: 'full'},
  {path: 'topic', component: TopicComponent},
  {path: 'topic/:id', component: TopicViewComponent},
  {path: 'topic-add', component: TopicAddComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
