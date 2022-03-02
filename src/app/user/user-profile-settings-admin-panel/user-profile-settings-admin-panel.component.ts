import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {UserService} from "../../service/user.service";
import {User} from "../../model/response/user";
import {BanUserEvent} from "../../event/ban-user-event.service";
import {BanService} from "../../service/ban.service";
import {WebSocketService} from "../../service/web-socket.service";
import {WebServiceMessage} from "../../model/request/web-service-message";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-user-profile-settings-admin-panel',
  templateUrl: './user-profile-settings-admin-panel.component.html',
  styleUrls: ['./user-profile-settings-admin-panel.component.css']
})
export class UserProfileSettingsAdminPanelComponent implements OnInit, OnChanges, OnDestroy {

  @Input() activeTabName: string = '';
  @Output() showUserBanWindowEvent = new EventEmitter();

  pageableUsers: User[] = [];
  usersLength?: number;

  currentPage = 1;
  totalUsers = 0;
  totalPages = 0;
  numberOfUsersOnOnePage = environment.pageableItemsNumber;

  numberOfPostsInPageableUsers: number[] = [];
  numberOfTopicsInPageableUsers: number[] = [];

  componentDestroyedNotifier = new Subject();

  constructor(private userService: UserService, private banUserEvent: BanUserEvent,
              private banService: BanService, private webSocketService: WebSocketService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // detect if users tab have been chosen
    if (changes.activeTabName) {
      if (changes.activeTabName.currentValue === 'admin' && this.usersLength === undefined) {
        this.findPageableUsers(1);
      }
    }
  }

  ngOnInit(): void {
    this.banUserEvent.userWasBannedSource$
      .pipe(takeUntil(this.componentDestroyedNotifier))
      .subscribe(
        (sourceOfOpeningWindow) => {
          if (sourceOfOpeningWindow == 'adminPanel') {
            this.findPageableUsers(this.currentPage);
          }
        }
      )
  }

  findPageableUsers(page: number): void {
    this.userService.findPageableUsers(page - 1).subscribe(
      (data: any) => {
        this.pageableUsers = data.pageableUsers
        this.usersLength = this.pageableUsers.length;
        this.totalUsers = data.totalUsers;
        this.totalPages = data.totalPages;
        this.numberOfPostsInPageableUsers = data.numberOfPostsInPageableUsers;
        this.numberOfTopicsInPageableUsers = data.numberOfTopicsInPageableUsers;
        this.currentPage = page;
      },
      (error) =>
        console.log(error)
    );
  }

  handlePageChange($event: number) {
    this.findPageableUsers($event);
  }

  showUserBanWindow(userName: string) {
    this.showUserBanWindowEvent.emit(userName);
  }

  unBanUser(userName: string) {
    this.banService.unBanUser(userName).subscribe(
      () => {
        this.findPageableUsers(this.currentPage);
        this.webSocketService.send(new WebServiceMessage(false, userName));
      },
      () => {
        alert("Error during unbanning")
      }
    )
  }

  ngOnDestroy(): void {
    this.componentDestroyedNotifier.next();
    this.componentDestroyedNotifier.complete();
  }
}
