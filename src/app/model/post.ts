import {Topic} from "./topic";

export class Post {

  content: string;
  topic: Topic;
  user: string;
  profilePic: [];

  constructor(content: string, topic: Topic, user: string, profilePic: []) {
    this.content = content;
    this.topic = topic;
    this.user = user;
    this.profilePic = profilePic;
  }
}
