export class NewPostContent {

  content: string;
  topicId: number;

  constructor(content: string, topicId: number) {
    this.content = content;
    this.topicId = topicId;
  }
}
