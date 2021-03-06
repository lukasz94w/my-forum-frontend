import {Component, OnInit} from '@angular/core';
import {TopicService} from "../../service/topic.service";
import {LastTopicActivity} from "../../model/response/last-topic-activity";
import {TextProviderService} from "../../service/text-provider.service";

@Component({
  selector: 'app-topic-categories',
  templateUrl: './topic-categories.component.html',
  styleUrls: ['./topic-categories.component.css']
})
export class TopicCategoriesComponent implements OnInit {

  numberOfTopicsInEachCategory: number[] = [];
  numberOfPostsInEachCategory: number[] = [];
  numberOfEntriesInGeneralSubjects: number = 0;
  numberOfEntriesInOtherSubjects: number = 0;
  lastPageableTopicActivities: LastTopicActivity[] = [];
  topicsCategories: string[] = [];
  topicsDescription: string[] = [];
  topicIconNames: string[] = [];

  generalSubjectsName = 'General subjects'
  rangeOfGeneralSubjects: number[] = [0, 4];
  otherSubjectsName = 'Other subjects'
  rangeOfOtherSubjects: number[] = [4, 7];

  constructor(private topicService: TopicService, private textProviderService: TextProviderService) {
  }

  ngOnInit(): void {
    this.topicService.countTopicsAndPostsByCategory().subscribe(
      (data) => {
        this.numberOfTopicsInEachCategory = data.numberOfTopicsInEachCategory;
        this.numberOfPostsInEachCategory = data.numberOfPostsInEachCategory;
        this.numberOfEntriesInGeneralSubjects = data.numberOfEntriesInGeneralSubjects;
        this.numberOfEntriesInOtherSubjects = data.numberOfEntriesInOtherSubjects;
        this.lastPageableTopicActivities = data.lastTopicActivities;
        this.topicsCategories = this.textProviderService.getTopicsCategories();
        this.topicsDescription = this.textProviderService.getTopicsDescription();
        this.topicIconNames = this.textProviderService.getTopicIconNames();
      },
      (error) => {
        console.log(error);
      })
  }
}
