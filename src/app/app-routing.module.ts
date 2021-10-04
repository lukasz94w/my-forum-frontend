import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TopicComponent} from "./topic/topic.component";

const routes: Routes = [
  {path: '', redirectTo: '/topic', pathMatch: 'full'},
  {path: 'topic', component: TopicComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
