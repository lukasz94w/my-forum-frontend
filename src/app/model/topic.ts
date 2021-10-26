import {User} from "./user";

export class Topic {

  id: number;
  title: string;
  content: string;
  user: User;

  constructor(id: number, title: string, content: string, user: User) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.user = user;
  }
}
