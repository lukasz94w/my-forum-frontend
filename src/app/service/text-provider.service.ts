import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextProviderService {

  constructor() {
  }

  getTopicsCategories(): string[] {
    return [
      "Programming",
      "Sport",
      "Electronic",
      "Car",
      "Introduction",
      "Advertisement",
      "Personal"];
  }

  getTopicsDescription(): string[] {
    return [
      "Talk about programming, backend, frontend technologies and so on.",
      "Interested in sport? You can talk with people which share your " +
      "interest. Football, basketball, hockey - you find there everything you want.",
      "Section where maniacs of electronic gathers. You can ask about mending " +
      "electronic equipment and find interesting projects.",
      "Here you can discuss cars. Old, new brands. From Mercedes to Lada.",
      "New to the community? Please stop by, say hi and tell us a bit about yourself.",
      "Do you have any equipment you want to get rid of? Here you can list it and " +
      "sell it without intermediaries and no additional costs.",
      "You can share here your life stories and read other"];
  }

  getTopicIconNames(): string[] {
    return [
      "fa fa-shield",
      'fa fa-bolt',
      "fa fa-calendar",
      "fa fa-star",
      "fa fa-clock-o",
      "fa fa-bookmark",
      "fa fa-bomb"];
  }

  getBanInfoMessage(): string {
    return "You have been banned. From now you will not be able to create new topics, add " +
    "posts or changing your personal data. Check profile settings for more info";
  }

  getBanMessage(): string {
    return "You have been banned. Please sign in again";
  }

  getUnBanMessage(): string {
    return "You have been unbanned. Please sign in again";
  }

  getSessionEndedMessage(): string {
    return "Session ended. Please sign in again";
  }
}