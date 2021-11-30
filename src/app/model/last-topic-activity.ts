export class LastTopicActivity {

  topicName: string;
  topicId: number;
  userName: string;
  userProfilePic: [];
  timeOfLastActivity: Date

  constructor(topicName: string, topicId: number, userName: string, userProfilePic: [], timeOfLastActivity: Date) {
    this.topicName = topicName;
    this.topicId = topicId;
    this.userName = userName;
    this.userProfilePic = userProfilePic;
    this.timeOfLastActivity = timeOfLastActivity;
  }
}
