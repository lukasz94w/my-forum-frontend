import {Topic} from "./topic";

export class Post {

  id: number | undefined;
  content: string;
  topic: Topic;

  constructor(content: string, topic: Topic) {
    this.content = content;
    this.topic = topic;
  }
}
