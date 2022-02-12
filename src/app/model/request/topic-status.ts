export class TopicStatus {

  topicId: number;
  closed: boolean;

  constructor(topicId: number, closed: boolean) {
    this.topicId = topicId;
    this.closed = closed;
  }
}
