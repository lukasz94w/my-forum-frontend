import {Topic} from "./topic";

export class Post {

  content: string;
  topic: Topic;
  username: string;

  constructor(content: string, topic: Topic, username: string) {
    this.content = content;
    this.topic = topic;
    this.username = username;
  }
}
