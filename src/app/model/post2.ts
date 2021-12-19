export class Post2 {

  topicId: number;
  topicTitle: string;
  topicCategory: string;
  dateTime: Date;
  content: string;
  number: number;

  constructor(topicId: number, topicTitle: string, topicCategory: string, dateTime: Date, content: string, number: number) {
    this.topicId = topicId;
    this.topicTitle = topicTitle;
    this.topicCategory = topicCategory;
    this.dateTime = dateTime;
    this.content = content;
    this.number = number;
  }
}
