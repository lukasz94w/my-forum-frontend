import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TopicService} from "../../service/topic.service";
import {Router} from "@angular/router";
import {NewTopicContent} from "../../model/request/new-topic-content";
import {TopicStatus} from "../../model/request/topic-status";

@Component({
  selector: 'app-topic-admin-buttons',
  templateUrl: './topic-admin-buttons.component.html',
  styleUrls: ['./topic-admin-buttons.component.css']
})
export class TopicAdminButtonsComponent {

  @Input() topicId: number = 0;
  @Input() isTopicOpen: boolean = true;
  @Output() isTopicOpenStatusHasChangedEvent = new EventEmitter();

  constructor(private topicService: TopicService, private router: Router) {
  }

  openTopic() {
    this.topicService.changeTopicStatus(new TopicStatus(this.topicId, false)).subscribe(
      () => {
        this.isTopicOpenStatusHasChangedEvent.emit();
      },
      () => {
        alert("Error during opening topic. Try again later")
      }
    )
  }

  closeTopic() {
    this.topicService.changeTopicStatus(new TopicStatus(this.topicId, true)).subscribe(
      () => {
        this.isTopicOpenStatusHasChangedEvent.emit();
      },
      () => {
        alert("Error during closing topic. Try again later")
      }
    )
  }

  deleteTopic() {
    this.topicService.deleteTopicById(this.topicId).subscribe(
      () => {
        this.router.navigate(['topic-categories']);
      },
      () => {
        alert("Error during deleting topic. Try again later")
      }
    )
  }
}
