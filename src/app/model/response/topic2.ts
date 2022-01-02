import {Topic} from "./topic";

export class Topic2 extends Topic{

  category: string;

  constructor(id: number, title: string, user: string, dateTime: Date, category: string) {
    super(id, title, user, dateTime);
    this.category = category;
  }
}
