import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserService} from "../../service/user.service";
import {Ban} from "../../model/request/ban";
import {BanUserService} from "../../service/event/ban-user.service";

@Component({
  selector: 'app-user-ban',
  templateUrl: './user-ban-window.component.html',
  styleUrls: ['./user-ban-window.component.css']
})
export class UserBanWindowComponent {

  @Input() userName: string = '';
  @Input() sourceOfOpeningWindow: string = '';
  @Output() closeUserBanWindowEvent = new EventEmitter();

  minPossibleDateOfBan: Date = new Date();

  form: any = {
    banUntilEndOfDay: null,
    reasonOfBan: null
  }

  constructor(private userService: UserService, private banUserService: BanUserService) {
  }

  confirmUserBan() {
    const ban = new Ban(
      this.form.banUntilEndOfDay,
      this.form.reasonOfBan,
      this.userName
    );

    this.userService.banUser(ban).subscribe(
      () => {
        this.banUserService.emitUserWasBanned(this.sourceOfOpeningWindow);
      },
      () => {
        alert("Cannot ban this user")
      }
    );
    this.closeUserBanWindow();
  }

  closeUserBanWindow() {
    this.closeUserBanWindowEvent.emit();
  }
}
