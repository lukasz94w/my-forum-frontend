import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {UserService} from "../../service/user.service";
import {User} from "../../model/response/user";
import {BanUserService} from "../../service/event/ban-user.service";

@Component({
  selector: 'app-user-profile-settings-admin-panel',
  templateUrl: './user-profile-settings-admin-panel.component.html',
  styleUrls: ['./user-profile-settings-admin-panel.component.css']
})
export class UserProfileSettingsAdminPanelComponent implements OnInit, OnChanges {

  @Input() loadAdminData: boolean = false;
  @Output() showUserBanWindowEvent = new EventEmitter();

  pageableUsers: User[] = [];
  usersLength = -1;

  currentPage = 1;
  totalUsers = 0;
  totalPages = 0;
  numberOfUsersOnOnePage = 10;

  numberOfPostsInPageableUsers: number[] = [];
  numberOfTopicsInPageableUsers: number[] = [];

  constructor(private userService: UserService, private banUserService: BanUserService) {
  }

  ngOnInit(): void {
    this.banUserService.userWasBannedSource$.subscribe(
      (sourceOfOpeningWindow) => {
        if (sourceOfOpeningWindow == 'adminPanel') {
          this.findPageableTopicsByUser();
        }
      }
    )
  }

  ngOnChanges(): void {
    if (this.loadAdminData) {
      this.findPageableTopicsByUser();
    }
  }

  findPageableTopicsByUser(): void {
    const param = {'page': this.currentPage - 1}
    this.userService.findPageableUsers(param).subscribe(
      (data: any) => {
        this.pageableUsers = data.pageableUsers
        this.usersLength = this.pageableUsers.length;
        this.totalUsers = data.totalUsers;
        this.totalPages = data.totalPages;
        this.numberOfPostsInPageableUsers = data.numberOfPostsInPageableUsers;
        this.numberOfTopicsInPageableUsers = data.numberOfTopicsInPageableUsers;
      },
      (error) =>
        console.log(error)
    );
  }

  handlePageChange($event: number) {
    this.currentPage = $event;
    this.findPageableTopicsByUser();
  }

  showUserBanWindow(userName: string) {
    this.showUserBanWindowEvent.emit(userName);
  }

  unBanUser(userName: string) {
    this.userService.unBanUser(userName).subscribe(
      () => {
        this.findPageableTopicsByUser();
      },
      () => {
        alert("Error during unbanning")
      }
    )
  }
}
