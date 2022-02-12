export class PostStatus {

  postId: number;
  moderated: boolean;

  constructor(postId: number, moderated: boolean) {
    this.postId = postId;
    this.moderated = moderated;
  }
}
