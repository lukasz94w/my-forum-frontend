import {User} from "./user";

export class Topic {

  id: number;
  title: string;
  content: string;
  username: string;

  constructor(id: number, title: string, content: string, username: string) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.username = username;
  }
}
