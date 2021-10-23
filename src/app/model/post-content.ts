export class PostContent {

  content: string;
  topicId: number | undefined;

  constructor(content: string, topicId: number | undefined) {
    this.content = content;
    this.topicId = topicId;
  }
}
