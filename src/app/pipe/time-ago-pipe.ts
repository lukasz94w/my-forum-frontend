import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date): string {
    let result: string;
    let resultOfFloor: number;

    let now = new Date().getTime();
    let delta = (now - new Date(value).getTime()) / 1000;

    if (delta < 10) {
      result = 'just now';
    } else if (delta < 60) {
      result = Math.floor(delta) + ' seconds ago';
    } else if (delta < 3600) {
      resultOfFloor = Math.floor(delta / 60);
      result = resultOfFloor <= 1 ? ' one minute ago' : resultOfFloor + ' minutes ago';
    } else if (delta < 86400) {
      resultOfFloor = Math.floor(delta / 3600);
      result = resultOfFloor <= 1 ? ' one hour ago' : resultOfFloor + ' hours ago';
    } else if (delta < 604800) {
      resultOfFloor = Math.floor(delta / 86400);
      result = resultOfFloor <= 1 ? ' one day ago' : resultOfFloor + ' days ago';
    } else if (delta < 2678400) {
      resultOfFloor = Math.floor(delta / 604800);
      result = resultOfFloor <= 1 ? ' one week ago' : resultOfFloor + ' weeks ago';
    } else if (delta < 31536000) {
      resultOfFloor = Math.floor(delta / 2678400);
      result = resultOfFloor <= 1 ? ' one month ago' : resultOfFloor + ' months ago';
    } else {
      resultOfFloor = Math.floor(delta / 31536000);
      result = resultOfFloor <= 1 ? ' one year ago' : resultOfFloor + ' years ago';
    }

    return result;
  }
}
