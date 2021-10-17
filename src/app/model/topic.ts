import {User} from "./user";

export class Topic {

  id: number | undefined;
  title: string;
  content: string;
  user: User;

  constructor(title: string, content: string, user: User) {
    this.title = title;
    this.content = content;
    this.user = user;
  }
}
