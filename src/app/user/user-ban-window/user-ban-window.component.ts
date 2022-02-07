import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Ban} from "../../model/request/ban";
import {BanUserEvent} from "../../event/ban-user-event.service";
import {BanService} from "../../service/ban.service";
import {WebSocketService} from "../../service/web-socket.service";
import {WebServiceMessage} from "../../model/request/web-service-message";

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

  constructor(private banService: BanService, private banUserService: BanUserEvent, private webSocketService: WebSocketService) {
  }

  confirmUserBan() {
    const ban = new Ban(
      this.form.banUntilEndOfDay,
      this.form.reasonOfBan,
      this.userName
    );

    this.banService.banUser(ban).subscribe(
      () => {
        this.banUserService.emitUserWasBanned(this.sourceOfOpeningWindow);
        this.webSocketService.send(new WebServiceMessage(true, this.userName));
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
