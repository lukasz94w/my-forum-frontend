import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TopicService} from "../../service/topic.service";
import {Router} from "@angular/router";
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

  changeTopicStatus(status: boolean) {
    this.topicService.changeTopicStatus(new TopicStatus(this.topicId, status)).subscribe(
      () => {
        this.isTopicOpenStatusHasChangedEvent.emit();
      },
      () => {
        alert("Error occured. Try again later");
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
