import {Topic} from "./topic";
import {User} from "./user";

export class Post {

  content: string;
  topic: Topic;
  user: User;

  constructor(content: string, topic: Topic, user: User) {
    this.content = content;
    this.topic = topic;
    this.user = user;
  }
}
