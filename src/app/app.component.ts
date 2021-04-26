import {Component, OnInit} from '@angular/core';
import {UserEventService} from './user-event.service';
import {LoginService} from './cloudservices/login.service';
import {take} from 'rxjs/operators';

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
    private userEventService: UserEventService
  ) {

  }

  login(): void {
    this.loginService.login();
  }

  refreshPollList(): void {
    this.userEventService.refreshPollList();
  }

  ngOnInit(): void {
    this.loginService.accessToken().subscribe(res => {
      if (res) {
        this.loginHint = 'SUCCESS LOGIN';
      } else {
        this.loginHint = '';
      }
    });
    this.userEventService.updateUsernameObs().pipe(take(1)).subscribe(name => this.username = name);
  }

  usernameInput(): void {
    this.userEventService.updateUsername(this.username);
  }
}
