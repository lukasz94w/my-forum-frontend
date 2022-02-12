import {Topic} from "./topic";

export class Post {

  id: number;
  content: string;
  topic: Topic;
  user: string;
  dateTime: Date;
  profilePic: [];
  number: number;
  moderated: boolean;

  constructor(id: number, content: string, topic: Topic, user: string, dateTime: Date, profilePic: [], number: number, moderated: boolean) {
    this.id = id;
    this.content = content;
    this.topic = topic;
    this.user = user;
    this.dateTime = dateTime;
    this.profilePic = profilePic;
    this.number = number;
    this.moderated = moderated;
  }
}
