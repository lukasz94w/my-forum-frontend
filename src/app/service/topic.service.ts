import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Topic} from "../model/topic";
import {TopicContent} from "../model/topic-content";

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

  countTopicsAndPostsByCategory(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiServerUrl}/topic/countTopicsAndPostsByCategory`);
  }
}
