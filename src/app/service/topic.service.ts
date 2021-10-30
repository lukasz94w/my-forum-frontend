import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Topic} from "../model/topic";
import {Post} from "../model/post";
import {error} from "@angular/compiler/src/util";
import {TopicContent} from "../model/topic-content";
import {Summary} from "../model/summary";

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {
  }

  createNewTopic(topicContent: TopicContent): Observable<void> {
    return this.httpClient.post<void>(`${this.apiServerUrl}/topic/addTopic`, topicContent);
  }

  getTopics(): Observable<Topic[]> {
    return this.httpClient.get<Topic[]>(`${this.apiServerUrl}/topic/getTopics`);
  }

  getTopicById(id: number): Observable<Topic> {
    return this.httpClient.get<Topic>(`${this.apiServerUrl}/topic/getTopicById/` + id);
  }

  findAllTopicsByCategory(params: any): Observable<Topic[]> {
    return this.httpClient.get<Topic[]>(`${this.apiServerUrl}/topic/findAllTopicsByCategory`, {params});
  }

  countTopicsAndPostsByCategory(): Observable<Summary> {
    return this.httpClient.get<Summary>(`${this.apiServerUrl}/topic/countTopicsAndPostsByCategory`);
  }
}
