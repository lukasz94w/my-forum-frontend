export class Post2 {

  topicId: number;
  topicTitle: string;
  topicCategory: string;
  dateTime: Date;
  content: string;

  constructor(topicId: number, topicTitle: string, topicCategory: string, dateTime: Date, content: string) {
    this.topicId = topicId;
    this.topicTitle = topicTitle;
    this.topicCategory = topicCategory;
    this.dateTime = dateTime;
    this.content = content;
  }
}
