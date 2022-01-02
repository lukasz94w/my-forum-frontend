export class Topic {

  id: number;
  title: string;
  user: string;
  dateTime: Date

  constructor(id: number, title: string, user: string, dateTime: Date) {
    this.id = id;
    this.title = title;
    this.user = user;
    this.dateTime = dateTime;
  }
}
