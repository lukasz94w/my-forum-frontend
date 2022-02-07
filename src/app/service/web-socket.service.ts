import {Stomp} from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import {environment} from "../../environments/environment";
import {Injectable} from "@angular/core";
import {WebServiceMessage} from "../model/request/web-service-message";
import {LocalStorageService} from "./local-storage.service";
import {SignOutEvent} from "../event/sign-out-event.service";
import {TextProviderService} from "./text-provider.service";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  webSocketEndPoint: string = environment.apiBaseUrl + '/listener-for-messages-from-admin-actions';
  topic: string = "/topic/message-from-admin";
  stompClient: any;

  constructor(private localStorageService: LocalStorageService, private signOutService: SignOutEvent,
              private textProviderService: TextProviderService) {
  }

  connect() {
    let webSocket = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(webSocket);
    const _this = this;
    _this.stompClient.connect({}, function () {
      _this.stompClient.subscribe(_this.topic, function (message: any) {
        _this.onMessageReceived(JSON.parse(message.body));
      });
    }, this.errorCallBack);
  };

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
  }

  errorCallBack(error: string) {
    this.tryReconnect();
  }

  send(webServiceMessage: WebServiceMessage) {
    this.stompClient.send("/from-admin/message", {}, JSON.stringify(webServiceMessage));
  }

  // listener for push messages from server (sent by admin) with ban info
  onMessageReceived(webServiceMessage: WebServiceMessage) {
    const currentLoggedUser = this.localStorageService.getUsername();
    const userWithChangedBanStatus = webServiceMessage.userName;
    const statusOfBan = webServiceMessage.statusOfBan;
    const wasUserAlreadyBanned = this.localStorageService.isUserWithBanLoggedIn();

    if (currentLoggedUser === userWithChangedBanStatus) {
      if (statusOfBan && !wasUserAlreadyBanned) {
        alert(this.textProviderService.getBanMessage())
      } else if (!statusOfBan && wasUserAlreadyBanned) {
        alert(this.textProviderService.getUnBanMessage())
      }
      this.signOutService.emitSignOut();
    }
  }

  private tryReconnect() {
    setTimeout(() => {
      this.connect();
    }, 5000);
  }
}
