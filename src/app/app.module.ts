import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import { NavigationHeaderComponent } from './navigation-header/navigation-header.component';
import { TopicComponent } from './topic/topic.component';
import { TopicListComponent } from './topic/topic-list/topic-list.component';
import { TopicViewComponent } from './topic/topic-view/topic-view.component';
import {PostComponent} from "./post/post.component";
import { PostAddComponent } from './post/post-add/post-add.component';
import {FormsModule} from "@angular/forms";
import { TopicAddComponent } from './topic/topic-add/topic-add.component';

@NgModule({
    declarations: [
        AppComponent,
        NavigationHeaderComponent,
        TopicComponent,
        TopicListComponent,
        TopicViewComponent,
        PostComponent,
        PostComponent,
        PostAddComponent,
        TopicAddComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
