export class LastTopicActivity {

  topic: string;
  user: string;
  profilePic: [];
  category: string;
  timeOfLastActivity: string

  constructor(topic: string, user: string, profilePic: [], category: string, timeOfLastActivity: string) {
    this.topic = topic;
    this.user = user;
    this.profilePic = profilePic;
    this.category = category;
    this.timeOfLastActivity = timeOfLastActivity;
  }
}
