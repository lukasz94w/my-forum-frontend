import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Topic} from "../model/topic";
import {Post} from "../model/post";
import {error} from "@angular/compiler/src/util";

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {
  }

  addNewTopic(topic: Topic) {
    return this.httpClient.post(`${this.apiServerUrl}/topic/addTopic`, topic).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error)
        alert("Błędne dane panie!");
      }
    )

  }

  getTopics(): Observable<any[]> {
    return this.httpClient.get<any>(`${this.apiServerUrl}/topic/getTopics`);
  }

  getTopicById(id: number) {
    return this.httpClient.get<Topic>(`${this.apiServerUrl}/topic/getTopicById/` + id);
  }
}
