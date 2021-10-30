import {Component, OnInit} from '@angular/core';
import {TopicService} from "../../service/topic.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {TopicContent} from "../../model/topic-content";

@Component({
  selector: 'app-topic-add',
  templateUrl: './topic-add.component.html',
  styleUrls: ['./topic-add.component.css']
})
export class TopicAddComponent implements OnInit {

  form: any = {
    title: null, content: null
  }
  category = ''

  constructor(private topicService: TopicService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) =>
        this.category = params['category']
    )
  }

  addNewTopic() {
    const {title, content} = this.form;
    const newTopic = new TopicContent(title, content, this.category);
    this.topicService.createNewTopic(newTopic).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/']);
      },
      (error) => {
        console.log(error)
        alert("Błędne dane panie!");
      }
    )
  }
}
