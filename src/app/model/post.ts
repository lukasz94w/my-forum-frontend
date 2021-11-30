import {Topic} from "./topic";

export class Post {

  content: string;
  topic: Topic;
  user: string;
  dateTime: Date;
  profilePic: [];

  constructor(content: string, topic: Topic, user: string, dateTime: Date, profilePic: []) {
    this.content = content;
    this.topic = topic;
    this.user = user;
    this.dateTime = dateTime;
    this.profilePic = profilePic;
  }
}
