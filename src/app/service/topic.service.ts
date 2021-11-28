import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Topic} from "../model/topic";
import {NewTopicContent} from "../model/new-topic-content";

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {
  }

  createNewTopic(topicContent: NewTopicContent): Observable<void> {
    return this.httpClient.post<void>(`${this.apiServerUrl}/topic/addTopic`, topicContent);
  }

  getTopics(): Observable<Topic[]> {
    return this.httpClient.get<Topic[]>(`${this.apiServerUrl}/topic/getTopics`);
  }

  getTopicById(id: number): Observable<Topic> {
    return this.httpClient.get<Topic>(`${this.apiServerUrl}/topic/getTopicById/` + id);
  }

  findPageableTopicsInCategory(params: any): Observable<Topic[]> {
    return this.httpClient.get<any>(`${this.apiServerUrl}/topic/findPageableTopicsInCategory`, {params});
  }

  countTopicsAndPostsByCategory(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiServerUrl}/topic/countTopicsAndPostsByCategory`);
  }
}
