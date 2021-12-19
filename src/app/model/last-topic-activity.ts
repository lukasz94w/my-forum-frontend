export class LastTopicActivity {

  topicName: string;
  topicId: number;
  userName: string;
  userProfilePic: [];
  timeOfLastActivity: Date
  postNumber: number;

  constructor(topicName: string, topicId: number, userName: string, userProfilePic: [], timeOfLastActivity: Date, postNumber: number) {
    this.topicName = topicName;
    this.topicId = topicId;
    this.userName = userName;
    this.userProfilePic = userProfilePic;
    this.timeOfLastActivity = timeOfLastActivity;
    this.postNumber = postNumber;
  }
}
