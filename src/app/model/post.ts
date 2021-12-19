import {Topic} from "./topic";

export class Post {

  content: string;
  topic: Topic;
  user: string;
  dateTime: Date;
  profilePic: [];
  number: number;

  constructor(content: string, topic: Topic, user: string, dateTime: Date, profilePic: [], number: number) {
    this.content = content;
    this.topic = topic;
    this.user = user;
    this.dateTime = dateTime;
    this.profilePic = profilePic;
    this.number = number;
  }
}
