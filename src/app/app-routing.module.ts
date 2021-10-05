import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TopicComponent} from "./topic/topic.component";
import {TopicViewComponent} from "./topic/topic-view/topic-view.component";

const routes: Routes = [
  {path: '', redirectTo: '/topic', pathMatch: 'full'},
  {path: 'topic', component: TopicComponent},
  {path: 'topic/:id', component: TopicViewComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
