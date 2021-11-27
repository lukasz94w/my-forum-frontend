export class Topic {

  id: number;
  title: string;
  content: string;
  user: string;
  dateTime: Date

  constructor(id: number, title: string, content: string, user: string, dateTime: Date) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.user = user;
    this.dateTime = dateTime;
  }
}
