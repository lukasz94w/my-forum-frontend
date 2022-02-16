import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Topic} from "../model/response/topic";
import {NewTopicContent} from "../model/request/new-topic-content";
import {Topic3} from "../model/response/topic3";
import {TopicStatus} from "../model/request/topic-status";

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

  changeTopicStatus(topicStatus: TopicStatus): Observable<void> {
    return this.httpClient.put<void>(`${this.apiServerUrl}/topic/changeStatus`, topicStatus);
  }

  deleteTopicById(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiServerUrl}/topic/delete/` + id);
  }

  getTopicById(id: number): Observable<Topic3> {
    return this.httpClient.get<Topic3>(`${this.apiServerUrl}/topic/getTopicById/` + id);
  }

  findPageableTopicsInCategory(params: any): Observable<Topic[]> {
    return this.httpClient.get<any>(`${this.apiServerUrl}/topic/findPageableTopicsInCategory`, {params});
  }

  countTopicsAndPostsByCategory(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiServerUrl}/topic/countTopicsAndPostsByCategory`);
  }

  searchInTopicTitles(params: any): Observable<any> {
    return this.httpClient.get<any>(`${this.apiServerUrl}/topic/searchInTopicTitles`, {params});
  }
}
