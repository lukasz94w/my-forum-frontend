import {Topic} from "./topic";

export class Post {

  id: number;
  content: string;
  topic: Topic;

  constructor(id: number, content: string, topic: Topic) {
    this.id = id;
    this.content = content;
    this.topic = topic;
  }
}
