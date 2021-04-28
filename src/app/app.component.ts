import {Component, OnInit} from '@angular/core';
import {UserEventService} from './user-event.service';
import {LoginService} from './cloudservices/login.service';
import {skip, take} from 'rxjs/operators';
import {PollListService} from './cloudservices/poll-list.service';
import {NbToastrService} from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loginHint = '';
  username = '';

  constructor(
    private loginService: LoginService,
    private userEventService: UserEventService,
    private pollListSerivice: PollListService,
    private toastService: NbToastrService
  ) {

  }

  ngOnInit(): void {
    this.loginService.accessToken().pipe(skip(1)).subscribe(res => {
      if (res) {
        this.toastService.success('Successfully login', 'SUCCESS');
      } else {
        this.toastService.warning('Failed to login', 'FAILURE');
      }
    });
    this.userEventService.updateUsernameObs().pipe(take(1)).subscribe(name => this.username = name);
  }

  usernameInput(): void {
    this.userEventService.updateUsername(this.username);
  }

  login(): void {
    this.loginService.login();
  }

  refresh(): void {
    this.userEventService.refresh();
    this.pollListSerivice.refresh().subscribe(pollList => {
      if (pollList) {
        this.toastService.success('Successfully got the poll list', 'SUCCESS');
      } else {
        this.toastService.warning('Failed to get the poll list', 'FAILURE');
      }
    });
  }


}
